import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import noticeService from '@src/services/notice-service';
import {IReq, IRes} from './shared/types';
import {tt_notice} from '@src/models/init-models';
import logger from "jet-logger";
import {getClientIP} from "@src/util/ip-util";
import {S3File} from "@src/routes/shared/awsMultipart";
import {tt_noticeId} from "@src/models/tt_notice";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/notices',
  getAll: '/all',
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
 *     {
 *     //todo: 추가하기
 *     ]
 * }
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
  const notices = await noticeService.getAll();
  logger.info(notices);
  return res.status(HttpStatusCodes.OK).json({products: notices});
}

/**
 * @api {get} /notices/category/:id Get Noticess by Category
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
  return res.status(HttpStatusCodes.OK).json({products: notices});
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
  return res.status(HttpStatusCodes.OK).json({product: notice});
}


/**
 * @api {post} /notices/add Add product
 * @apiName AddNotice
 * @apiGroup Notice
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *
 *   }
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NoticeNotFound"
 *     }
 */

async function add(req: IReq<{ notice: tt_notice }>, res: IRes) {
  const {notice} = req.body;
  notice.UPDATE_IPv4 = getClientIP(req);
  notice.POST_IPv4 = getClientIP(req);
  notice.POST_USER_ID = res.locals.user.USER_ID;
  notice.UPDATE_USER_ID = res.locals.user.USER_ID;
  await noticeService.addOne(notice);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * @api {post} /notices/image Add Notice image file
 * @apiName AddNoticeImage
 * @apiGroup Notice
 *
 * @apiPermission normalUser
 *
 * @apiBody Number noticeId 소식 ID 값
 * @apiBody File file 소식에 추가할 이미지
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
async function imageUpload(req: IReq<{noticeId: tt_noticeId }>, res: IRes) {
  const {noticeId} = req.body;
  const file = req.file as S3File;
  const notice = await tt_notice.findByPk(noticeId);
  await noticeService.uploadImage(notice,file,res.locals.user,getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).end();
}


/**
 * @api {update} /notices/update Add notice
 * @apiName AddNotice
 * @apiGroup Notice
 *
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   notice:{
 *
 *   }
 * }
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

async function update(req: IReq<{  notice: tt_notice }>, res: IRes) {
  const {notice} = req.body;
  await noticeService.updateOne(res.locals.user, notice);
  return res.status(HttpStatusCodes.OK).end();
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
} as const;
