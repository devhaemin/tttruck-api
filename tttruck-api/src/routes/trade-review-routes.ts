import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from './shared/types';
import {tt_trade_review} from '@src/models/init-models';
import tradeReviewService from "@src/services/trade-review-service";
import {tt_trade_review_type} from "@src/models/dummy/tt_trade_status";


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

// **** Functions **** //
/**
 * @api {get} /trade/reviews/product/:id 상품별 리뷰 목록
 * @apiName GetTradeReviewsByProduct
 * @apiGroup TradeReview
 * @apiPermission normalUser
 *
 * @apiSuccessExample {json} Success-Response:
 * [
    {
        "TRADE_REVIEW_ID": 31,
        "PRODUCT_ID": 120,
        "TRADE_REVIEW_TYPE": null,
        "USER_ID": null,
        "RATINGS": 0,
        "SUBJECT": "안녕하세요 리뷰 제목",
        "CONTENTS": "판매자 리뷰 내용",
        "IPv4": null,
        "IPv6": null,
        "CREATE_TIME": "2023-03-14T12:14:21.000Z",
        "UPDATE_TIME": "2023-03-14T12:14:21.000Z",
        "DELETE_TF": false,
        "USER": null
    },
    {
        "TRADE_REVIEW_ID": 32,
        "PRODUCT_ID": 120,
        "TRADE_REVIEW_TYPE": null,
        "USER_ID": null,
        "RATINGS": 0,
        "SUBJECT": "안녕하세요 리뷰 제목",
        "CONTENTS": "판매자 리뷰 내용",
        "IPv4": null,
        "IPv6": null,
        "CREATE_TIME": "2023-03-14T12:14:41.000Z",
        "UPDATE_TIME": "2023-03-14T12:14:41.000Z",
        "DELETE_TF": false,
        "USER": null
    },
    {
        "TRADE_REVIEW_ID": 33,
        "PRODUCT_ID": 120,
        "TRADE_REVIEW_TYPE": null,
        "USER_ID": null,
        "RATINGS": 2,
        "SUBJECT": "TEST 판매자 리뷰 제목",
        "CONTENTS": "판매자 리뷰 내용",
        "IPv4": null,
        "IPv6": null,
        "CREATE_TIME": "2023-03-14T12:15:07.000Z",
        "UPDATE_TIME": "2023-03-14T13:36:13.000Z",
        "DELETE_TF": true,
        "USER": null
    },
    {
        "TRADE_REVIEW_ID": 34,
        "PRODUCT_ID": 120,
        "TRADE_REVIEW_TYPE": 0,
        "USER_ID": 26,
        "RATINGS": 0,
        "SUBJECT": "TEST 구매자 리뷰 제목",
        "CONTENTS": null,
        "IPv4": null,
        "IPv6": null,
        "CREATE_TIME": "2023-03-14T12:56:01.000Z",
        "UPDATE_TIME": "2023-03-14T12:56:01.000Z",
        "DELETE_TF": false,
        "USER": {
            "USER_ID": 26,
            "PROFILE_IMAGE": "profile/1673239954601_img-ObBaphDQMth1gVfJIwiS0HUh.png",
            "NICKNAME": "정해민"
        }
    },
    {
        "TRADE_REVIEW_ID": 35,
        "PRODUCT_ID": 120,
        "TRADE_REVIEW_TYPE": 1,
        "USER_ID": 26,
        "RATINGS": 2,
        "SUBJECT": "TEST 판매자 리뷰 제목",
        "CONTENTS": null,
        "IPv4": null,
        "IPv6": null,
        "CREATE_TIME": "2023-03-14T12:57:04.000Z",
        "UPDATE_TIME": "2023-03-14T13:35:26.000Z",
        "DELETE_TF": false,
        "USER": {
            "USER_ID": 26,
            "PROFILE_IMAGE": "profile/1673239954601_img-ObBaphDQMth1gVfJIwiS0HUh.png",
            "NICKNAME": "정해민"
        }
    }
]
 * @apiParam {number} id productId
 *
 */
async function getByProduct(req: IReq, res: IRes) {
  const productId = Number(req.params.id);
  const result = await tradeReviewService.getByProduct(productId);
  return res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {post} /trade/reviews/seller/add 판매자 리뷰 추가하기
 * @apiName AddSellerReview
 * @apiGroup TradeReview
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "PRODUCT_ID":62,
 *     "RATING" : 5,
 *     "SUBJECT" : "안녕하세요 리뷰 제목",
 *     "CONTENTS": "판매자 리뷰 내용"
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "RATINGS": 0,
 *     "CREATE_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "UPDATE_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "DELETE_TF": false,
 *     "TRADE_REVIEW_ID": 3,
 *     "PRODUCT_ID": 62,
 *     "SUBJECT": "안녕하세요 리뷰 제목",
 *     "CONTENTS": "판매자 리뷰 내용",
 *     "TRADE_REVIEW_TYPE": 1
 * }
 *
 */
async function postSeller(req: IReq<tt_trade_review>, res: IRes) {
  const tradeReview = req.body;
  const user = res.locals.user;
  const result =
    await tradeReviewService.postReview(user, tradeReview,tt_trade_review_type.SELLER_REVIEW);
  return res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {post} /trade/reviews/buyer/add 구매자 리뷰 추가하기
 * @apiName AddBuyerReview
 * @apiGroup TradeReview
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "PRODUCT_ID":62,
 *     "RATING" : 5,
 *     "SUBJECT" : "안녕하세요 리뷰 제목",
 *     "CONTENTS": "판매자 리뷰 내용"
 * }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "RATINGS": 0,
 *     "CREATE_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "UPDATE_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "DELETE_TF": false,
 *     "TRADE_REVIEW_ID": 3,
 *     "PRODUCT_ID": 62,
 *     "SUBJECT": "안녕하세요 리뷰 제목",
 *     "CONTENTS": "판매자 리뷰 내용",
 *     "TRADE_REVIEW_TYPE": 1
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "RATINGS": 0,
 *     "CREATE_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "UPDATE_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "DELETE_TF": false,
 *     "TRADE_REVIEW_ID": 7,
 *     "PRODUCT_ID": 62,
 *     "SUBJECT": "안녕하세요 리뷰 제목2",
 *     "CONTENTS": "판매자 리뷰 내용2",
 *     "TRADE_REVIEW_TYPE": 0
 * }
 *
 */
async function postBuyer(req: IReq<tt_trade_review>, res: IRes) {
  const tradeReview = req.body;
  const user = res.locals.user;
  const result =
    await tradeReviewService.postReview(user,tradeReview, tt_trade_review_type.BUYER_REVIEW);
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
