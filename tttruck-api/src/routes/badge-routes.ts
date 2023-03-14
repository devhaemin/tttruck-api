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

// **** Variables **** //

// Paths
const paths = {
  basePath: '/badge',
  getUserBadges: '/userBadge/list',
  getUserBadge: '/userBadge/:user_badgeId',
  addUserBadge: '/userBadge',
  updateUserBadge: '/userBadge/update/:user_badgeId',
  deleteUserBadge: '/userBadge/delete/:user_badgeId',
  getBadge: '/:badgeId',
  getBadges: '/list',
  addBadge: '/addBadge',
  updateBadge: '/update/:badgeId',
  deleteBadge: '/delete/:badgeId',

  getBadgeConditions: '/condition/list',
  getBadgeCondition: '/condition/:conditionId',
  addBadgeCondition: '/condition/add',
  updateBadgeCondition: '/condition/update/:conditionId',
  deleteBadgeCondition: '/condition/delete/:conditionId',

} as const;

// **** Functions **** //

/**
 * @api {get} /badge/condition Get tt_badge_conditions
 * @apiName getBadgeConditions
 * @apiGroup Badge
 * 
 * @apiPermission adminUser
 * @apiSuccessExample {json} success-Response:
[
    {
        "CONDITION_ID": 2,
        "PRODUCT_CATEGORY_ID": 2,
        "BADGE_ID": 2,
        "WEIGHT": null,
        "CONDITION_REG_DATE": "2023-03-13T07:50:30.000Z",
        "PRODUCT_CATEGORY": {
            "PRODUCT_CATEGORY_ID": 2,
            "PARENT_CATEGORY_ID": 0,
            "PRODUCT_CATEGORY_NAME": "석고보드",
            "PRODUCT_CATEGORY_PRIORITY": 0,
            "VISIBLE_TF": true,
            "UPDATE_USER_ID": 1,
            "UPDATE_USER_IPv4": null,
            "UPDATE_USER_IPv6": null,
            "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
            "CREATE_USER_ID": 1,
            "CREATE_USER_IPv4": null,
            "CREATE_USER_IPv6": null,
            "CREATE_TIME": "2022-12-22T08:58:48.000Z"
        },
        "BADGE": {
            "BADGE_ID": 2,
            "BADGE_SUBJECT": "초보환경운동가",
            "BADGE_CONTENT": null,
            "BADGE_FILE_URL": null,
            "BADGE_REG_DATE": null,
            "BADGE_OP1_CONTENT": null,
            "BADGE_OP2_CONTENT": null
        }
    },
    {
        "CONDITION_ID": 3,
        "PRODUCT_CATEGORY_ID": 5,
        "BADGE_ID": 3,
        "WEIGHT": null,
        "CONDITION_REG_DATE": "2023-03-13T07:50:30.000Z",
        "PRODUCT_CATEGORY": {
            "PRODUCT_CATEGORY_ID": 5,
            "PARENT_CATEGORY_ID": 0,
            "PRODUCT_CATEGORY_NAME": "타일/석재",
            "PRODUCT_CATEGORY_PRIORITY": 0,
            "VISIBLE_TF": true,
            "UPDATE_USER_ID": 1,
            "UPDATE_USER_IPv4": null,
            "UPDATE_USER_IPv6": null,
            "UPDATE_TIME": "2022-12-29T08:40:00.000Z",
            "CREATE_USER_ID": 1,
            "CREATE_USER_IPv4": null,
            "CREATE_USER_IPv6": null,
            "CREATE_TIME": "2022-12-22T08:58:48.000Z"
        },
        "BADGE": {
            "BADGE_ID": 3,
            "BADGE_SUBJECT": "피노키오",
            "BADGE_CONTENT": "22",
            "BADGE_FILE_URL": null,
            "BADGE_REG_DATE": null,
            "BADGE_OP1_CONTENT": null,
            "BADGE_OP2_CONTENT": null
        }
    }
]
*/

