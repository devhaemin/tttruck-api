import {tt_product, tt_trade_review, tt_user} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from "@src/routes/shared/types";
import {prodNotFoundErr} from "@src/services/product-service";
import {Op, Sequelize} from "sequelize";
const tradeReviewNotFoundErr = "Can't find the trade review by product id";
import logger from "jet-logger";
import { tt_user_group } from '@src/models/dummy/tt_user_group';
// **** Variables **** //

async function getByProduct(productId: number): Promise<tt_trade_review[]> {
  const tradeReviews = await tt_trade_review.findAll({
    where: {PRODUCT_ID: productId,DELETE_TF:0},
    include: [{
      model: tt_user, as: "USER", attributes: [
        "USER_ID",
        "PROFILE_IMAGE",
        "NICKNAME",
      ],
    }],
    order: [['TRADE_REVIEW_TYPE', 'ASC']],
  });
  if (!tradeReviews) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      tradeReviewNotFoundErr,
    );
  }
  return tradeReviews;
}

async function postReview(user: tt_user, tradeReview: tt_trade_review, tradeReviewType: number): Promise<tt_trade_review> {
  const product = await tt_product.findByPk(tradeReview.PRODUCT_ID);
  if (!product) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  if (user.USER_ID !== product.SELLER_USER_ID && user.USER_ID !== product.BUYER_USER_ID) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      "User can not perform on this action",
    );
  }
  tradeReview.USER_ID = user.USER_ID;
  tradeReview.TRADE_REVIEW_TYPE = tradeReviewType;
  return await tt_trade_review.create(tradeReview);
}

async function update(user: tt_user,tradeReview: tt_trade_review): Promise<tt_trade_review> {
  const persists = await tt_trade_review.findOne({where:{TRADE_REVIEW_ID:tradeReview.TRADE_REVIEW_ID}});
  if((persists?.USER_ID == user.USER_ID)||(user.GROUP==tt_user_group.ADMIN) ){
    await tt_trade_review.update(tradeReview,{where:{TRADE_REVIEW_ID:tradeReview.TRADE_REVIEW_ID}});    
  }
  return tradeReview;
}

async function _delete(user:tt_user,id:number):Promise <void> {
  const persists = await tt_trade_review.findByPk(id);
  if((persists?.USER_ID == user.USER_ID)||(user.GROUP==tt_user_group.ADMIN) ){
    await tt_trade_review.update({DELETE_TF:1},{where:{TRADE_REVIEW_ID: id}});
  }
}


// **** Export default **** //

export default {
  getByProduct,
  postReview,
  update,
  delete: _delete,
} as const;
