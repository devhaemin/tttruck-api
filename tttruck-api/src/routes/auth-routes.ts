import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import authService from '@src/services/auth-service';
import EnvVars from '@src/declarations/major/EnvVars';
import codeUtil from "@src/util/code-util";
import {IReq, IRes} from './shared/types';
import {tt_user, tt_user_signout} from "@src/models/init-models";
import {getRandomNicknames} from "@src/util/nick-gen-util";
import logger from "jet-logger";
import {S3File} from "@src/routes/shared/awsMultipart";
import chatService from "@src/services/chat-service";
import pwdUtil from "@src/util/pwd-util";

// **** Variables **** //

// Paths
const paths = {
  basePath: '/auth',
  generateNickname: '/nickname/generate',
  login: '/login',
  phoneCheckAuth: '/phone/checkAuth',
  tokenLogin: '/tokenLogin',
  logout: '/logout',
  signup: '/signup',
  profileImageUpload: '/profile/image',
  updateProfile: '/profile',
  phoneRequestAuth: '/phone/requestAuth',
  signout: '/signout',
  resetPassword: '/password/reset',
} as const;


// **** Types **** //

interface ILoginReq {
  phone: string;
  password: string;
}

interface ISignUpReq extends tt_user {
  phone: string,
  password: string,
  nickname: string,
  interior_company_tf: string,
  interior_company_name: string,
  birthday: string,
  gender: number, //(0: 남자, 1: 여자, 9: 기타)
  zip_code: string,
  join_agree: string,
}

interface IPhoneAuthReq {
  phone: string,
}

// **** Functions **** //
/**
 * @api {get} /auth/tokenLogin 토큰 로그인
 * @apiName tokenLogin
 * @apiGroup Auth
 * @apiPermission normalUser
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *     "USER_ID": 20,
 *     "PHONE": "01000000000",
 *     "PASSWORD": "$2b$12$OK.94bmsk.KcJzlvbJ6u7eG9bz3C0zIvVFYq7LfjudDfKhw6MnCVe",
 *     "NICKNAME": "꼬리무123",
 *     "NAME": "정해민",
 *     "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDAwMDAwMDAwIiwicGFzc3dvcmQiOiIkMmIkMTIkT0suOTRibXNrLktjSnpsdmJKNnU3ZUc5YnozQzB6SXZWRllxN0xmanVkRGZLaHc2TW5DVmUiLCJpYXQiOjE2NzIyOTk4ODEsImV4cCI6MTY3MjU1OTA4MX0.VWNLercbutOKO-WVtHXQDC2Mrw4VboG2RA0GeJY5b-0",
 *     "WASTE_SAVINGS": 0,
 *     "GROUP": 0,
 *     "PROFILE_IMAGE": null,
 *     "INTERIOR_COMPANY_TF": false,
 *     "INTERIOR_COMPANY_NAME": "",
 *     "BIRTHDAY": "20001212",
 *     "GENDER": 0,
 *     "ZIP_CODE": "01256",
 *     "ADDRESS": null,
 *     "DETAIL_ADDRESS": null,
 *     "JOIN_STATE": null,
 *     "RESTING_TF": false,
 *     "LEAVE_TF": false,
 *     "PHONE_AUTH_CODE": "554914",
 *     "PHONE_AUTH_DATE": null,
 *     "PHONE_AUTH_SUCCEED_DATE": null,
 *     "PHONE_AUTH_TF": true,
 *     "REG_TIME": "2022-12-29T07:34:47.000Z",
 *     "UPD_TIME": "2022-12-29T07:44:41.000Z",
 *     "JOIN_TIME": "2022-12-29T07:34:47.000Z",
 *     "JOIN_PERMIT_USER_ID": null,
 *     "JOIN_AGREE": null,
 *     "tt_user_talkplu": {
 *         "USER_ID": 20,
 *         "TALKPLUS_ID": "tttruck20",
 *         "TALKPLUS_PASSWORD": "$2b$12$OK.94bmsk.KcJzlvbJ6u7eG9bz3C0zIvVFYq7LfjudDfKhw6MnCVe",
 *         "TALKPLUS_USERNAME": "꼬리무123",
 *         "TALKPLUS_PROFILE_IMAGE_URL": "https://cdn.tttruck.co.kr/profile/1672301492476_img-ObBaphDQMth1gVfJIwiS0HUh.png",
 *         "TALKPLUS_LOGIN_TOKEN": "$2a$06$Ume.e8dNF7ELlDdbIDUT9eO5zKXhynSriqXToYmLncLg7zvK9NvyC"
 *     }
 * }
 *
 */
