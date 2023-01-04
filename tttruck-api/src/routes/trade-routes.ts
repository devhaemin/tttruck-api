import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from "@src/routes/shared/types";
import tradeService from "@src/services/trade-service";
import logger from "jet-logger";



// **** Variables **** //

// Paths
const paths = {
  basePath: '/trade',
  getUserBought: '/user/bought',
  getUserSold: '/user/sold',
  doTrade: '/:id/do',
} as const;


// **** Functions **** //

/**
 * @api {get} /trade/user/bought Get Trade list User bought
 * @apiName GetTradesUserBought
 * @apiGroup Trade
 *
 * @apiPermission normalUser
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     //todo: 추가하기
 *     ]
 * }
 *
 * @apiError tradeNotFound The Trade log of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TradeNotFound"
 *     }
 */
async function getUserBought(req: IReq, res: IRes) {
  const trades = await tradeService.getUserBought(res.locals.user);
  logger.info(trades);
  return res.status(HttpStatusCodes.OK).json({trades: trades});
}

/**
 * @api {get} /trade/user/sold Get Trade list User sold
 * @apiName GetTradesUserSold
 * @apiGroup Trade
 *
 * @apiPermission normalUser
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     //todo: 추가하기
 *     ]
 * }
 *
 * @apiError tradeNotFound The Trade log of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TradeNotFound"
 *     }
 */
async function getUserSold(req: IReq, res: IRes) {
  const trades = await tradeService.getUserSold(res.locals.user);
  logger.info(trades);
  return res.status(HttpStatusCodes.OK).json({trades: trades});
}


/**
 * @api {put} /trade/:id/do Do Trade
 * @apiName DoTrade
 * @apiGroup Trade
 *
 *
 * @apiPermission normalUser
 *
 * @apiParam {number} productId URL 경로에
 * @apiParam {number} buyerId Body에
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TradeNotFound"
 *     }
 */

async function doTrade(req: IReq<{productId:number, buyerId:number}>, res: IRes) {
  const productId = req.params.id;
  const {buyerId} = req.body;
  const result = await tradeService.doTrade(res.locals.user, buyerId, Number(productId));
  return res.status(HttpStatusCodes.OK).json(result);
}

// **** Export default **** //

export default {
  paths,
  getUserBought,
  getUserSold,
  doTrade,
} as const;
