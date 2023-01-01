import {tt_trade_review} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from "@src/routes/shared/types";

const tradeReviewNotFoundErr = "Can't find the trade review by product id";
// **** Variables **** //

async function getByProduct(productId:number):Promise<tt_trade_review[]>{
  const tradeReviews = await tt_trade_review.findAll({where:{PRODUCT_ID : productId}});
  if(!tradeReviews){
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      tradeReviewNotFoundErr,
    );
  }
  return tradeReviews;
}
async function postReview(tradeReview:tt_trade_review):Promise<tt_trade_review>{
  return await tt_trade_review.create(tradeReview);
}
async function postBuyer():Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}
async function update():Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}

/*async */function _delete(req: IReq, res: IRes) {
  const id = +req.params.id;
  //await productService.delete(res.locals.user, id);
  return res.status(HttpStatusCodes.OK).end();
}



// **** Export default **** //

export default {
  getByProduct,
  postReview,
  postBuyer,
  update,
  delete : _delete,
} as const;
