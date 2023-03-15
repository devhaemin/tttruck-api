import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {RouteError} from '@src/declarations/classes';
import {tt_user} from "@src/models/tt_user";
// import {tt_badge} from "@src/models/tt_badge";
// import {tt_user_badge} from "@src/models/tt_user_badge";
import logger from "jet-logger";
import {
  tt_badge,
  tt_badge_condition, tt_trade_log, tt_trade_logAttributes,
  tt_user_badge,
} from "@src/models/init-models";
import {userNotFoundErr} from "@src/services/user-service";
import {Model, Op, Sequelize} from "sequelize";

// Errors
export const errors = {
  unauth: 'Unauthorized',
  badgeNotFound :  (badge:string) => `Code "${badge}" not found`,
  userBadgeNotFound :  (userBadge:string) => `"${userBadge}" not found`,
  userNotFound :  (user:string) => `"${user}" not found`,
} as const;

async function getUserBadges(user:tt_user):Promise<tt_badge[]>{
  if(!user){
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      userNotFoundErr,
    );
  }
  const badges = await tt_badge.findAll({
    include:[
      {
        model:tt_user_badge,
        as:"tt_user_badges",
        on: {
          "USER_ID": user.USER_ID,
        },
        limit: 1,
      },
    ],
  });
  return badges;
}

async function checkBadgeAvailable(user:tt_user):Promise<tt_badge[]>{
  if(!user){
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      userNotFoundErr,
    );
  }
  const userTradeLogs = await tt_trade_log.findAll({
    where:{
      [Op.or]:[
        {BUYER_USER_ID:user.USER_ID},
        {SELLER_USER_ID:user.USER_ID},
      ],
    },
    attributes: [
      "PRODUCT_CATEGORY_ID",
      [Sequelize.fn('SUM', Sequelize.col('PRODUCT_WEIGHT')), 'weightSum'],
    ],
    group: 'PRODUCT_CATEGORY_ID',
  });
  if(!userTradeLogs){
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      "Can't find User Trade Log",
    );
  }
  const badges = await tt_badge.findAll({
    include:[
      {
        model:tt_user_badge,
        as:"tt_user_badges",
        on: {
          "BADGE_ID": {[Op.eq]: Sequelize.col('tt_user_badge.BADGE_ID')},
        },
        limit: 1,
      },
      {
        model:tt_badge_condition,
        as:"tt_badge_conditions",
      },
    ],
  });

  const newBadges:tt_badge[] = [];
  badges.forEach(badge=>{
    if(badge.tt_user_badges.length >0){
      return;
    }
    if(badge.BADGE_TYPE !== 0){
      return;
    }
    const badgeConditions = badge.tt_badge_conditions;
    if(!badgeConditions){
      throw new RouteError(
        HttpStatusCodes.NOT_FOUND,
        "Can't find Condition for optaining badge",
      );
    }
    let isSuccess = true;
    badgeConditions.forEach(condition=>{
      const categoryId = condition.PRODUCT_CATEGORY_ID;
      const requireWeight = condition.WEIGHT;
      let categoryExist = false;
      userTradeLogs.forEach(tradeLog=>{
        if(tradeLog.dataValues.PRODUCT_CATEGORY_ID === categoryId){
          categoryExist = true;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if( requireWeight > tradeLog.dataValues.weightSum ){
            isSuccess = false;
          }
        }
      });
      isSuccess = isSuccess && categoryExist;
    });
    if(isSuccess){
      newBadges.push(badge);
    }
  });
  newBadges.forEach( async(item)=>{
    await tt_user_badge.create({
      BADGE_ID: item.BADGE_ID,
      USER_ID: user.USER_ID,
      IS_ACTIVATED: 1,
    });
  });
  return newBadges;
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
  getUserBadges,
  getBadges,
  getBadge,
  addBadge,
  updateBadge,
  deleteBadge,
  checkBadgeAvailable,
} as const;
