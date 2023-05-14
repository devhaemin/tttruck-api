import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from "@src/routes/shared/types";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import noticeService from "@src/services/notice-service";
import logger from "jet-logger";
import bannerService from "@src/services/banner-service";
import {tt_banner, tt_notice} from "@src/models/init-models";
import {getClientIP} from "@src/util/ip-util";
import {S3File} from "@src/routes/shared/awsMultipart";
import {tt_bannerPk} from "@src/models/tt_banner";

// **** Variables **** //

// Paths
const paths = {
  basePath: '/banners',
  getAll: '/all',
  getById: '/:id',
  updateTopfix: '/:id/topfix',
  add: '/add',
  imageUpload: '/image/upload',
  update: '/update',
} as const;


// **** Functions **** //

/**
 * @api {get} /banners/all Get All Banner List
 * @apiName GetBanner
 * @apiGroup Banner
 *
 * @apiPermission none
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 * ]
 *
 *
 * @apiError BannerNotFound The id of the Banner was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BannerNotFound"
 *     }
 */
async function getAll(req: IReq, res: IRes) {
  const user = res.locals.user;
  let banners;
  if(user && user.GROUP == tt_user_group.ADMIN){
    banners = await bannerService.getAllByAdmin();
  }else{
    banners = await bannerService.getAll();
  }
  return res.status(HttpStatusCodes.OK).json(banners);
}
/**
 * @api {get} /banners/:id Get Banner by ID
 * @apiName GetBannerByID
 * @apiGroup Banner
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
 * @apiError BannerNotFound The id of the Notice was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BannerNotFound"
 *     }
 */
async function getById(req: IReq, res: IRes) {
  const id = +req.params.id;
  const banner = await bannerService.getById(id);
  logger.info(banner);
  return res.status(HttpStatusCodes.OK).json(banner);
}

/**
 * @api {post} /banners/add Add Banner
 * @apiName AddBanner
 * @apiGroup Banner
 *
 * @apiPermission adminUser
 * @apiParamExample {json} Request-Example:
 * {
 *     "banner":{
 *         "BANNER_NAME":"TEST SUBJECT",
 *         "BANNER_CONTENTS":"CONTENSTS",
 *         "BANNER_URL":"REDIRECTION URL",
 *         "BANNER_TYPE":0,
 *         "DISPLAY_TF":1
 *     }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "DELAY_TIME": 0,
 *     "TOP_FIX_TF": false,
 *     "UPDATE_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "POST_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "BANNER_ID": 2,
 *     "BANNER_NAME": "TEST SUBJECT",
 *     "BANNER_CONTENTS": "CONTENSTS",
 *     "BANNER_URL": "REDIRECTION URL",
 *     "BANNER_TYPE": 0,
 *     "DISPLAY_TF": true,
 *     "UPDATE_IPv4": null,
 *     "POST_IPv4": null,
 *     "POST_USER_ID": 1,
 *     "UPDATE_USER_ID": 1
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NoticeNotFound"
 *     }
 */

async function add(req: IReq<{ banner: tt_banner }>, res: IRes) {
  const {banner} = req.body;
  const user = res.locals.user;
  banner.UPDATE_IPv4 = getClientIP(req);
  banner.POST_IPv4 = getClientIP(req);
  banner.POST_USER_ID = user.USER_ID;
  banner.UPDATE_USER_ID = user.USER_ID;
  const result = await bannerService.addOne(banner);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {post} /banners/image/upload Add Banner image file
 * @apiName AddBannerImage
 * @apiGroup Banner
 *
 * @apiPermission normalUser
 *
 * @apiBody {Number} bannerId 배너 ID 값
 * @apiBody {File} file 배너에 추가할 이미지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BannerNotFound"
 *     }
 */
async function imageUpload(req: IReq<{bannerId: number }>, res: IRes) {
  const {bannerId} = req.body;
  const file = req.file as S3File;
  const result = await bannerService.uploadImage(bannerId,file,res.locals.user,getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}


/**
 * @api {put} /banners/update Update banner
 * @apiName UpdateBanner
 * @apiGroup Banner
 *
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "banner":{
 *         "BANNER_ID":1,
 *         "BANNER_NAME":"TEST SUBJECT MODIFY",
 *         "BANNER_CONTENTS":"CONTENSTS",
 *         "BANNER_URL":"REDIRECTION URL",
 *         "BANNER_TYPE":0,
 *         "DISPLAY_TF":1
 *     }
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BannerNotFound"
 *     }
 */

async function update(req: IReq<{  banner: tt_banner }>, res: IRes) {
  const {banner} = req.body;
  const result = await bannerService.updateOne(res.locals.user, banner);
  return res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {put} /banners/:id/topfix Set Banner Topfix
 * @apiName TopfixBanner
 * @apiGroup Banner
 *
 * @apiParam {Number} bannerId
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
 *       "error": "BannerNotFound"
 *     }
 */

async function updateTopfix(req: IReq<{  topfix:boolean }>, res: IRes) {
  const {topfix} = req.body;
  const bannerId = +req.params.id;
  const result = await bannerService.updateTopFix(res.locals.user, bannerId, topfix);
  return res.status(HttpStatusCodes.OK).json(result).end();
}


// **** Export default **** //

export default {
  paths,
  getAll,
  getById,
  updateTopfix,
  add,
  imageUpload,
  update,
} as const;