async function tokenLogin(req: IReq, res: IRes) {
  const retUser = await authService.getUserWithTalkplus(res.locals.user.USER_ID);
  return res.status(200).json(retUser).end();
}

/**
 * @api {get} /auth/nickname/generate Sub Description
 * @apiName getRandomNickname
 * @apiGroup Auth
 * @apiPermission none
 * @apiParamExample {json} Request-Example:
 *     {
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "NICKNAME": "동그란사막여우7096"
 *     }
 *
 */
async function generateNickname(req: IReq, res: IRes) {
  const nicknames = getRandomNicknames();
  let nickname = "";
  for (let i = 0; i < 10; ++i) {
    const result = await tt_user.findAll({where: {NICKNAME: nicknames[i]}});
    if (!result || result.length === 0) {
      nickname = nicknames[i];
      logger.info(nickname);
      break;
    }
  }
  return res.status(200).json({NICKNAME: nickname}).end();
}

/**
 * @api {post} /auth/login Login with Phone
 * @apiName PhoneLogin
 * @apiGroup Auth
 * @apiPermission none
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "phone": "01098810664",
 *       "password": "asdf1234"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "USER_ID": 20,
 *     "PHONE": "01000000000",
 *     "PASSWORD": "$2b$12$OK.94bmsk.KcJzlvbJ6u7eG9bz3C0zIvVFYq7LfjudDfKhw6MnCVe",
 *     "NICKNAME": "꼬리무123",
 *     "NAME": "정해민",
 *     "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDAwMDAwMDAwIiwicGFzc3dvcmQiOiIkMmIkMTIkT0suOTRibXNrLktjSnpsdmJKNnU3ZUc5YnozQzB6SXZWRllxN0xmanVkRGZLaHc2TW5DVmUiLCJpYXQiOjE2NzIyOTk4ODEsImV4cCI6MTY3MjU1OTA4MX0.VWNLercbutOKO-WVtHXQDC2Mrw4VboG2RA0GeJY5b-0",
 *     "WASTE_SAVINGS": 0,
 *     "GROUP": 0,
 *     "PROFILE_IMAGE": null,
 *     "INTERIOR_COMPANY_TF": false,
 *     "INTERIOR_COMPANY_NAME": "",
 *     "BIRTHDAY": "20001212",
 *     "GENDER": 0,
 *     "ZIP_CODE": "01256",
 *     "ADDRESS": null,
 *     "DETAIL_ADDRESS": null,
 *     "JOIN_STATE": null,
 *     "RESTING_TF": false,
 *     "LEAVE_TF": false,
 *     "PHONE_AUTH_CODE": "554914",
 *     "PHONE_AUTH_DATE": null,
 *     "PHONE_AUTH_SUCCEED_DATE": null,
 *     "PHONE_AUTH_TF": true,
 *     "REG_TIME": "2022-12-29T07:34:47.000Z",
 *     "UPD_TIME": "2022-12-29T07:44:41.000Z",
 *     "JOIN_TIME": "2022-12-29T07:34:47.000Z",
 *     "JOIN_PERMIT_USER_ID": null,
 *     "JOIN_AGREE": null,
 *     "tt_user_talkplu": {
 *         "USER_ID": 20,
 *         "TALKPLUS_ID": "tttruck20",
 *         "TALKPLUS_PASSWORD": "$2b$12$OK.94bmsk.KcJzlvbJ6u7eG9bz3C0zIvVFYq7LfjudDfKhw6MnCVe",
 *         "TALKPLUS_USERNAME": "꼬리무123",
 *         "TALKPLUS_PROFILE_IMAGE_URL": "https://cdn.tttruck.co.kr/profile/1672301492476_img-ObBaphDQMth1gVfJIwiS0HUh.png",
 *         "TALKPLUS_LOGIN_TOKEN": "$2a$06$Ume.e8dNF7ELlDdbIDUT9eO5zKXhynSriqXToYmLncLg7zvK9NvyC"
 *     }
 * }
 *
 */
