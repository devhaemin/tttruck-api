import {tt_product, tt_trade_review, tt_user} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from "@src/routes/shared/types";
import {prodNotFoundErr} from "@src/services/product-service";

const tradeReviewNotFoundErr = "Can't find the trade review by product id";

// **** Variables **** //

async function getByProduct(productId: number): Promise<tt_trade_review[]> {
  const tradeReviews = await tt_trade_review.findAll({
    where: {PRODUCT_ID: productId},
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
  tradeReview.TRADE_REVIEW_TYPE = tradeReviewType;
  return await tt_trade_review.create(tradeReview);
}

async function update(): Promise<tt_trade_review[]> {
  return tt_trade_review.findAll();
}

/*async */
function _delete(req: IReq, res: IRes) {
  const id = +req.params.id;
  //await productService.delete(res.locals.user, id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getByProduct,
  postReview,
  update,
  delete: _delete,
} as const;
