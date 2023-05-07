import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import truckerCenterService from '@src/services/trucker-center-service';
import {IReq, IRes} from './shared/types';
import {
  tt_trucker_center, tt_trucker_center_master,
} from '@src/models/init-models';
import logger from "jet-logger";
import {getClientIP} from "@src/util/ip-util";
import {S3File} from "@src/routes/shared/awsMultipart";
import noticeService from "@src/services/notice-service";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/truckercenter',
  getAll: '/all',
  getCategories: '/category',
  getByCategory: '/category/:id',
  getById: '/:id',
  add: '/add',
  imageUpload: '/image/upload',
  uploadTempImages: '/image/temp/upload',
  updateTopfix: '/:id/topfix',
  update: '/update',
  delete: '/delete/:id',
  associateTempImage: '/image/associate',
} as const;


// **** Functions **** //

/**
 * @api {get} /truckercenter/all Get All TruckerCenter List
 * @apiName GetTruckerCenter
 * @apiGroup TruckerCenter
 *
 * @apiPermission none
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "TRUCKER_CENTER_MASTER_ID": 1,
 *         "TRUCKER_CENTER_ID": 1,
 *         "SUBJECT": "TEST SUBJECT",
 *         "HTML_TF": false,
 *         "CONTENTS": "TEST CONTENTS",
 *         "DISPLAY_TF": true,
 *         "DISPLAY_START_TIME": "2022-12-24T07:42:53.000Z",
 *         "DISPLAY_END_TIME": "2022-12-24T07:42:53.000Z",
 *         "POST_USER_ID": 4,
 *         "POST_TIME": "2022-12-24T07:42:53.000Z",
 *         "POST_IPv4": 0,
 *         "POST_IPv6": null,
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_TIME": "2022-12-24T07:42:53.000Z",
 *         "UPDATE_IPv4": 0,
 *         "UPDATE_IPv6": null,
 *         "CONTENT_ID": null,
 *         "TOP_FIX_TF": false
 *     },
 *     {
 *         "TRUCKER_CENTER_MASTER_ID": 1,
 *         "TRUCKER_CENTER_ID": 2,
 *         "SUBJECT": "TEST SUBJECT",
 *         "HTML_TF": false,
 *         "CONTENTS": "TEST CONTENTS",
 *         "DISPLAY_TF": true,
 *         "DISPLAY_START_TIME": "2022-12-24T07:43:38.000Z",
 *         "DISPLAY_END_TIME": "2022-12-24T07:43:38.000Z",
 *         "POST_USER_ID": 4,
 *         "POST_TIME": "2022-12-24T07:43:38.000Z",
 *         "POST_IPv4": 0,
 *         "POST_IPv6": null,
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_TIME": "2022-12-24T07:43:38.000Z",
 *         "UPDATE_IPv4": 0,
 *         "UPDATE_IPv6": null,
 *         "CONTENT_ID": null,
 *         "TOP_FIX_TF": false
 *     }
 * ]
 *
 *
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TRUCKER_CENTER NotFound"
 *     }
 */
async function getAll(req: IReq, res: IRes) {
  const truckerCenters = await truckerCenterService.getAll();
  logger.info(truckerCenters);
  //todo 이미지 Array 추가되게끔 하기.
  return res.status(HttpStatusCodes.OK).json(truckerCenters);
}

/**
 * @api {put} /truckercenter/:id/topfix Set TruckerCenter Topfix
 * @apiName TopfixTruckerCenter
 * @apiGroup TruckerCenter
 *
 * @apiParam {Number} truckerCenterId
 *
 * @apiPermission adminUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     topfix : true
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NoticeNotFound"
 *     }
 */

async function updateTopfix(req: IReq<{  topfix:boolean }>, res: IRes) {
  const {topfix} = req.body;
  const truckerCenterId = +req.params.id;
  const result = await truckerCenterService.updateTopFix(res.locals.user, truckerCenterId, topfix);
  return res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {get} /truckercenter/category/:id Get truckerCenters by Category
 * @apiName GetTruckerCentersByCategory
 * @apiGroup TruckerCenter
 *
 * @apiPermission none
 * @apiParam {Number} id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *     ]
 * }
 *
 * @apiError TruckerCenterNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TruckerCenterNotFound"
 *     }
 */
async function getByCategory(req: IReq, res: IRes) {
  const id = +req.params.id;
  const truckerCenters = await truckerCenterService.getByCategory(id);
  logger.info(truckerCenters);
  return res.status(HttpStatusCodes.OK).json(truckerCenters);
}

