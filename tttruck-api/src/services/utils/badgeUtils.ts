import {tt_user} from "@src/models/tt_user";
import {tt_badge} from "@src/models/tt_badge";
import {tt_user_badge} from "@src/models/init-models";

async function checkSpecialBadge(user:tt_user, badge:tt_badge){
  if(badge.BADGE_TYPE !== 1){
    return false;
  }
  if(badge.BADGE_ID === 1){
    if(user) return true;
  }
  if(badge.BADGE_ID === 15){
    const userBadges = await tt_user_badge.count({
      where:{
        USER_ID : user.USER_ID,
      },
    });
    const badges = await tt_badge.count();
    if(userBadges === badges){
      return true;
    }
  }
}

export default{
  checkSpecialBadge,
}