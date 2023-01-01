import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from './shared/types';
import {tt_trade_review} from '@src/models/init-models';
import tradeReviewService from "@src/services/trade-review-service";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/trade/reviews',
  getByProduct: '/product/:id',
  postSeller: '/seller/add',
  postBuyer: '/buyer/add',
  update: '/update',
  delete: '/delete/:id',
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
async function getByProduct(req: IReq, res: IRes) {
  const productId = Number(req.params['productId']);
  const result = await tradeReviewService.getByProduct(productId);
  return res.status(HttpStatusCodes.OK).json(result).end();
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
async function postSeller(req: IReq<tt_trade_review>, res: IRes) {
  const tradeReview = req.body;
  const result = await tradeReviewService.postReview(tradeReview);
  return res.status(HttpStatusCodes.OK).json(result).end();
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
async function postBuyer(req: IReq<tt_trade_review>, res: IRes) {
  const tradeReview = req.body;
  const result = await tradeReviewService.postReview(tradeReview);
  return res.status(HttpStatusCodes.OK).json(result).end();
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
async function update(req: IReq, res: IRes) {
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

/*async */
function _delete(req: IReq, res: IRes) {
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
  delete: _delete,

} as const;