/**
 * @api {get} /truckercenter/:id Get TruckerCenter by ID
 * @apiName GetTruckerCenterByID
 * @apiGroup TruckerCenter
 *
 * @apiPermission none
 *
 * @apiParam {Number} id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 * }
 *
 * @apiError TruckerCenterNotFound The id of the TruckerCenter was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TruckerCenterNotFound"
 *     }
 */
async function getById(req: IReq, res: IRes) {
  const id = +req.params.id;
  const truckerCenter = await truckerCenterService.getById(id);
  return res.status(HttpStatusCodes.OK).json(truckerCenter);
}


/**
 * @api {post} /truckercenter/add Add TruckerCenter
 * @apiName AddTruckerCenter
 * @apiGroup TruckerCenter
 *
 * @apiPermission adminUser
 * @apiParamExample {json} Request-Example:
 * {
 *     "truckerCenter":{
 *         "TRUCKER_CENTER_MASTER_ID":1,
 *         "SUBJECT":"TEST SUBJECT",
 *         "CONTENTS":"TEST CONTENTS"
 *     }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "HTML_TF": false,
 *     "DISPLAY_TF": true,
 *     "DISPLAY_START_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "DISPLAY_END_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "POST_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "UPDATE_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "TOP_FIX_TF": false,
 *     "TRUCKER_CENTER_ID": 2,
 *     "TRUCKER_CENTER_MASTER_ID": 1,
 *     "SUBJECT": "TEST SUBJECT",
 *     "CONTENTS": "TEST CONTENTS",
 *     "UPDATE_IPv4": null,
 *     "POST_IPv4": null,
 *     "POST_USER_ID": 4,
 *     "UPDATE_USER_ID": 4
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TruckerCenterNotFound"
 *     }
 */

async function add(req: IReq<{ truckerCenter: tt_trucker_center }>, res: IRes) {
  const {truckerCenter} = req.body;
  const user = res.locals.user;
  truckerCenter.UPDATE_IPv4 = getClientIP(req);
  truckerCenter.POST_IPv4 = getClientIP(req);
  truckerCenter.POST_USER_ID = user.USER_ID;
  truckerCenter.UPDATE_USER_ID = user.USER_ID;
  const result = await truckerCenterService.addOne(truckerCenter);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}


/**
 * @api {post} /truckercenter/image/upload Add TruckerCenter image file
 * @apiName AddTruckerCenterImage
 * @apiGroup TruckerCenter
 *
 * @apiPermission normalUser
 *
 * @apiBody {Number} truckerCenterId 소식 ID 값
 * @apiBody {File} file 소식에 추가할 이미지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *     "TRUCKER_CENTER_MASTER_ID": 1,
 *     "TRUCKER_CENTER_ID": 1,
 *     "SUBJECT": "TEST SUBJECT 2",
 *     "HTML_TF": false,
 *     "CONTENTS": "TEST CONTENTS 2",
 *     "DISPLAY_TF": true,
 *     "DISPLAY_START_TIME": "2022-12-24T07:42:53.000Z",
 *     "DISPLAY_END_TIME": "2022-12-24T07:42:53.000Z",
 *     "POST_USER_ID": 4,
 *     "POST_TIME": "2022-12-24T07:42:53.000Z",
 *     "POST_IPv4": 0,
 *     "POST_IPv6": null,
 *     "UPDATE_USER_ID": 4,
 *     "UPDATE_TIME": "2022-12-24T16:45:58.000Z",
 *     "UPDATE_IPv4": null,
 *     "UPDATE_IPv6": null,
 *     "CONTENT_ID": null,
 *     "TOP_FIX_TF": false
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "truckerCenterNotFound"
 *     }
 */