async function login(req: IReq<{ phone: string, password: string }>, res: IRes) {
  const {phone, password} = req.body;
  // Add jwt to cookie
  const jwtUser = await authService.getJwtUser(phone, password);
  const chatUser = await chatService.loginTalkplus(jwtUser.USER_ID);
  const retUser = await authService.getUserWithTalkplus(chatUser.USER_ID);
  // Return
  return res.status(HttpStatusCodes.OK).json(retUser).end();
}

/**
 * @api {post} /auth/signup SignUp with Phone
 * @apiName PhoneSignup
 * @apiGroup Auth
 * @apiPermission none
 *
 * @apiBody {String} JOIN_AGREE 가입 약관 동의 여부 Index 별로 조정 동의는 1, 비동의는 0(0: 개인정보 수집 및 이용동의 1: 개인정보 수집 목적 내 제3자 제공 동의 2: 14세 미만 법정 대리인 동의)
 * @apiParamExample {json} Request-Example:
 * {
 *     "NAME": "정해민",
 *     "PHONE": "01098810664",
 *     "PASSWORD": "asdf1234",
 *     "NICKNAME": "꼬리무123",
 *     "INTERIOR_COMPANY_TF": false,
 *     "INTERIOR_COMPANY_NAME": "",
 *     "BIRTHDAY": "20001212",
 *     "GENDER" : 0,
 *     "ZIP_CODE" : "01256",
 *     "PHONE_AUTH_CODE" : "3911945",
 *     "JOIN_AGREE" : "11100",
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "USER_ID": 20,
 *     "PHONE": "01000000000",
 *     "PASSWORD": "$2b$12$OK.94bmsk.KcJzlvbJ6u7eG9bz3C0zIvVFYq7LfjudDfKhw6MnCVe",
 *     "NICKNAME": "꼬리무123",
 *     "NAME": "정해민",
 *     "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDAwMDAwMDAwIiwicGFzc3dvcmQiOiIkMmIkMTIkT0suOTRibXNrLktjSnpsdmJKNnU3ZUc5YnozQzB6SXZWRllxN0xmanVkRGZLaHc2TW5DVmUiLCJpYXQiOjE2NzIyOTkyODcsImV4cCI6MTY3MjU1ODQ4N30.VxEqGJt6OkRR0xnXQRA_VsFqCr8LjhdFWFlVyD-xsa8",
 *     "WASTE_SAVINGS": 0,
 *     "GROUP": 0,
 *     "PROFILE_IMAGE": null,
 *     "INTERIOR_COMPANY_TF": false,
 *     "INTERIOR_COMPANY_NAME": "",
 *     "BIRTHDAY": "20001212",
 *     "GENDER": 0,
 *     "ZIP_CODE": "01256",
 *     "ADDRESS": null,
 *     "DETAIL_ADDRESS": null,
 *     "JOIN_STATE": null,
 *     "RESTING_TF": false,
 *     "LEAVE_TF": false,
 *     "PHONE_AUTH_CODE": "554914",
 *     "PHONE_AUTH_DATE": null,
 *     "PHONE_AUTH_SUCCEED_DATE": null,
 *     "PHONE_AUTH_TF": true,
 *     "REG_TIME": "2022-12-29T07:34:47.000Z",
 *     "UPD_TIME": "2022-12-29T07:34:47.000Z",
 *     "JOIN_TIME": "2022-12-29T07:34:47.000Z",
 *     "JOIN_PERMIT_USER_ID": null,
 *     "JOIN_AGREE": null,
 *     "tt_user_talkplu": {
 *         "USER_ID": 20,
 *         "TALKPLUS_ID": "tttruck20",
 *         "TALKPLUS_PASSWORD": "$2b$12$OK.94bmsk.KcJzlvbJ6u7eG9bz3C0zIvVFYq7LfjudDfKhw6MnCVe",
 *         "TALKPLUS_USERNAME": "꼬리무123",
 *         "TALKPLUS_PROFILE_IMAGE_URL": "https://cdn.tttruck.co.kr/profile/1672301492476_img-ObBaphDQMth1gVfJIwiS0HUh.png",
 *         "TALKPLUS_LOGIN_TOKEN": "$2a$06$JJ3bGayY/7wxAHThi2lMLufbw9vn1MfCeTl.xQ28NMvFa436365re"
 *     }
 * }
 *
 */
