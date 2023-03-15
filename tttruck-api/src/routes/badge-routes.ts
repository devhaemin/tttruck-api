import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import authService from '@src/services/auth-service';
import EnvVars from '@src/declarations/major/EnvVars';
import codeUtil from "@src/util/code-util";
import {IReq, IRes} from './shared/types';
import {tt_user_badge,tt_badge, tt_badge_condition} from "@src/models/init-models";
import {getRandomNicknames} from "@src/util/nick-gen-util";
import logger from "jet-logger";
import {S3File} from "@src/routes/shared/awsMultipart";
import chatService from "@src/services/chat-service";
import pwdUtil from "@src/util/pwd-util";
import badgeService from '@src/services/badge-service';
import { RouteError } from '@src/declarations/classes';
import { userNotFoundErr } from '@src/services/user-service';
import {Op, Sequelize} from "sequelize";
import productService from "@src/services/product-service";
import {getClientIP} from "@src/util/ip-util";

// **** Variables **** //

// Paths
const paths = {
  basePath: '/badge',
  getUserBadges: '/userBadge/list',
  getBadges: '/list',
  addBadge: '/addBadge',
  updateBadge: '/update/:badgeId',
  deleteBadge: '/delete/:badgeId',
  checkBadgeAvailable: '/obtain',
  setRepresentBadge: '/represent/:id',
  getBadge: '/:badgeId',
  setActiveImage: '/image/active',
  setFalseImage: '/image/false',
} as const;

// **** Functions **** //

/**
 * @api {get} /badge/userBadge/list Get tt_user_badges
 * @apiName getUserBadges
 * @apiGroup Badge
 *
 * @apiPermission normalUser
 *
 * @apiSuccessExample {json} success-Response:
 * [
 *     [
 *     {
 *         "BADGE_ID": 1,
 *         "BADGE_TYPE": 1,
 *         "BADGE_SUBJECT": "지구환경노조가입",
 *         "BADGE_CONTENT": "11",
 *         "BADGE_CONDITION_CONTENT": null,
 *         "BADGE_IMAGE_URL": null,
 *         "BADGE_IMAGE_URL_FALSE": null,
 *         "BADGE_REG_DATE": null,
 *         "tt_user_badges": []
 *     },
 *     {
 *         "BADGE_ID": 2,
 *         "BADGE_TYPE": 0,
 *         "BADGE_SUBJECT": "초보환경운동가",
 *         "BADGE_CONTENT": null,
 *         "BADGE_CONDITION_CONTENT": null,
 *         "BADGE_IMAGE_URL": null,
 *         "BADGE_IMAGE_URL_FALSE": null,
 *         "BADGE_REG_DATE": null,
 *         "tt_user_badges": [
 *             {
 *                 "USER_BADGE_ID": 9,
 *                 "USER_ID": 26,
 *                 "BADGE_ID": 2,
 *                 "REG_DATE": "2023-03-15T14:23:56.000Z",
 *                 "OP1": null,
 *                 "OP2": null,
 *                 "IS_ACTIVATED": true,
 *                 "REPRESENT_TF": false
 *             }
 *         ]
 *     }
 *  ...
 * ]
 */
async function getUserBadges(req:IReq,res:IRes){
  const user = res.locals.user;
  const badgeList = await badgeService.getUserBadges(user);
  return res.status(200).json(badgeList).end();
}

/**
 * @api {get} /badge/list Get tt_badges
 * @apiName getBadges
 * @apiGroup Badge
 *
 * @apiPermission adminUser
 *
 * @apiSuccessExample Success-Response:
 * [
 *     {
 *         "BADGE_ID": 1,
 *         "BADGE_SUBJECT": "지구환경노조가입",
 *         "BADGE_CONTENT": "11",
 *         "BADGE_FILE_URL": null,
 *         "BADGE_REG_DATE": null,
 *         "BADGE_OP1_CONTENT": null,
 *         "BADGE_OP2_CONTENT": null
 *     },
 *     {
 *         "BADGE_ID": 2,
 *         "BADGE_SUBJECT": "초보환경운동가",
 *         "BADGE_CONTENT": null,
 *         "BADGE_FILE_URL": null,
 *         "BADGE_REG_DATE": null,
 *         "BADGE_OP1_CONTENT": null,
 *         "BADGE_OP2_CONTENT": null
 *     },
 *     {
 *         "BADGE_ID": 3,
 *         "BADGE_SUBJECT": "뱃지 이름",
 *         "BADGE_CONTENT": "Update Test",
 *         "BADGE_FILE_URL": "CDN URL",
 *         "BADGE_REG_DATE": null,
 *         "BADGE_OP1_CONTENT": null,
 *         "BADGE_OP2_CONTENT": null
 *     },
 *     {
 *         "BADGE_ID": 4,
 *         "BADGE_SUBJECT": "기타리스트",
 *         "BADGE_CONTENT": "11",
 *         "BADGE_FILE_URL": null,
 *         "BADGE_REG_DATE": null,
 *         "BADGE_OP1_CONTENT": null,
 *         "BADGE_OP2_CONTENT": null
 *     },
 *     {
 *         "BADGE_ID": 5,
 *         "BADGE_SUBJECT": "그랜드마스터",
 *         "BADGE_CONTENT": "21",
 *         "BADGE_FILE_URL": null,
 *         "BADGE_REG_DATE": null,
 *         "BADGE_OP1_CONTENT": null,
 *         "BADGE_OP2_CONTENT": null
 *     }
 * ]
 */

