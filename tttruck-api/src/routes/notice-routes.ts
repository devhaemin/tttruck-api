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
  uploadTempImages: '/image/temp/upload',
  associateTempImage: '/image/associate',
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
 [
    {
        "NOTICE_MASTER_ID": 2,
        "NOTICE_ID": 18,
        "SUBJECT": "test",
        "HTML_TF": false,
        "CONTENTS": "<p>안녕하세요</p>\n<p></p>\n<img src=\"https://cdn.tttruck.co.kr/notice/image/1682423884936_áá³áá¥áá¥áá¦á«áá¥ááµááµááµ.png\" alt=\"undefined\" style=\"height: 100px;width: 100px\"/>\n<p>TEST</p>\n",
        "DISPLAY_TF": true,
        "DISPLAY_START_TIME": "2023-04-25T11:58:17.000Z",
        "DISPLAY_END_TIME": "2023-04-25T11:58:17.000Z",
        "POST_USER_ID": 22,
        "POST_TIME": "2023-04-25T11:58:17.000Z",
        "POST_IPv4": 3716520229,
        "POST_IPv6": null,
        "UPDATE_USER_ID": 22,
        "UPDATE_TIME": "2023-04-25T11:58:17.000Z",
        "UPDATE_IPv4": 3716520229,
        "UPDATE_IPv6": null,
        "CONTENT_ID": null,
        "TOP_FIX_TF": false,
        "tt_notice_images": [],
        "NOTICE_MASTER": {
            "NOTICE_MASTER_ID": 2,
            "TITLE": "공지사항"
        }
    }
]
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
 {
    "NOTICE_MASTER_ID": 4,
    "NOTICE_ID": 17,
    "SUBJECT": "test3",
    "HTML_TF": false,
    "CONTENTS": "<p>test5</p>\n<div style=\"text-align:left;\"><img src=\"https://cdn.tttruck.co.kr/notice/image/1682425145145_áá³áá¥áá¥áá¦á«áá¥ááµááµááµ.png\" alt=\"undefined\" style=\"height: 100px;width: 100px\"/></div>\n<p>test</p>\n<img src=\"https://cdn.tttruck.co.kr/notice/image/1682425157753_áá³áá¥áá¥áá¦á«áá¥ááµááµááµ.png\" alt=\"undefined\" style=\"height: 200px;width: 200px\"/>\n<p></p>\n",
    "DISPLAY_TF": true,
    "DISPLAY_START_TIME": "2023-04-23T12:40:29.000Z",
    "DISPLAY_END_TIME": "2023-04-23T12:40:29.000Z",
    "POST_USER_ID": null,
    "POST_TIME": "2023-04-23T12:40:29.000Z",
    "POST_IPv4": null,
    "POST_IPv6": null,
    "UPDATE_USER_ID": null,
    "UPDATE_TIME": "2023-04-25T12:19:24.000Z",
    "UPDATE_IPv4": null,
    "UPDATE_IPv6": null,
    "CONTENT_ID": null,
    "TOP_FIX_TF": false,
    "tt_notice_images": [
        {
            "NOTICE_IMAGE_ID": 24,
            "NOTICE_ID": 17,
            "FILE_NAME": "notice/image/1682253634826_img-y2MK4pUenSFjBbj0lRZQTQIy.png",
            "FILE_PATH": null,
            "FILE_SIZE": 787387,
            "ORG_FILE_SEQ": null,
            "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/notice/image/1682253634826_img-y2MK4pUenSFjBbj0lRZQTQIy.png",
            "THUMB_PATH": null,
            "FILE_ID": null,
            "CONTENT_ID": null,
            "TIME": "2023-04-23T12:40:35.000Z"
        },
        {
            "NOTICE_IMAGE_ID": 25,
            "NOTICE_ID": 17,
            "FILE_NAME": null,
            "FILE_PATH": null,
            "FILE_SIZE": null,
            "ORG_FILE_SEQ": null,
            "FILE_URL": null,
            "THUMB_PATH": null,
            "FILE_ID": null,
            "CONTENT_ID": null,
            "TIME": "2023-04-23T16:31:21.000Z"
        },
        {
            "NOTICE_IMAGE_ID": 26,
            "NOTICE_ID": 17,
            "FILE_NAME": null,
            "FILE_PATH": null,
            "FILE_SIZE": null,
            "ORG_FILE_SEQ": null,
            "FILE_URL": null,
            "THUMB_PATH": null,
            "FILE_ID": null,
            "CONTENT_ID": null,
            "TIME": "2023-04-23T16:31:21.000Z"
        },
        {
            "NOTICE_IMAGE_ID": 27,
            "NOTICE_ID": 17,
            "FILE_NAME": "notice/image/1682425145145_áá³áá¥áá¥áá¦á«áá¥ááµááµááµ.png",
            "FILE_PATH": null,
            "FILE_SIZE": 399330,
            "ORG_FILE_SEQ": null,
            "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/notice/image/1682425145145_%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%A5%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A5%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A6%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%A5%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%86%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%B5.png",
            "THUMB_PATH": null,
            "FILE_ID": null,
            "CONTENT_ID": null,
            "TIME": "2023-04-25T12:19:05.000Z"
        },
        {
            "NOTICE_IMAGE_ID": 28,
            "NOTICE_ID": 17,
            "FILE_NAME": "notice/image/1682425157753_áá³áá¥áá¥áá¦á«áá¥ááµááµááµ.png",
            "FILE_PATH": null,
            "FILE_SIZE": 399330,
            "ORG_FILE_SEQ": null,
            "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/notice/image/1682425157753_%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%A5%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A5%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A6%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%A5%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%86%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%B5.png",
            "THUMB_PATH": null,
            "FILE_ID": null,
            "CONTENT_ID": null,
            "TIME": "2023-04-25T12:19:17.000Z"
        }
    ],
    "NOTICE_MASTER": {
        "NOTICE_MASTER_ID": 4,
        "TITLE": "팁"
    }
}
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

/**
 * @api {post} /notices/image/temp/upload Add Notice Temp image file
 * @apiName AddNoticeTempImage
 * @apiGroup Notice
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
  const result = await noticeService.uploadTempImage(file,res.locals.user,getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {put} /notice/image/associate Associate Temp Image with Normal
 * @apiName AssociateTempImage
 * @apiGroup Notice
 *
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     tempImageIds:[1,2,3],
 *     noticeId 소식 ID 값
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

async function associateTempImage(req: IReq<{  tempImageIds:[number], noticeId:number }>, res: IRes) {
  const {tempImageIds, noticeId} = req.body;
  const result = await noticeService.associateTempImage(res.locals.user, tempImageIds, noticeId);
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
  delete: _delete,
  getCategories,
  uploadTempImages,
  associateTempImage,
} as const;
