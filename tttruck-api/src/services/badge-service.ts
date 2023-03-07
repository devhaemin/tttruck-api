import jwtUtil from '@src/util/jwt-util';
import pwdUtil from '@src/util/pwd-util';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {RouteError} from '@src/declarations/classes';
import {tick} from '@src/declarations/functions';
import {tt_user} from "@src/models/tt_user";
// import {tt_badge} from "@src/models/tt_badge";
// import {tt_user_badge} from "@src/models/tt_user_badge";
import {S3File} from "@src/routes/shared/awsMultipart";
import logger from "jet-logger";
import {tt_user_badge, tt_badge} from "@src/models/init-models";
import {userNotFoundErr} from "@src/services/user-service";

// **** Variables **** //

// Errors
export const errors = {
  unauth: 'Unauthorized',

} as const;

//tt_user_badge
async function getBadgeList(userId:number):Promise<tt_user_badge[]>{
  const badge = await tt_user_badge.findAll({
    include:[{model:tt_badge,as:"BADGE"}],
    where:{
      USER_ID:userId,
      IS_ACTIVATED:1,
    },
  });
  return badge;
}

async function getBadgeOption(badgeId:number): Promise<tt_user_badge>{
  const badgeOp = await tt_user_badge.findOne({
    attributes:["Op1","Op2"],
    where:{
      BADGE_ID:badgeId,
    }
  });
  if(!badgeOp){
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      userNotFoundErr,
    );
  }
  return badgeOp;
}

// async function addUserBadge():Promise <tt_user_badge>{
  
// }

//tt_badge
async function getBadges():Promise<tt_badge[]>{
  const badges = await tt_badge.findAll();
  return badges;
}

async function getBadge(id:number):Promise<tt_badge[]>{
  const badge = await tt_badge.findAll({ where: { BADGE_ID: id } });
  return badge;
}
async function addBadge(badge:tt_badge):Promise<tt_badge>{
  console.log(badge);
  return await tt_badge.create(badge);
}
async function updateBadge(badge:tt_badge,badgeId:number):Promise<tt_badge>{
  const affectedCount = await tt_badge.update(badge, { where: { BADGE_ID:badgeId } });
  logger.info(affectedCount);
  return badge;
}
async function deleteBadge(id:number):Promise<void>{
  await tt_badge.destroy({where:{BADGE_ID: id}});
}

// **** Export default **** //
export default {
  //tt_user_badge관련
  getBadgeList,
  getBadgeOption,
  //tt_badge관련
  getBadges,
  getBadge,
  addBadge,
  updateBadge,
  deleteBadge,
} as const;