async function getBadges(req:IReq,res:IRes){
  const result = await badgeService.getBadges();
  return res.status(HttpStatusCodes.ACCEPTED).json(result).end();
}

/**
 * @api {get} /badge/:badgeId Get tt_badge
 * @apiName getBadge
 * @apiGroup Badge
 *
* @apiPermission adminUser
 *
 * @apiParam {number} badgeId URL
 *
 * @apiSuccessExample Success-Response:
 * [
 *     {
 *         "BADGE_ID": 3,
 *         "BADGE_SUBJECT": "피노키오",
 *         "BADGE_CONTENT": "22",
 *         "BADGE_FILE_URL": null,
 *         "BADGE_REG_DATE": null,
 *         "BADGE_OP1_CONTENT": null,
 *         "BADGE_OP2_CONTENT": null
 *     }
 * ]
 *
 */


async function getBadge(req:IReq,res:IRes){
  const {badgeId} = req.params;
  const result = await badgeService.getBadge(Number(badgeId));
  return res.status(HttpStatusCodes.ACCEPTED).json(result).end();
}


/**
 * @api {post} /badge/obtain Request Obtain Normal Scenario Badges
 * @apiName obtainBadge
 * @apiGroup Badge
 *
 * @apiPermission normalUser
 *
 *
 * @apiSuccessExample Success-Response:
 * [
 *     {
 *         "BADGE_ID": 2,
 *         "BADGE_TYPE": 0,
 *         "BADGE_SUBJECT": "초보환경운동가",
 *         "BADGE_CONTENT": null,
 *         "BADGE_CONDITION_CONTENT": null,
 *         "BADGE_IMAGE_URL": null,
 *         "BADGE_IMAGE_URL_FALSE": null,
 *         "BADGE_REG_DATE": null,
 *         "tt_badge_conditions": [],
 *         "tt_user_badges": []
 *     },
 *     {
 *         "BADGE_ID": 3,
 *         "BADGE_TYPE": 0,
 *         "BADGE_SUBJECT": "피노키오",
 *         "BADGE_CONTENT": "22",
 *         "BADGE_CONDITION_CONTENT": null,
 *         "BADGE_IMAGE_URL": null,
 *         "BADGE_IMAGE_URL_FALSE": null,
 *         "BADGE_REG_DATE": null,
 *         "tt_badge_conditions": [
 *             {
 *                 "CONDITION_ID": 4,
 *                 "PRODUCT_CATEGORY_ID": 1,
 *                 "BADGE_ID": 3,
 *                 "WEIGHT": 1,
 *                 "CONDITION_REG_DATE": "2023-03-14T01:08:34.000Z"
 *             }
 *         ],
 *         "tt_user_badges": []
 *     }
 * ]
 *
 */

