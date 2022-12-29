import jwtUtil from '@src/util/jwt-util';
import pwdUtil from '@src/util/pwd-util';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {RouteError} from '@src/declarations/classes';
import {tick} from '@src/declarations/functions';
import {tt_user} from "@src/models/tt_user";
import {tt_phone_auth} from "@src/models/tt_phone_auth";
import {sendPhoneAuthSMS} from "@src/util/sms-util";
import {S3File} from "@src/routes/shared/awsMultipart";
import logger from "jet-logger";
import {tt_user_talkplus} from "@src/models/init-models";
import {userNotFoundErr} from "@src/services/user-service";


// **** Variables **** //

// Errors
export const errors = {
  unauth: 'Unauthorized',
  notCorrectCode: (code: string) => `Code "${code}" not correct`,
  phoneNotFound: (phone: string) => `User with phone "${phone}" not found`,
  tokenNotFound: (token: string) => `User with phone "${token}" not found`,
} as const;


// **** Functions **** //
async function getUserWithTalkplus(userId:number):Promise<tt_user>{
  const user = await tt_user.findByPk(userId,{
    include:[{model:tt_user_talkplus,as:"tt_user_talkplu"}],
  });
  if(!user){
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      userNotFoundErr,
    );
  }
  return user;
}
async function uploadProfileImage(file: S3File | null, user: tt_user) {
  if (!file) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "AWS API Connection error.",
    );
  }
  logger.info(JSON.stringify(file));
  user.PROFILE_IMAGE = file.key;
  return await tt_user.update({PROFILE_IMAGE:file.key}, {where: {USER_ID: user.USER_ID}});
}

async function setPhoneAuth(code: string, phone: string): Promise<tt_phone_auth> {
  const persists = await tt_user.findAll({where: {PHONE: phone}});
  if (persists && persists.length !== 0) {
    throw new RouteError(
      HttpStatusCodes.ALREADY_REPORTED,
      "이미 가입된 번호입니다.",
    );
  }
  const sendSMS = await sendPhoneAuthSMS(code, phone);
  const nCloudRes = sendSMS.parsedBody;
  if (!nCloudRes) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "NaverCloud API return nothing.",
    );
  }
  if (nCloudRes.error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      nCloudRes.error.message + " / " + nCloudRes.error.details,
    );
  }
  return tt_phone_auth.create({PHONE_AUTH_CODE: code, PHONE: phone});
}

async function checkPhoneAuth(PHONE: string, PHONE_AUTH_CODE: string): Promise<tt_phone_auth> {
  const phoneAuth = await tt_phone_auth.findOne({
    where: {$PHONE$: PHONE},
    order: [['AUTH_ID', 'DESC']],
  });
  if (!PHONE_AUTH_CODE) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      "code required not found",
    );
  }
  if (!phoneAuth || phoneAuth.EXPIRED_TIME < new Date()) {
    logger.info(phoneAuth?.PHONE_AUTH_CODE)
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      "인증 코드가 만료되었습니다.",
    );
  }
  if (
    PHONE_AUTH_CODE !== phoneAuth.PHONE_AUTH_CODE) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      errors.notCorrectCode(PHONE_AUTH_CODE),
    );
  }
  return phoneAuth;
}

async function addNormalUser(user: tt_user): Promise<tt_user> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const phoneAuth = await checkPhoneAuth(user.PHONE, user.PHONE_AUTH_CODE!);
  user.PHONE_AUTH_TF = Number(true);
  user.GROUP = 0;
  user.PASSWORD = await pwdUtil.getHash(user.PASSWORD);
  user.ACCESSTOKEN = await jwtUtil.sign({
    phone: user.PHONE,
    password: user.PASSWORD,
  });
  phoneAuth.update({PHONE_AUTH_TF: Number(true)});
  return tt_user.create(user);
}

/**
 * Login a user.
 * @apiBody Number [field=defaultValue] [description
 * ]
 */
async function getJwtUser(phone: string, password: string): Promise<tt_user> {
  // Fetch user
  const user = await tt_user.findOne({where: {$PHONE$: phone}});
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      errors.phoneNotFound(phone),
    );
  }
  // Check password
  const hash = (user.PASSWORD ?? '');
  const pwdPassed = await pwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      errors.unauth,
    );
  }
  // Setup Admin Cookie
  user.ACCESSTOKEN = await jwtUtil.sign({
    phone: user.PHONE,
    password: user.PASSWORD,
  });
  return await user.save();
}


// **** Export default **** //

export default {
  addNormalUser,
  setPhoneAuth,
  getJwtUser,
  getUserWithTalkplus,
  uploadProfileImage,
  checkPhoneAuth,
} as const;