async function imageUpload(req: IReq<{truckerCenterId: number }>, res: IRes) {
  const {truckerCenterId} = req.body;
  const file = req.file as S3File;
  const result = await truckerCenterService.uploadImage(truckerCenterId,file,res.locals.user,getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}


/**
 * @api {put} /truckercenter/update Update truckerCenter
 * @apiName UpdateTruckerCenter
 * @apiGroup TruckerCenter
 *
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "truckerCenter":{
 *         "TRUCKER_CENTER_ID":1,
 *         "TRUCKER_CENTER_MASTER_ID":1,
 *         "SUBJECT":"TEST SUBJECT 2",
 *         "CONTENTS":"TEST CONTENTS 2"
 *     }
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "TRUCKER_CENTER_ID": 1,
 *     "TRUCKER_CENTER_MASTER_ID": 1,
 *     "SUBJECT": "TEST SUBJECT 2",
 *     "CONTENTS": "TEST CONTENTS 2"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TruckerCenterNotFound"
 *     }
 */

async function update(req: IReq<{  truckerCenter:tt_trucker_center }>, res: IRes) {
  const {truckerCenter} = req.body;
  const result = await truckerCenterService.updateOne(res.locals.user, truckerCenter);
  return res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {delete} /truckercenter/delete/:id delete truckerCenter
 * @apiName DeleteTruckerCenter
 * @apiGroup TruckerCenter
 *
 * @apiPermission normalUser
 *
 * @apiParam {Number} id
 *
 * @apiParamExample {json} Request-Example:
 * {}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TruckerCenterNotFound"
 *     }
 */
async function _delete(req: IReq, res: IRes) {
  const id = +req.params.id;
  await truckerCenterService.delete(res.locals.user, id);
  return res.status(HttpStatusCodes.OK).end();
}
/**
 * @api {get} /truckercenter/category Get All Categories
 * @apiName GetTruckerCenterCategories
 * @apiGroup TruckerCenter
 * @apiPermission none
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *         "TRUCKER_CENTER_MASTER_ID": 1,
 *         "TITLE": "자주묻는질문",
 *         "COMMENT_TF": true,
 *         "SECRET_TF": false,
 *         "ATTACH_TF": true,
 *         "DISPLAY_TF": false,
 *         "DIV_CODE": null,
 *         "CREATE_USER_ID": 1,
 *         "CREATE_TIME": "2022-12-24T07:17:28.000Z",
 *         "REG_IPv4": null,
 *         "REG_IPv6": null,
 *         "UPDATE_USER_ID": null,
 *         "UPDATE_TIME": "2022-12-24T07:17:28.000Z",
 *         "UPDATE_IPv4": null,
 *         "UPDATE_IPv6": null,
 *         "EXTRA_FIELD_FIRST_LABEL": null,
 *         "EXTRA_FIELD_FIRST_CODE": null,
 *         "DELETE_TF": false
 *     },
 *     {
 *         "TRUCKER_CENTER_MASTER_ID": 2,
 *         "TITLE": "구매/판매",
 *         "COMMENT_TF": true,
 *         "SECRET_TF": false,
 *         "ATTACH_TF": true,
 *         "DISPLAY_TF": false,
 *         "DIV_CODE": null,
 *         "CREATE_USER_ID": 1,
 *         "CREATE_TIME": "2022-12-24T07:17:28.000Z",
 *         "REG_IPv4": null,
 *         "REG_IPv6": null,
 *         "UPDATE_USER_ID": null,
 *         "UPDATE_TIME": "2022-12-24T07:17:28.000Z",
 *         "UPDATE_IPv4": null,
 *         "UPDATE_IPv6": null,
 *         "EXTRA_FIELD_FIRST_LABEL": null,
 *         "EXTRA_FIELD_FIRST_CODE": null,
 *         "DELETE_TF": false
 *     }
 * ]
 *
 */
async function getCategories(req:IReq, res:IRes){
  const categories = await tt_trucker_center_master.findAll();
  return res.status(HttpStatusCodes.OK).json(categories).end();
}


/**
 * @api {post} /truckercenter/image/temp/upload Add TruckerCenter Temp image file
 * @apiName AddTruckerCenterTempImage
 * @apiGroup TruckerCenter
 *
 * @apiPermission normalUser
 *
 * @apiBody {File} file 소식에 추가할 이미지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "TEMP_IMAGE_ID": 2,
 *     "FILE_NAME": "notice/image/1682265098931_Untitled.png",
 *     "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/notice%2Fimage%2F1682265098931_Untitled.png",
 *     "FILE_SIZE": 0
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NoticeNotFound"
 *     }
 */
async function uploadTempImages(req:IReq, res:IRes){
  const file = req.file as S3File;
  const result = await truckerCenterService.uploadTempImage(file,res.locals.user,getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {put} /truckercenter/image/associate Associate Temp Image with Normal
 * @apiName AssociateTempImage
 * @apiGroup TruckerCenter
 *
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     tempImageIds:[1,2,3],
 *     truckerCenterId 소식 ID 값
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "TRUCKER_CENTER_ID": 1,
 *     "TRUCKER_CENTER_MASTER_ID": 1,
 *     "SUBJECT": "TEST SUBJECT 2",
 *     "CONTENTS": "TEST CONTENTS 2"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TruckerCenterNotFound"
 *     }
 */

async function associateTempImage(req: IReq<{  tempImageIds:[number], truckerCenterId:number }>, res: IRes) {
  const {tempImageIds, truckerCenterId} = req.body;
  const result = await truckerCenterService.associateTempImage(res.locals.user, tempImageIds, truckerCenterId);
  return res.status(HttpStatusCodes.OK).json(result).end();
}


// **** Export default **** //

export default {
  paths,
  getAll,
  getByCategory,
  getById,
  add,
  imageUpload,
  update,
  updateTopfix,
  delete: _delete,
  getCategories,
  uploadTempImages,
  associateTempImage,
} as const;
