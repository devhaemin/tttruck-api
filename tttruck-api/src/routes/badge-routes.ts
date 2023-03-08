import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import authService from '@src/services/auth-service';
import EnvVars from '@src/declarations/major/EnvVars';
import codeUtil from "@src/util/code-util";
import {IReq, IRes} from './shared/types';
import {tt_user, tt_user_badge,tt_badge} from "@src/models/init-models";
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
  //get tt_badge
  getBadge: '/:badgeId',
  getBadges: '/',
  //post tt_badge
  addBadge: '/addBadge',
  //put tt_badge
  updateBadge: '/update/:badgeId',
  //delete tt_badge
  deleteBadge: '/delete/:badgeId',
} as const;

//tt_user_badge 관련
async function getUserBadges(req:IReq,res:IRes){

  // const userId = res.locals.user.USER_ID;
  // const badgeList = await badgeService.getBadgeList(Number(userId));
  // return res.status(200).json(badgeList).end();

  ////Test 용 코드
  const userId = Number(43);
  const badgeList = await badgeService.getUserBadges(userId);
  return res.status(200).json(badgeList).end();
}
async function getUserBadge(req:IReq,res:IRes){
  const userId = Number(43);
  const {user_badgeId} = req.params;
  const badgeList = await badgeService.getUserBadge(userId,Number(user_badgeId));
  return res.status(200).json(badgeList).end();
}
async function addUserBadge(req:IReq<{userBadge: tt_user_badge}>,res:IRes){
  const {userBadge} = req.body;
  const result = await badgeService.addUserBadge(userBadge);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

async function updateUserBadge(req:IReq<{userBadge: tt_user_badge}>, res:IRes){
  const {userBadge} = req.body;
  const {user_badgeId} = req.params;
  // const user = res.locals.user;
  const result = await badgeService.updateUserBadge(userBadge,Number(user_badgeId));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

async function deleteUserBadge(req:IReq, res:IRes){
  const {user_badgeId} = req.params;
  const result = await badgeService.deleteUserBadge(Number(user_badgeId));
  return res.status(HttpStatusCodes.ACCEPTED).json(result).end();
}
//tt_badge 관련

//tt_badge entire row 출력
async function getBadges(req:IReq,res:IRes){
  const result = await badgeService.getBadges();
  return res.status(HttpStatusCodes.ACCEPTED).json(result).end();
}

// tt_badge 
async function getBadge(req:IReq,res:IRes){
  const {badgeId} = req.params;
  const result = await badgeService.getBadge(Number(badgeId));
  return res.status(HttpStatusCodes.ACCEPTED).json(result).end();
}

// postman Test
// { "badge" :
//     {
//         "BADGE_SUBJECT": "test",
//         "BADGE_CONTENT": "11"
//     }
// }

async function addBadge(req:IReq<{badge: tt_badge}>, res:IRes){
  const {badge} = req.body;
  const result = await badgeService.addBadge(badge);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

async function updateBadge(req:IReq<{badge: tt_badge}>, res:IRes){
  const {badge} = req.body;
  const {badgeId} = req.params;
  // const user = res.locals.user;
  const result = await badgeService.updateBadge(badge,Number(badgeId));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

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
} as const;
