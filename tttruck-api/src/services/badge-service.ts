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
import {tt_user_badge, tt_badge,tt_badge_condition, tt_product_category} from "@src/models/init-models";
import {userNotFoundErr} from "@src/services/user-service";

// Errors
export const errors = {
  unauth: 'Unauthorized',
  badgeNotFound :  (badge:string) => `Code "${badge}" not found`,
  userBadgeNotFound :  (userBadge:string) => `"${userBadge}" not found`,
  userNotFound :  (user:string) => `"${user}" not found`,
} as const;

//tt_badge_condition
async function getBadgeConditions():Promise <tt_badge_condition[]> { 
  const conditions = await tt_badge_condition.findAll({
    include:[{model:tt_product_category,as:"PRODUCT_CATEGORY"}],
  });
  return conditions;
}
async function getBadgeCondition(conditionId:number):
Promise<tt_badge_condition[]> {
  const conditions = await tt_badge_condition.findAll({
    include:[{model:tt_product_category,as:"PRODUCT_CATEGORY"}],
    where:{
      ID:conditionId,
    },
  });
  return conditions;
}
async function addBadgeCondition(badgeCondtiion:tt_badge_condition):Promise<tt_badge_condition>{
  const result = await tt_badge_condition.create(badgeCondtiion);
  return result;
}

async function updateBadgeCondition(badgeCondtiion:tt_badge_condition):Promise<tt_badge_condition>{
  await tt_badge_condition.update(badgeCondtiion,{ where: { ID:badgeCondtiion.ID } });
  return badgeCondtiion;
}
async function deleteBadgeCondition(badgeConditionId:number):Promise<void>{
  await tt_badge_condition.destroy({where:{ID:badgeConditionId}});
}
//tt_user_badge
async function getUserBadges(userId:number):Promise<tt_user_badge[]>{
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

async function getUserBadge(userId:number,user_badgeId:number):Promise<tt_user_badge[]>{
  const badge = await tt_user_badge.findAll({
    include:[{model:tt_badge,as:"BADGE"}],
    where:{
      USER_ID:userId,
      ID:user_badgeId,
    },
  });
  if(!badge){
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      userNotFoundErr,
    );
  }
  return badge;
}

async function addUserBadge(userbadge:tt_user_badge):Promise<tt_user_badge>{
  return await tt_user_badge.create(userbadge);
}
async function updateUserBadge(userBadge:tt_user_badge,user_badgeId:number):Promise<tt_user_badge>{
  await tt_user_badge.update(userBadge, { where: { ID:user_badgeId } });
  return userBadge;
}
async function deleteUserBadge(user_badgeId:number):Promise<void>{
  await tt_user_badge.destroy({where:{ID: user_badgeId}});
}


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
  //tt_badge_condition 관련
  getBadgeConditions,
  getBadgeCondition,
  addBadgeCondition,
  updateBadgeCondition,
  deleteBadgeCondition,
  //tt_user_badge관련
  getUserBadges,
  getUserBadge,
  getBadgeOption,
  addUserBadge,
  updateUserBadge,
  deleteUserBadge,
  //tt_badge관련
  getBadges,
  getBadge,
  addBadge,
  updateBadge,
  deleteBadge,
} as const;