async function getBadgeConditions(req:IReq,res:IRes){
  const badgeConditionList = await badgeService.getBadgeConditions();
  return res.status(200).json(badgeConditionList);
}

/**
 * @api {get} /badge/condition/:conditionId Get tt_badge_condition
 * @apiName getBadgeCondition
 * @apiGroup Badge
 * 
 * @apiPermission adminUser
 * @apiParam {number} conditionId URL
 * @apiSuccessExample {json} success-Response:
 * [
    {
        "CONDITION_ID": 2,
        "PRODUCT_CATEGORY_ID": 2,
        "BADGE_ID": 2,
        "WEIGHT": null,
        "CONDITION_REG_DATE": "2023-03-13T07:50:30.000Z",
        "PRODUCT_CATEGORY": {
            "PRODUCT_CATEGORY_ID": 2,
            "PARENT_CATEGORY_ID": 0,
            "PRODUCT_CATEGORY_NAME": "석고보드",
            "PRODUCT_CATEGORY_PRIORITY": 0,
            "VISIBLE_TF": true,
            "UPDATE_USER_ID": 1,
            "UPDATE_USER_IPv4": null,
            "UPDATE_USER_IPv6": null,
            "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
            "CREATE_USER_ID": 1,
            "CREATE_USER_IPv4": null,
            "CREATE_USER_IPv6": null,
            "CREATE_TIME": "2022-12-22T08:58:48.000Z"
        },
        "BADGE": {
            "BADGE_ID": 2,
            "BADGE_SUBJECT": "초보환경운동가",
            "BADGE_CONTENT": null,
            "BADGE_FILE_URL": null,
            "BADGE_REG_DATE": null,
            "BADGE_OP1_CONTENT": null,
            "BADGE_OP2_CONTENT": null
        }
    }
]
*/

async function getBadgeCondition(req:IReq,res:IRes){
  const {conditionId} = req.params;
  const badgeCondition = await badgeService.getBadgeCondition(Number(conditionId));
  return res.status(200).json(badgeCondition);
}

/**
 * @api {post} /badge/condition/add Post tt_badge_condition
 * @apiName addBadgeCondition
 * @apiGroup Badge
 * 
 * @apiPermission adminUser
 * @apiParamExample {json} Request-Example:
 * {
    "badgeCondition":{
        "PRODUCT_CATEGORY_ID":6,
        "BADGE_ID":1,
        "WEIGHT" : 300
    }
}
 * @apiSuccessExample {json} success-Response:
 * {
    "CONDITION_REG_DATE": {
        "fn": "current_timestamp",
        "args": []
    },
    "CONDITION_ID": 5,
    "PRODUCT_CATEGORY_ID": 6,
    "BADGE_ID": 1,
    "WEIGHT": 300
}
*/