async function checkBadgeAvailable(req:IReq, res:IRes){
  const user = res.locals.user;
  const result = await badgeService.checkBadgeAvailable(user);
  return res.status(HttpStatusCodes.OK).json(result).end();
}
/**
* @api {put} /badge/represent/:id Set Represent UserBadge
* @apiName setRepresentBadge
* @apiGroup Badge
*
* @apiPermission normalUser
*
*
* @apiSuccessExample Success-Response:
* [
*
* ]
*
*/
async function setRepresentBadge(req:IReq, res:IRes){
  const userBadgeId = Number(req.params.id);
  const user = res.locals.user;
  const badges = await tt_user_badge.findAll({
    where:{
      USER_ID : user.USER_ID,
    },
  });
  for(let i =0; i< badges.length; ++i){
    const userBadge = badges[i];
    if(userBadge){
      await userBadge.update({
        REPRESENT_TF : Number(userBadge.USER_BADGE_ID === userBadgeId),
      });
    }
  }
  return res.status(HttpStatusCodes.OK).end();
}
/**
 * @api {post} /badge/addBadge Add tt_badge
 * @apiName addBadge
 * @apiGroup Badge
 *
 * @apiPermission adminUser
 *
 * @apiParamExample {json} Request-Example:
 *{
 *    "badge":
 *    {
 *        "BADGE_SUBJECT" : "뱃지 이름",
 *        "BADGE_CONTENT" : "뱃지 내용",
 *        "BADGE_FILE_URL" : "활성 시 CDN URL",
 *        "BADGE_FILE_URL_FALSE" : "비활성 시 CDN URL"
 *        "BADGE_OP1_CONTENT": "조건1",
 *        "BADGE_OP2_CONTENT": "조건2"
 *    }
 *}
 * @apiSuccessExample Success-Response:
 * [
 *    {
 *        "BADGE_ID": 3,
 *        "BADGE_SUBJECT": "뱃지 이름",
 *        "BADGE_CONTENT": "뱃지 내용",
 *        "BADGE_FILE_URL": "활성 시 CDN URL",
 *        "BADGE_FILE_URL_FALSE": "비활성 시 CDN URL",
 *        "BADGE_REG_DATE": null,
 *        "BADGE_OP1_CONTENT": "조건1",
 *        "BADGE_OP2_CONTENT": "조건2"
 *    }
 *]
 *
 */

async function addBadge(req:IReq<{badge: tt_badge}>, res:IRes){
  const {badge} = req.body;
  const result = await badgeService.addBadge(badge);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {put} /badge/update/:badgeId Update tt_badge
 * @apiName updateBadge
 * @apiGroup Badge
 *
 * @apiPermission adminUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "badge":
 *     {
 *         "BADGE_SUBJECT" : "뱃지 이름",
 *         "BADGE_CONTENT" : "Update Test",
 *         "BADGE_FILE_URL" : "활성 시 CDN URL"
 *         "BADGE_FILE_URL_FALSE": "비활성 시 CDN URL",
 *         "BADGE_OP1_CONTENT": "조건1",
 *         "BADGE_OP2_CONTENT": "조건2"
 *     }
 * }
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "BADGE_SUBJECT": "뱃지 이름",
 *     "BADGE_CONTENT": "Update Test",
 *     "BADGE_FILE_URL": "활성 시 CDN URL"
 *     "BADGE_FILE_URL_FALSE": "비활성 시 CDN URL",
 *     "BADGE_OP1_CONTENT": "조건1",
 *     "BADGE_OP2_CONTENT": "조건2"
 * }
 *
 */

async function updateBadge(req:IReq<{badge: tt_badge}>, res:IRes){
  const {badge} = req.body;
  const {badgeId} = req.params;
  // const user = res.locals.user;
  const result = await badgeService.updateBadge(badge,Number(badgeId));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {delete} /badge/delete/:badgeId Delete tt_badge
 * @apiName deleteBadge
 * @apiGroup Badge
 *
 * @apiPermission adminUser
 *
 * @apiParam {number} badgeId URL
 */

async function deleteBadge(req:IReq, res:IRes){
  const {badgeId} = req.params;
  const result = await badgeService.deleteBadge(Number(badgeId));
  return res.status(HttpStatusCodes.ACCEPTED).json(result).end();
}


/**
 * @api {post} /badge/image/active Set Active Image for Badge
 * @apiName SetBadgeActiveImage
 * @apiGroup Badge
 *
 * @apiPermission adminUser
 *
 * @apiBody Number badgeId 상품 ID 값
 * @apiBody File file 상품에 추가할 이미지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BadgeNotFound"
 *     }
 */
async function setActiveImage(req: IReq<{ badgeId: number }>, res: IRes) {
  const {badgeId} = req.body;
  const file = req.file as S3File;
  const result =
    await badgeService.setActiveImage(badgeId, file, res.locals.user, getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {post} /badge/image/false Set Active Image for Badge
 * @apiName SetBadgeActiveImage
 * @apiGroup Badge
 *
 * @apiPermission adminUser
 *
 * @apiBody Number badgeId 상품 ID 값
 * @apiBody File file 상품에 추가할 이미지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BadgeNotFound"
 *     }
 */
async function setFalseImage(req: IReq<{ badgeId: number }>, res: IRes) {
  const {badgeId} = req.body;
  const file = req.file as S3File;
  const result =
    await badgeService.setFalseImage(badgeId, file, res.locals.user, getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

// **** Export default **** //

export default {
  paths,
  getUserBadges,
  getBadges,
  getBadge,
  addBadge,
  updateBadge,
  deleteBadge,
  checkBadgeAvailable,
  setRepresentBadge,
  setActiveImage,
  setFalseImage,
} as const;
