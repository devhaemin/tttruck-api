import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import noticeService from '@src/services/notice-service';
import {IReq, IRes} from './shared/types';
import {
  tt_notice,
  tt_notice_master,
  tt_user,
} from '@src/models/init-models';
import logger from "jet-logger";
import {getClientIP} from "@src/util/ip-util";
import {S3File} from "@src/routes/shared/awsMultipart";
import { tt_user_group } from '../models/dummy/tt_user_group';


// **** Variables **** //

// Paths
const paths = {
  basePath: '/notices',
  getAll: '/all',
  getCategories: '/category',
  getByCategory: '/category/:id',
  getById: '/:id',
  add: '/add',
  imageUpload: '/image/upload',
  update: '/update',
  delete: '/delete/:id',
} as const;


// **** Functions **** //

/**
 * @api {get} /notices/all Get All Notice List
 * @apiName GetNotices
 * @apiGroup Notice
 *
 * @apiPermission none
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "NOTICE_MASTER_ID": 1,
 *         "NOTICE_ID": 1,
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
 *         "NOTICE_MASTER_ID": 1,
 *         "NOTICE_ID": 2,
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
 *       "error": "NoticeNotFound"
 *     }
 */
async function getAll(req: IReq, res: IRes) {
  const userGroup = await getUser(req);
  let notices;
  if(userGroup == tt_user_group.ADMIN){
    notices = await noticeService.getAllByAdmin();
  }else{
    notices = await noticeService.getAll();
  }
  logger.info(notices);
  //todo 이미지 Array 추가되게끔 하기.
  return res.status(HttpStatusCodes.OK).json(notices);
}

async function getUser(req:IReq){
  const userToken = req.headers['authorization']?.split(" ")[1];
  if(!userToken){
    return 0;
  }
  const user = await tt_user.findOne(
    { 
      attributes: ["GROUP"],
      where: {ACCESSTOKEN: userToken},
    });
  return user?.GROUP;
}
/**
 * @api {get} /notices/category/:id Get Notices by Category
 * @apiName GetNoticesByCategory
 * @apiGroup Notice
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
 * @apiError NoticeNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NoticeNotFound"
 *     }
 */
async function getByCategory(req: IReq, res: IRes) {
  const id = +req.params.id;
  const notices = await noticeService.getByCategory(id);
  logger.info(notices);
  return res.status(HttpStatusCodes.OK).json(notices);
}

/**
 * @api {get} /notices/:id Get Notice by ID
 * @apiName GetNoticeByID
 * @apiGroup Notice
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
 * @apiError NoticeNotFound The id of the Notice was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NoticeNotFound"
 *     }
 */
async function getById(req: IReq, res: IRes) {
  const id = +req.params.id;
  const notice = await noticeService.getById(id);
  logger.info(notice);
  return res.status(HttpStatusCodes.OK).json(notice);
}


/**
 * @api {post} /notices/add Add Notice
 * @apiName AddNotice
 * @apiGroup Notice
 *
 * @apiPermission adminUser
 * @apiParamExample {json} Request-Example:
 * {
 *     "notice":{
 *         "NOTICE_MASTER_ID":1,
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
 *     "NOTICE_ID": 2,
 *     "NOTICE_MASTER_ID": 1,
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
 *       "error": "NoticeNotFound"
 *     }
 */

async function add(req: IReq<{ notice: tt_notice }>, res: IRes) {
  const {notice} = req.body;
  const user = res.locals.user;
  notice.UPDATE_IPv4 = getClientIP(req);
  notice.POST_IPv4 = getClientIP(req);
  notice.POST_USER_ID = user.USER_ID;
  notice.UPDATE_USER_ID = user.USER_ID;
  const result = await noticeService.addOne(notice);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {post} /notices/image/upload Add Notice image file
 * @apiName AddNoticeImage
 * @apiGroup Notice
 *
 * @apiPermission normalUser
 *
 * @apiBody {Number} noticeId 소식 ID 값
 * @apiBody {File} file 소식에 추가할 이미지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *     "NOTICE_MASTER_ID": 1,
 *     "NOTICE_ID": 1,
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
 *       "error": "NoticeNotFound"
 *     }
 */
async function imageUpload(req: IReq<{noticeId: number }>, res: IRes) {
  const {noticeId} = req.body;
  const file = req.file as S3File;
  const result = await noticeService.uploadImage(noticeId,file,res.locals.user,getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}


/**
 * @api {put} /notices/update Update notice
 * @apiName UpdateNotice
 * @apiGroup Notice
 *
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "notice":{
 *         "NOTICE_ID":1,
 *         "NOTICE_MASTER_ID":1,
 *         "SUBJECT":"TEST SUBJECT 2",
 *         "CONTENTS":"TEST CONTENTS 2"
 *     }
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "NOTICE_ID": 1,
 *     "NOTICE_MASTER_ID": 1,
 *     "SUBJECT": "TEST SUBJECT 2",
 *     "CONTENTS": "TEST CONTENTS 2"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NoticeNotFound"
 *     }
 */

async function update(req: IReq<{  notice: tt_notice }>, res: IRes) {
  const {notice} = req.body;
  const result = await noticeService.updateOne(res.locals.user, notice);
  return res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {delete} /notices/delete/:id delete notice
 * @apiName DeleteNotice
 * @apiGroup Notice
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
 *       "error": "NoticeNotFound"
 *     }
 */
async function _delete(req: IReq, res: IRes) {
  const id = +req.params.id;
  await noticeService.delete(res.locals.user, id);
  return res.status(HttpStatusCodes.OK).end();
}
/**
 * @api {get} /notices/category Get All Categories
 * @apiName GetNoticeCategories
 * @apiGroup Notice
 * @apiPermission none
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *     {
 *         "NOTICE_MASTER_ID": 1,
 *         "TITLE": "이벤트",
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
 *         "NOTICE_MASTER_ID": 2,
 *         "TITLE": "공지사항",
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
 *         "NOTICE_MASTER_ID": 3,
 *         "TITLE": "뉴스",
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
 *         "NOTICE_MASTER_ID": 4,
 *         "TITLE": "팁",
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
  logger.info("TEST");
  const categories = await tt_notice_master.findAll();
  return res.status(HttpStatusCodes.OK).json(categories).end();
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
  delete: _delete,
  getCategories,
} as const;