async function addBadgeCondition(req:IReq<{badgeCondition: tt_badge_condition}>,res:IRes){
  const {badgeCondition} = req.body;
  const result = await badgeService.addBadgeCondition(badgeCondition);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {put} /badge/condition/update/:conditionId Update tt_badge_condition
 * @apiName updateBadgeCondition
 * @apiGroup Badge
 * 
 * @apiPermission adminUser
 * @apiParam {number} conditionId URL
 * @apiParamExample {json} Request-Example:
 * {
    "badgeCondition":{
        "PRODUCT_CATEGORY_ID":3,
        "BADGE_ID":1,
        "WEIGHT" : 300
    }
}
 * @apiSuccessExample {json} success-Response:
 * {
    "PRODUCT_CATEGORY_ID": 3,
    "BADGE_ID": 1,
    "WEIGHT": 300
}
*/

async function updateBadgeCondition(req:IReq<{badgeCondition: tt_badge_condition}>,res:IRes){
  const {badgeCondition} = req.body;
  const {conditionId} = req.params;
  const result = await badgeService.updateBadgeCondition(badgeCondition,Number(conditionId));
  return res.status(HttpStatusCodes.CREATED).json(result).end();

}

/**
 * @api {delete} /badge/condition/delete/:conditionId Delete tt_badge_condition
 * @apiName deleteBadgeCondition
 * @apiGroup Badge
 * @apiParam {number} conditionId URL
 * @apiPermission adminUser
 * 
*/

async function deleteBadgeCondition(req:IReq,res:IRes){
  const {conditionId} = req.params;
  const result = await badgeService.deleteBadgeCondition(Number(conditionId));
  return res.status(200).json(result);
}


/**
 * @api {get} /badge/userBadge/list Get tt_user_badges
 * @apiName getUserBadges
 * @apiGroup Badge
 * 
 * @apiPermission normalUser
 * 
 * @apiSuccessExample {json} success-Response:
 * [
 *    {
 *        "ID": 1,
 *        "USER_ID": 43,
 *        "BADGE_ID": 1,
 *        "REG_DATE": "2023-03-04T15:00:00.000Z",
 *        "OP1": false,
 *        "OP2": false,
 *        "IS_ACTIVATED": true,
 *        "BADGE": {
 *            "BADGE_ID": 1,
 *            "BADGE_SUBJECT": "지구환경노조가입",
 *            "BADGE_CONTENT": "11",
 *            "BADGE_FILE_URL": null,
 *            "BADGE_REG_DATE": null,
 *            "BADGE_OP1_CONTENT": null,
 *            "BADGE_OP2_CONTENT": null
 *        }
 *    },
 *    {
 *        "ID": 3,
 *        "USER_ID": 43,
 *        "BADGE_ID": 14,
 *        "REG_DATE": "2023-03-08T01:01:49.000Z",
 *        "OP1": true,
 *        "OP2": true,
 *        "IS_ACTIVATED": true,
 *        "BADGE": {
 *            "BADGE_ID": 14,
 *            "BADGE_SUBJECT": "아이언맥",
 *            "BADGE_CONTENT": null,
 *            "BADGE_FILE_URL": null,
 *            "BADGE_REG_DATE": null,
 *            "BADGE_OP1_CONTENT": null,
 *            "BADGE_OP2_CONTENT": null
 *        }
 *    }
 *]
 */
async function getUserBadges(req:IReq,res:IRes){

  const userId = res.locals.user.USER_ID;
  const badgeList = await badgeService.getBadgeList(userId);
  return res.status(200).json(badgeList).end();
}

/**
 * @api {get} /badge/userBadge/:user_badgeId Get tt_user_badge
 * @apiName getUserBadge
 * @apiGroup Badge
 * 
 * @apiPermission normalUser
 * 
 * @apiParam {number} user_badgeId URL
 * 
 * @apiSuccessExample {json} success-Response:
 * [
 *     {
 *         "ID": 1,
 *         "USER_ID": 43,
 *         "BADGE_ID": 1,
 *         "REG_DATE": "2023-03-05",
 *         "OP1": false,
 *         "OP2": false,
 *         "IS_ACTIVATED": false,
 *         "BADGE": {
 *             "BADGE_ID": 1,
 *             "BADGE_SUBJECT": "지구환경노조가입",
 *             "BADGE_CONTENT": "11",
 *             "BADGE_FILE_URL": null,
 *             "BADGE_REG_DATE": null,
 *             "BADGE_OP1_CONTENT": null,
 *             "BADGE_OP2_CONTENT": null
 *         }
 *     }
 * ]
 */

async function getUserBadge(req:IReq,res:IRes){
  const userId = Number(43);
  const {user_badgeId} = req.params;
  const badgeList = await badgeService.getUserBadge(userId,Number(user_badgeId));
  return res.status(200).json(badgeList).end();
}

/**
 * @api {post} /badge/userBadge Add tt_user_badge
 * @apiName addUserBadge
 * @apiGroup Badge
 *
* @apiPermission adminUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "userBadge":{
 *         "USER_ID": "43",
 *         "BADGE_ID": "15",
 *         "OP1" : "0",
 *         "OP2" : "0",
 *         "IS_ACTIVATED" : "0"
 *     }
 * }
 * @apiSuccessExample Success-Response:
 * {
 *     "REG_DATE": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "ID": 5,
 *     "USER_ID": "43",
 *     "BADGE_ID": "15",
 *     "OP1": "0",
 *     "OP2": "0",
 *     "IS_ACTIVATED": "0"
 * }
 */

async function addUserBadge(req:IReq<{userBadge: tt_user_badge}>,res:IRes){
  const {userBadge} = req.body;
  const result = await badgeService.addUserBadge(userBadge);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {put} /badge/userBadge/update/:user_badgeId Update tt_user_badge
 * @apiName updateUserBadge
 * @apiGroup Badge
 *
* @apiPermission adminUser
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *     "userBadge":{
 *         "USER_ID": "43",
 *         "BADGE_ID": "15",
 *         "OP1" : "1",
 *         "OP2" : "1",
 *         "IS_ACTIVATED" : "1"
 *     }
 * }
 * @apiSuccessExample Success-Response:
 * {
 *     "USER_ID": "43",
 *     "BADGE_ID": "15",
 *     "OP1": "1",
 *     "OP2": "1",
 *     "IS_ACTIVATED": "1"
 * }
 */

async function updateUserBadge(req:IReq<{userBadge: tt_user_badge}>, res:IRes){
  const {userBadge} = req.body;
  const {user_badgeId} = req.params;
  // const user = res.locals.user;
  const result = await badgeService.updateUserBadge(userBadge,Number(user_badgeId));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {delete} /badge/userBadge/delete/:user_badgeId Delete tt_user_badge
 * @apiName deleteUserBadge
 * @apiGroup Badge
 *
 * @apiPermission adminUser
 * 
 * @apiParam {number} user_badgeId URL
 */

async function deleteUserBadge(req:IReq, res:IRes){
  const {user_badgeId} = req.params;
  const result = await badgeService.deleteUserBadge(Number(user_badgeId));
  return res.status(HttpStatusCodes.ACCEPTED).json(result).end();
}

/**
 * @api {get} /api/v1/badge/list Get tt_badges
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
 * @api {get} /api/v1/badge/:badgeId Get tt_badge
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
 * @api {post} /api/v1/badge/addBadge Add tt_badge
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
 *        "BADGE_FILE_URL" : "CDN URL"
 *    }
 *}
 * @apiSuccessExample Success-Response:
 * [
 *    {
 *        "BADGE_ID": 3,
 *        "BADGE_SUBJECT": "피노키오",
 *        "BADGE_CONTENT": "22",
 *        "BADGE_FILE_URL": null,
 *        "BADGE_REG_DATE": null,
 *        "BADGE_OP1_CONTENT": null,
 *        "BADGE_OP2_CONTENT": null
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
 * @api {put} /api/v1/badge/update/:badgeId Update tt_badge
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
 *         "BADGE_FILE_URL" : "CDN URL"
 *     }
 * }
 * 
 * @apiSuccessExample Success-Response:
 * {
 *     "BADGE_SUBJECT": "뱃지 이름",
 *     "BADGE_CONTENT": "Update Test",
 *     "BADGE_FILE_URL": "CDN URL"
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
 * @api {delete} /api/v1/badge/delete/:badgeId Delete tt_badge
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
// **** Export default **** //

export default {
  paths,
  getUserBadges,
  getUserBadge,
  addUserBadge,
  updateUserBadge,
  deleteUserBadge,
  getBadges,
  getBadge,
  addBadge,
  updateBadge,
  deleteBadge,
  getBadgeConditions,
  getBadgeCondition,
  addBadgeCondition,
  updateBadgeCondition,
  deleteBadgeCondition,
} as const;
