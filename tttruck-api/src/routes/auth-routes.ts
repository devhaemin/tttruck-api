import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import authService from '@src/services/auth-service';
import EnvVars from '@src/declarations/major/EnvVars';
import codeUtil from "@src/util/code-util";
import {IReq, IRes} from './shared/types';
import {tt_user} from "@src/models/init-models";
import {getRandomNicknames} from "@src/util/nick-gen-util";
import logger from "jet-logger";

// **** Variables **** //

// Paths
const paths = {
  basePath: '/auth',
  generateNickname: '/nickname/generate',
  login: '/login',
  tokenLogin: '/tokenLogin',
  logout: '/logout',
  signup: '/signup',
  phoneRequestAuth: '/phone/requestAuth',
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
  zip_code: string
}

interface IPhoneAuthReq {
  phone: string,
}

// **** Functions **** //
/** /**
 * @api {get} /auth/tokenLogin 토큰 로그인
 * @apiName tokenLogin
 * @apiGroup Auth
 * @apiPermission normalUser
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *     "USER_ID": 4,
 *     "PHONE": "01098810664",
 *     "PASSWORD": "$2b$12$8fxYmHk8Q9VhJX7wygLrt.0FQfmwSC7G8IA4gXATFlj5yXNl4b7jG",
 *     "NICKNAME": "꼬리무123",
 *     "NAME": "정해민",
 *     "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkOGZ4WW1IazhROVZoSlg3d3lnTHJ0LjBGUWZtd1NDN0c4SUE0Z1hBVEZsajV5WE5sNGI3akciLCJpYXQiOjE2NzE4NjMxNDYsImV4cCI6MTY3MjEyMjM0Nn0.C3uWMghrAIehH-T8pLbGHhReqnmm-mWfIJ2xuQ_BoUo",
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
 *     "PHONE_AUTH_CODE": "3911945",
 *     "PHONE_AUTH_DATE": null,
 *     "PHONE_AUTH_SUCCEED_DATE": null,
 *     "PHONE_AUTH_TF": true,
 *     "REG_TIME": "2022-12-24T06:25:46.000Z",
 *     "UPD_TIME": "2022-12-24T06:25:46.000Z",
 *     "JOIN_TIME": "2022-12-24T06:25:46.000Z",
 *     "JOIN_PERMIT_USER_ID": null,
 *     "JOIN_AGREE": null
 * }
 *
 */
function tokenLogin(req: IReq, res: IRes) {
  return res.status(200).json(res.locals.user).end();
}

/**
 * @api {get} /nickname/generate Sub Description
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
async function generateNickname(req:IReq, res:IRes){
  const nicknames = getRandomNicknames();
  let nickname = "";
  for(let i = 0; i < 10; ++i){
    const result = await tt_user.findAll({where:{NICKNAME:nicknames[i]}});
    if(!result || result.length === 0 ) {
      nickname = nicknames[i];
      logger.info(nickname);
      break;
    }
  }
  return res.status(200).json({NICKNAME:nickname}).end();
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
async function login(req: IReq<{phone:string, password:string}>, res: IRes) {
  const {phone, password} = req.body;
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
 *     "PHONE_AUTH_CODE" : "3911945"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "WASTE_SAVINGS": 0,
 *     "RESTING_TF": false,
 *     "LEAVE_TF": false,
 *     "REG_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "UPD_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "JOIN_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "USER_ID": 4,
 *     "NAME": "정해민",
 *     "PHONE": "01098810664",
 *     "PASSWORD": "$2b$12$8fxYmHk8Q9VhJX7wygLrt.0FQfmwSC7G8IA4gXATFlj5yXNl4b7jG",
 *     "NICKNAME": "꼬리무123",
 *     "INTERIOR_COMPANY_TF": false,
 *     "INTERIOR_COMPANY_NAME": "",
 *     "BIRTHDAY": "20001212",
 *     "GENDER": 0,
 *     "ZIP_CODE": "01256",
 *     "PHONE_AUTH_CODE": "3911945",
 *     "PHONE_AUTH_TF": true,
 *     "GROUP": 0,
 *     "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkOGZ4WW1IazhROVZoSlg3d3lnTHJ0LjBGUWZtd1NDN0c4SUE0Z1hBVEZsajV5WE5sNGI3akciLCJpYXQiOjE2NzE4NjMxNDYsImV4cCI6MTY3MjEyMjM0Nn0.C3uWMghrAIehH-T8pLbGHhReqnmm-mWfIJ2xuQ_BoUo"
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
  await authService.setPhoneAuth(authCode, req.body.phone);
  return res.status(HttpStatusCodes.OK).end();
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
  phoneRequestAuth,
  signup,
} as const;
