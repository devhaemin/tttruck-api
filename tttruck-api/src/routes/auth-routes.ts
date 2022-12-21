import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import authService from '@src/services/auth-service';
import EnvVars from '@src/declarations/major/EnvVars';
import {IReq, IRes} from './shared/types';


// **** Variables **** //

// Paths
const paths = {
  basePath: '/auth',
  login: '/login',
  logout: '/logout',
} as const;


// **** Types **** //

interface ILoginReq {
  phone: string;
  password: string;
}


// **** Functions **** //

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
  login,
  logout,
} as const;
