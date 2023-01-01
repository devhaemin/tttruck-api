import {tt_product, tt_product_image, tt_user} from '@src/models/init-models';
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
async function getAll(): Promise<tt_product[]> {
  const persists = await tt_product.findAll();
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
async function getUserBought(user: tt_user): Promise<tt_product[]> {
  const persists = await tt_product.findAll({where: {BUYER_USER_ID: user.USER_ID},
    include:
      [{model: tt_product_image, as: "tt_product_images"},
        {
          model: tt_user,
          as: "SELLER_USER",
          attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
        }]
  });
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
async function getUserSold(user: tt_user): Promise<tt_product[]> {
  const persists = await tt_product.findAll({where: {SELLER_USER_ID: user.USER_ID},
    include:
      [{model: tt_product_image, as: "tt_product_images"},
        {
          model: tt_user,
          as: "SELLER_USER",
          attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
        }],

  });
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
async function doTrade(user: tt_user, buyerId: number, productId: number): Promise<tt_product> {
  const trade = await tt_product.findByPk(productId);
  const buyer = await tt_user.findByPk(buyerId);
  if (!trade) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      tradeNotFoundErr,
    );
  }
  if (!buyer) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      "Can not find user",
    );
  }
  if (trade.SELLER_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      tradeAuthorityErr,
    );
  }
  // Return user
  trade.set("TRADE_STATUS", tt_trade_status.SOLD);
  const productResult = await trade.save();
  return productResult;
}

// **** Export default **** //

export default {
  getAll,
  getUserBought,
  getUserSold,
  doTrade,
} as const;
