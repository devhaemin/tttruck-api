import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import authService from '@src/services/auth-service';
import EnvVars from '@src/declarations/major/EnvVars';
import codeUtil from "@src/util/code-util";
import {IReq, IRes} from './shared/types';
import {tt_phone_auth, tt_user} from "@src/models/init-models";

// **** Variables **** //

// Paths
const paths = {
  basePath: '/auth',
  login: '/login',
  tokenLogin:'/tokenLogin',
  logout: '/logout',
  signup: '/signup',
  phoneRequestAuth: '/phone/requestAuth',
} as const;


// **** Types **** //

interface ILoginReq {
  phone: string;
  password: string;
}
interface ISignUpReq extends tt_user{
  phone:string,
  password:string,
  nickname:string,
  interior_company_tf:string,
  interior_company_name:string,
  birthday:string,
  gender : number, //(0: 남자, 1: 여자, 9: 기타)
  zip_code : string
}
interface IPhoneAuthReq {
  phone:string,
}

// **** Functions **** //
/** /**
 * @api {get} /auth/tokenLogin 토큰 로그인
 * @apiName tokenLogin
 * @apiGroup Auth
 * @apiPermission normalUser
 *
 *
 *
 */
function tokenLogin(req: IReq, res: IRes){
  return res.locals.user;
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
 *       "password": "asdf1234
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "USER_ID": 1,
 *     "PHONE": "01098810664",
 *     "PASSWORD": "$2b$12$RskaEs2W46U8y.xLOdE3x.46wK7NuXa764P/3Q8VxwkExy4ZNB8fS",
 *     "NICKNAME": "haemin",
 *     "NAME": "haemin",
 *     "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkUnNrYUVzMlc0NlU4eS54TE9kRTN4LjQ2d0s3TnVYYTc2NFAvM1E4Vnh3a0V4eTRaTkI4ZlMiLCJpYXQiOjE2NzE2MDk2NjksImV4cCI6MTY3MTg2ODg2OX0.Clj7asgtctwcNN9_qiV1gPRePqAzOVO-n30ju5lpP4U",
 *     "WASTE_SAVINGS": 0,
 *     "GROUP": 0,
 *     "PROFILE_IMAGE": null,
 *     "INTERIOR_COMPANY_TF": "F",
 *     "INTERIOR_COMPANY_NAME": null,
 *     "BIRTHDAY": null,
 *     "GENDER": null,
 *     "ZIP_CODE": null,
 *     "ADDRESS": null,
 *     "DETAIL_ADDRESS": null,
 *     "JOIN_STATE": null,
 *     "RESTING_TF": "F",
 *     "LEAVE_TF": "F",
 *     "PHONE_AUTH_CODE": null,
 *     "PHONE_AUTH_DATE": null,
 *     "PHONE_AUTH_SUCCEED_DATE": null,
 *     "PHONE_AUTH_TF": "F",
 *     "REG_TIME": "2022-12-17T14:30:04.000Z",
 *     "UPD_TIME": "2022-12-21T08:01:02.000Z",
 *     "JOIN_TIME": null,
 *     "JOIN_PERMIT_USER_ID": null,
 *     "JOIN_AGREE": null
 * }
 *
 */
async function login(req: IReq<ILoginReq>, res: IRes) {
  const { phone, password } = req.body;
  // Add jwt to cookie
  const jwtUser = await authService.getJwtUser(phone, password);
  // Return
  return res.status(HttpStatusCodes.OK).json(jwtUser).end();
}
/**
 * @api {post} /auth/signup SignUp with Phone
 * @apiName PhoneSignup
 * @apiGroup Auth
 * @apiPermission none
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "PHONE": "01098810664",
 *       "PASSWORD": "asdf1234",
 *       "NICKNAME": "꼬리무123",
 *       "INTERIOR_COMPANY_TF": "F",
 *       "INTERIOR_COMPANY_NAME": "",
 *       "BIRTHDAY": "20001212",
 *       "GENDER" : 0, //(0: 남자, 1: 여자, 9: 기타)
 *       "ZIP_CODE" : 01256,
 *       "PHONE_AUTH_CODE" : 727172,
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "USER_ID": 1,
 *     "PHONE": "01098810664",
 *     "PASSWORD": "$2b$12$RskaEs2W46U8y.xLOdE3x.46wK7NuXa764P/3Q8VxwkExy4ZNB8fS",
 *     "NICKNAME": "haemin",
 *     "NAME": "haemin",
 *     "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkUnNrYUVzMlc0NlU4eS54TE9kRTN4LjQ2d0s3TnVYYTc2NFAvM1E4Vnh3a0V4eTRaTkI4ZlMiLCJpYXQiOjE2NzE2MDk2NjksImV4cCI6MTY3MTg2ODg2OX0.Clj7asgtctwcNN9_qiV1gPRePqAzOVO-n30ju5lpP4U",
 *     "WASTE_SAVINGS": 0,
 *     "GROUP": 0,
 *     "PROFILE_IMAGE": null,
 *     "INTERIOR_COMPANY_TF": "F",
 *     "INTERIOR_COMPANY_NAME": null,
 *     "BIRTHDAY": null,
 *     "GENDER": null,
 *     "ZIP_CODE": null,
 *     "ADDRESS": null,
 *     "DETAIL_ADDRESS": null,
 *     "JOIN_STATE": null,
 *     "RESTING_TF": "F",
 *     "LEAVE_TF": "F",
 *     "PHONE_AUTH_CODE": null,
 *     "PHONE_AUTH_DATE": null,
 *     "PHONE_AUTH_SUCCEED_DATE": null,
 *     "PHONE_AUTH_TF": "F",
 *     "REG_TIME": "2022-12-17T14:30:04.000Z",
 *     "UPD_TIME": "2022-12-21T08:01:02.000Z",
 *     "JOIN_TIME": null,
 *     "JOIN_PERMIT_USER_ID": null,
 *     "JOIN_AGREE": null
 * }
 *
 */
async function signup(req: IReq<ISignUpReq>, res: IRes) {
  const user = await authService.addNormalUser(req.body);
  return res.status(HttpStatusCodes.OK).json(user).end();
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
  const authCode = codeUtil.randomDigits(7);
  await authService.setPhoneAuth(authCode,req.body.phone);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  const { key, options } = EnvVars.cookieProps;
  res.clearCookie(key, options);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  paths,
  tokenLogin,
  login,
  logout,
  phoneRequestAuth,
  signup,
} as const;
