import {
  tt_product,
  tt_product_image,
  tt_trade_review,
  tt_user,
} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {tt_trade_status} from "@src/models/dummy/tt_trade_status";
import {Sequelize} from "sequelize";
import {sendPushMessage} from "@src/util/push-util";


// **** Variables **** //
export const prodNotFoundErr = 'Product not found';
export const tradeNotFoundErr = 'Trade Log not found';
export const tradeAuthorityErr = 'Can not modify trade with your authority';


const TRADE_ALARM_TITLE="거래 완료!";
const TRADE_ALARM_CONTENT="상품에 대한 거래가 완료되었습니다.";
const TRADE_ALARM_SOLD_REDIRECTURL="/trade?tab=판매";
const TRADE_ALARM_BOUGHT_REDIRECTURL="/trade?tab=구매";
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
  const persists = await tt_product.findAll({
    where: {BUYER_USER_ID: user.USER_ID},
    include:
      [{model: tt_product_image, as: "tt_product_images"},
        {
          model: tt_user,
          as: "SELLER_USER",
          attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
        },
        {model: tt_trade_review, as: "tt_trade_reviews"}],
    order: [
      [{model: tt_product_image, as: "tt_product_images"}, 'PRIORITY', 'ASC'],
    ],
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
  const persists = await tt_product.findAll({
    where: {SELLER_USER_ID: user.USER_ID},
    include:
      [{model: tt_product_image, as: "tt_product_images"},
        {
          model: tt_user,
          as: "SELLER_USER",
          attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
        },
        {model: tt_trade_review, as: "tt_trade_reviews"}],
    order: [
      [{model: tt_product_image, as: "tt_product_images"}, 'PRIORITY', 'ASC'],
    ],
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
  const seller = await tt_user.findByPk(trade?.SELLER_USER_ID);
  if (!buyer || !seller) {
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
  if( trade.TRADE_STATUS === tt_trade_status.SOLD){
    throw new RouteError(
      HttpStatusCodes.ALREADY_REPORTED,
      "This product is already sold",
    );
  }
  // Return user
  trade.set("TRADE_STATUS", tt_trade_status.SOLD);
  trade.set("BUYER_USER_ID",buyerId);
  await seller.update({WASTE_SAVINGS:seller.WASTE_SAVINGS+trade.PRODUCT_WEIGHT});
  await seller.update({SELLING_SAVINGS:seller.SELLING_SAVINGS+trade.PRODUCT_WEIGHT});
  await buyer.update({WASTE_SAVINGS:buyer.WASTE_SAVINGS+trade.PRODUCT_WEIGHT});
  await buyer.update({BUYING_SAVINGS:buyer.BUYING_SAVINGS+trade.PRODUCT_WEIGHT});
  await sendPushMessage(buyer.USER_ID, TRADE_ALARM_TITLE,
    truncateString(trade.SUBJECT)
    +" "+TRADE_ALARM_CONTENT, TRADE_ALARM_BOUGHT_REDIRECTURL);
  const productResult = await trade.save();
  return productResult;
}
function truncateString(str: string, maxLength = 10): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  } else {
    return str;
  }
}

// **** Export default **** //

export default {
  getAll,
  getUserBought,
  getUserSold,
  doTrade,
} as const;
