import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import userService, {UserFilter} from '@src/services/user-service';
import {IUser} from '@src/models/User';
import {IReq, IRes} from './shared/types';
import productService, {ProductFilter} from "@src/services/product-service";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/users',
  get: '/all',
  getSignOut: '/feedback/all',
  getByFilter: '/filter',
} as const;


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await userService.getAll(res.locals.user);
  return res.status(HttpStatusCodes.OK).json(users);
}

/**
 * @api {get} /users/feedback/all Request User Feedbacks
 * @apiName RequestUserFeedbacks
 * @apiGroup User
 *
 * @apiBody {Number} orderDesc 0:false 1:true
 * @apiBody {string} orderBy  SUBJECT, PRODUCT_PRICE, UPLOAD_TIME, DISTANCE
 * @apiPermission admin
 *
 * @apiSuccess {String} Nothing
 *
 * @apiParamExample {json} Request-Example:
 * {
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * []
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

async function getSignOut(_:IReq, res:IRes){
  const userFeedbacks = await userService.getSignout(res.locals.user);
  return res.status(HttpStatusCodes.OK).json(userFeedbacks);
}

/**
 * @api {post} /users/filter Request Users with filter
 * @apiName RequestUsersWithFilter
 * @apiGroup User
 *
 * @apiBody {Number} orderDesc 0:false 1:true
 * @apiBody {string} orderBy  SUBJECT, PRODUCT_PRICE, UPLOAD_TIME, DISTANCE
 * @apiPermission admin
 *
 * @apiSuccess {String} Nothing
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "filter":{
 *       "queryString": "9881",
 *       "orderBy":"NICKNAME",
 *       "orderDesc":false
 *     }
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "USER_ID": 26,
 *         "PHONE": "01098810664",
 *         "PASSWORD": "$2b$12$n4/VuFa4dhtfRYN0cNT4ZOuEMiSK2iVBhZbBLspuGkTSNrfYTdNCO",
 *         "NICKNAME": "정해민",
 *         "NAME": null,
 *         "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkbjQvVnVGYTRkaHRmUllOMGNOVDRaT3VFTWlTSzJpVkJoWmJCTHNwdUdrVFNOcmZZVGROQ08iLCJpYXQiOjE2Nzk2MzI1MDUsImV4cCI6MTY3OTg5MTcwNX0.mcq_ZXqtJcVs0Ls7ff2T8ewGHNZInrQIBTJzAwQsSu8",
 *         "BUYING_SAVINGS": 7500,
 *         "SELLING_SAVINGS": 0,
 *         "WASTE_SAVINGS": 7500,
 *         "GREENGAS_SAVINGS": 105000,
 *         "COST_SAVINGS": 3750000,
 *         "GROUP": 99,
 *         "PROFILE_IMAGE": "profile/1673239954601_img-ObBaphDQMth1gVfJIwiS0HUh.png",
 *         "INTERIOR_COMPANY_TF": false,
 *         "INTERIOR_COMPANY_NAME": null,
 *         "BIRTHDAY": null,
 *         "GENDER": null,
 *         "ZIP_CODE": null,
 *         "ADDRESS": null,
 *         "DETAIL_ADDRESS": null,
 *         "JOIN_STATE": null,
 *         "RESTING_TF": false,
 *         "LEAVE_TF": false,
 *         "PHONE_AUTH_CODE": "144312",
 *         "PHONE_AUTH_DATE": null,
 *         "PHONE_AUTH_SUCCEED_DATE": null,
 *         "PHONE_AUTH_TF": true,
 *         "REG_TIME": "2023-01-05T02:24:32.000Z",
 *         "UPD_TIME": "2023-03-24T04:35:05.000Z",
 *         "JOIN_TIME": "2023-01-05T02:24:32.000Z",
 *         "JOIN_PERMIT_USER_ID": null,
 *         "JOIN_AGREE": "11100",
 *         "AGREE_UPD_TIME": "2023-02-27T07:35:30.000Z",
 *         "ACCESS_TIME": "2023-04-01T13:19:42.000Z"
 *     },
 *     {
 *         "USER_ID": 23,
 *         "PHONE": "01098811234",
 *         "PASSWORD": "$2b$12$FxBYmsaUvcljOg7IfTWqhOCYq6MQAT6kC9HV1cCMh/8Bw8.Podnku",
 *         "NICKNAME": "차가운염소4146",
 *         "NAME": null,
 *         "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkRnhCWW1zYVV2Y2xqT2c3SWZUV3FoT0NZcTZNUUFUNmtDOUhWMWNDTWgvOEJ3OC5Qb2Rua3UiLCJpYXQiOjE2NzI1NTk4MzgsImV4cCI6MTY3MjgxOTAzOH0.Elu0XtgZWZW_yMAAE1sWJ4k-6EExUd6BoYz1LLDM6ls",
 *         "BUYING_SAVINGS": 0,
 *         "SELLING_SAVINGS": 0,
 *         "WASTE_SAVINGS": 0,
 *         "GREENGAS_SAVINGS": 0,
 *         "COST_SAVINGS": 0,
 *         "GROUP": 0,
 *         "PROFILE_IMAGE": null,
 *         "INTERIOR_COMPANY_TF": false,
 *         "INTERIOR_COMPANY_NAME": null,
 *         "BIRTHDAY": null,
 *         "GENDER": null,
 *         "ZIP_CODE": null,
 *         "ADDRESS": null,
 *         "DETAIL_ADDRESS": null,
 *         "JOIN_STATE": null,
 *         "RESTING_TF": false,
 *         "LEAVE_TF": false,
 *         "PHONE_AUTH_CODE": "890266",
 *         "PHONE_AUTH_DATE": null,
 *         "PHONE_AUTH_SUCCEED_DATE": null,
 *         "PHONE_AUTH_TF": true,
 *         "REG_TIME": "2023-01-01T04:29:15.000Z",
 *         "UPD_TIME": "2023-02-27T07:26:26.000Z",
 *         "JOIN_TIME": "2023-01-01T04:29:15.000Z",
 *         "JOIN_PERMIT_USER_ID": null,
 *         "JOIN_AGREE": "11100",
 *         "AGREE_UPD_TIME": "2023-02-27T07:35:30.000Z",
 *         "ACCESS_TIME": "2023-04-01T13:19:42.000Z"
 *     }
 * ]
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

async function getByFilter(req:IReq<{filter:UserFilter}>, res:IRes){
  const {filter} = req.body;
  const users = await userService.getByFilter(filter);
  return res.status(HttpStatusCodes.OK).json(users);
}

// **** Export default **** //

export default {
  paths,
  getAll,
  getSignOut,
  getByFilter,
} as const;
