import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import noticeService from '@src/services/notice-service';
import {IReq, IRes} from './shared/types';
import {
  tt_notice,
  tt_notice_master, tt_trade_review,
} from '@src/models/init-models';
import logger from "jet-logger";
import {getClientIP} from "@src/util/ip-util";
import {S3File} from "@src/routes/shared/awsMultipart";
import productService from "@src/services/product-service";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/trade/reviews',
  getByProduct: '/product/:id',
  postSeller: '/seller/add',
  postBuyer:'/buyer/add',
  update:'/update',
  delete:'/delete/:id',
} as const;

// **** Functions **** //
/**
 * @api {get} /trade/reviews/product/:id 상품별 리뷰 목록
 * @apiName GetTradeReviewsByProduct
 * @apiGroup TradeReview
 * @apiPermission normalUser
 *
 * @apiParam {number} id productId
 *
 */
async function getByProduct(req: IReq, res: IRes):Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}
/**
 * @api {post} /trade/reviews/seller/add 판매자 리뷰 추가하기
 * @apiName GetTradeReviewsByProduct
 * @apiGroup TradeReview
 * @apiPermission normalUser
 *
 * @apiBody {number} productId=0 상품ID
 * @apiBody {number} rating=5 점수
 * @apiBody {string} SUBJECT 제목
 * @apiBody {string} CONTENTS 내용
 *
 */
async function postSeller(req: IReq, res: IRes):Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}
/**
 * @api {post} /trade/reviews/buyer/add 판매자 리뷰 추가하기
 * @apiName GetTradeReviewsByProduct
 * @apiGroup TradeReview
 * @apiPermission normalUser
 *
 * @apiBody {number} productId=0 상품ID
 * @apiBody {number} rating=5 점수
 * @apiBody {string} SUBJECT 제목
 * @apiBody {string} CONTENTS 내용
 *
 */
async function postBuyer(req: IReq, res: IRes):Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}
/**
 * @api {post} /trade/reviews/buyer/add 판매자 리뷰 추가하기
 * @apiName GetTradeReviewsByProduct
 * @apiGroup TradeReview
 * @apiPermission normalUser
 *
 * @apiBody {number} productId=0 상품ID
 * @apiBody {number} rating=5 점수
 * @apiBody {string} SUBJECT 제목
 * @apiBody {string} CONTENTS 내용
 *
 */
async function update(req: IReq, res: IRes):Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}

/**
 * @api {delete} /trade/reviews/delete/:id delete product
 * @apiName DeleteTradeReview
 * @apiGroup TradeReview
 *
 * @apiPermission normalUser
 *
 * @apiParam {Number} id
 *
 * @apiParamExample {json} Request-Example:
 * {}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TradeReviewNotFound"
 *     }
 */
/*async */function _delete(req: IReq, res: IRes) {
  const id = +req.params.id;
  //await productService.delete(res.locals.user, id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  paths,
  getByProduct,
  postSeller,
  postBuyer,
  update,
  delete : _delete,

} as const;
