import {tt_trade, tt_user} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import logger from "jet-logger";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {tt_trade_status} from "@src/models/dummy/tt_trade_status";


// **** Variables **** //
export const prodNotFoundErr = 'Product not found';
export const tradeNotFoundErr = 'Trade Log not found';
export const tradeAuthorityErr = 'Can not modify trade with your authority';


// **** Functions **** //

/**
 * Get all trades
 */
async function getAll(): Promise<tt_trade[]> {
  const persists = await tt_trade.findAll();
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      tradeNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get trade user bought
 */
async function getUserBought(user: tt_user): Promise<tt_trade[]> {
  const persists = await tt_trade.findAll({where:{BUYER_USER_ID:user.USER_ID}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      tradeNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get trade user is selling
 */
async function getUserSold(user: tt_user): Promise<tt_trade[]> {
  const persists = await tt_trade.findAll({where:{SELLER_USER_ID:user.USER_ID}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      tradeNotFoundErr,
    );
  }
  return persists;
}

/**
 * Update one trade
 */
async function doTrade(user: tt_user, tradeId:number): Promise<tt_trade> {
  const trade = await tt_trade.findByPk(tradeId);
  if(!trade){
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      tradeNotFoundErr,
    );
  }
  if (trade.SELLER_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      tradeAuthorityErr,
    );
  }
  // Return user
  trade.set("TRADE_STATUS",tt_trade_status.SOLD);
  const affectedCount = await trade.save();
  logger.info(affectedCount);
  return trade;
}

// **** Export default **** //

export default {
  getAll,
  getUserBought,
  getUserSold,
  doTrade,
} as const;
