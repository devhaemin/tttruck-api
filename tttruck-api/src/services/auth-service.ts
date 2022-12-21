import jwtUtil from '@src/util/jwt-util';
import pwdUtil from '@src/util/pwd-util';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {RouteError} from '@src/declarations/classes';
import {tick} from '@src/declarations/functions';
import {tt_user} from "@src/models/tt_user";
import {tt_phone_auth} from "@src/models/tt_phone_auth";
import {sendPhoneAuthSMS} from "@src/util/sms-util";
import logger from "jet-logger";


// **** Variables **** //

// Errors
export const errors = {
  unauth: 'Unauthorized',
  notCorrectCode: (code: string) => `Code "${code}" not correct`,
  phoneNotFound: (phone: string) => `User with phone "${phone}" not found`,
  tokenNotFound: (token: string) => `User with phone "${token}" not found`,
} as const;


// **** Functions **** //
async function setPhoneAuth(code:string, phone:string): Promise<tt_phone_auth>{
  const sendSMS = await sendPhoneAuthSMS(code, phone);
  logger.info(sendSMS);
  return tt_phone_auth.create({PHONE_AUTH_CODE : code, PHONE : phone});
}
async function addNormalUser(user:tt_user): Promise<tt_user>{
  const phoneAuth = await tt_phone_auth.findOne({
    where:{$PHONE$:user.PHONE},
    order:[['AUTH_ID','DESC']],
  });
  if(!user.PHONE_AUTH_CODE){
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      "code required not found",
    );
  }
  if(!phoneAuth || phoneAuth.EXPIRED_TIME < new Date()){
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      "인증 코드가 만료되었습니다.",
    )
  }
  if(
    user.PHONE_AUTH_CODE !== phoneAuth.PHONE_AUTH_CODE){
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      errors.notCorrectCode(user.PHONE_AUTH_CODE),
    );
  }
  user.PHONE_AUTH_TF = 'T';
  user.GROUP = 0;
  user.ACCESSTOKEN = await jwtUtil.sign({
    phone: user.PHONE,
    password: user.PASSWORD,
  });
  phoneAuth.update({PHONE_AUTH_TF : 'T'});
  return tt_user.create(user);
}
/**
 * Login a user.
 */
async function getJwtUser(phone: string, password: string): Promise<tt_user> {
  // Fetch user
  const user = await tt_user.findOne({where:{$PHONE$:phone}});
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

  return user;
}


// **** Export default **** //

export default {
  addNormalUser,
  setPhoneAuth,
  getJwtUser,
} as const;