async function signup(req: IReq<ISignUpReq>, res: IRes) {
  const user = await authService.addNormalUser(req.body);
  const talkUser = await chatService.createChatUser(user);
  const retUser = await authService.getUserWithTalkplus(user.USER_ID);
  return res.status(HttpStatusCodes.OK).json(retUser).end();
}

/**
 * @api {post} /auth/phone/checkAuth Check PhoneAuth SMS
 * @apiName PhoneAuthCheck
 * @apiGroup Auth
 * @apiPermission none
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "PHONE" : "01098810664",
 *       "PHONE_AUTH_CODE" : "123456",
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 *
 */

async function phoneCheckAuth(req: IReq<{ PHONE: string, PHONE_AUTH_CODE: string }>, res: IRes) {
  const {PHONE, PHONE_AUTH_CODE} = req.body;
  const phoneAuth = await authService.checkPhoneAuth(PHONE, PHONE_AUTH_CODE);
  return res.status(HttpStatusCodes.OK).json(phoneAuth).end();
}

/**
 * @api {post} /auth/phone/requestAuth Request PhoneAuth SMS
 * @apiName PhoneAuthCheck
 * @apiGroup Auth
 * @apiPermission none
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "phone" : "01098810664"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 *
 */

async function phoneRequestAuth(req: IReq<IPhoneAuthReq>, res: IRes) {
  const authCode = codeUtil.randomDigits(6);
  await authService.setPhoneAuth(authCode, req.body.phone);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * @api {put} /auth/profile Update profile
 * @apiName UpdateProfile
 * @apiGroup Auth
 *
 * @apiPermission normalUser
 *
 * @apiBody {string} nickname 닉네임
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
async function updateProfile(req: IReq<{ nickname: string }>, res: IRes) {
  const {nickname} = req.body;
  const user = res.locals.user;
  user.set({"NICKNAME": nickname});
  const result = await user.save();
  const talkplusUser = await authService.getUserWithTalkplus(res.locals.user.USER_ID);
  const talkplus =
    await chatService.updateUserProfile(talkplusUser);
  return res.status(HttpStatusCodes.CREATED).json(talkplus).end();
}

/**
 * @api {post} /auth/profile/image Set Profile Image
 * @apiName SetProfileImage
 * @apiGroup Auth
 *
 * @apiPermission normalUser
 *
 * @apiBody File file 상품에 추가할 이미지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
async function profileImageUpload(req: IReq, res: IRes) {
  const file = req.file as S3File;
  const result =
    await authService.uploadProfileImage(file, res.locals.user);
  const talkplusUser = await authService.getUserWithTalkplus(res.locals.user.USER_ID);
  const talkplus =
    await chatService.updateUserProfile(talkplusUser);
  return res.status(HttpStatusCodes.CREATED).json(talkplus).end();
}

/**
 * @api {post} /auth/signout 회원 소프트 삭제 (회원 탈퇴)
 * @apiName SignOut
 * @apiGroup Auth
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "text": "볼 거리가 없어요 \n 앱을 삭제했는데 계정도 없어졌으면 좋겠어요. :)"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *     }
 *
 */
async function signout(req: IReq<{ text: string }>, res: IRes) {
  const user = res.locals.user;
  const {text} = req.body;
  const result = await user.update(
    {
      LEAVE_TF: Number(true),
      ACCESSTOKEN: "",
    });
  const createResult = await tt_user_signout.create(
    {
      USER_ID: user.USER_ID,
      TEXT: text,
    });
  res.status(200).json(createResult).end();
}

/**
 * @api {post} /auth/password/reset 비밀번호 초기화
 * @apiName PasswordReset
 * @apiGroup Auth
 * @apiPermission normalUser
 *
 * @apiBody {String} PASSWORD
 *
 */
async function resetPassword(req: IReq<{PASSWORD:string}>, res: IRes){
  const user = res.locals.user;
  const newPw = req.body.PASSWORD;
  user.PASSWORD = await pwdUtil.getHash(newPw);
  const result = await user.save();
  return res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  const {key, options} = EnvVars.cookieProps;
  res.clearCookie(key, options);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  paths,
  tokenLogin,
  login,
  logout,
  generateNickname,
  phoneCheckAuth,
  phoneRequestAuth,
  updateProfile,
  profileImageUpload,
  resetPassword,
  signup,
  signout,
} as const;
