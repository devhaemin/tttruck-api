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
{
    "trades": [
        {
            "PRODUCT_ID": 120,
            "SUBJECT": "미송집성목 각재 팝니다",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 1,
            "PRODUCT_PRICE": 200000,
            "PRODUCT_SIZE": "75*75*600",
            "PRODUCT_WEIGHT": 2500,
            "CONTENTS": "사용후 남은 각목 1개 입니다. \n가지러 오셔야합니다. 배송비 부담하시면 다마스 불러드릴 수 있습니다.",
            "SELLER_USER_ID": 28,
            "SELLER_USER_IPv4": 987833922,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-01-07T04:47:08.000Z",
            "TAG": "",
            "ADDRESS": "서울 종로구 교남동 36-3",
            "LATITUDE": "37.5679022452494",
            "LONGITUDE": "126.965358093626",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    126.965358093626,
                    37.5679022452494
                ]
            },
            "UPDATE_USER_ID": 28,
            "UPDATE_USER_IPv4": 987833922,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-04-22T12:59:21.000Z",
            "TRADE_STATUS": 9,
            "TRADE_TIME": "2023-01-07T04:47:08.000Z",
            "BUYER_USER_ID": 26,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": true,
            "QUANTITY": "15개",
            "CHAT_TF": true,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 286,
                    "PRODUCT_ID": 120,
                    "FILE_NAME": "product/image/1673066828205_á\u0084\u0089á\u0085³á\u0084\u008fá\u0085³á\u0084\u0085á\u0085µá\u0086«á\u0084\u0089á\u0085£á\u0086º 2023-01-07 á\u0084\u008bá\u0085©á\u0084\u0092á\u0085® 1.43.09.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 743877,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1673066828205_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-01-07%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%201.43.09.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-01-07T04:47:08.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 284,
                    "PRODUCT_ID": 120,
                    "FILE_NAME": "product/image/1673066828212_á\u0084\u0089á\u0085³á\u0084\u008fá\u0085³á\u0084\u0085á\u0085µá\u0086«á\u0084\u0089á\u0085£á\u0086º 2023-01-07 á\u0084\u008bá\u0085©á\u0084\u0092á\u0085® 1.43.09 2.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 743877,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1673066828212_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-01-07%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%201.43.09%202.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-01-07T04:47:09.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 283,
                    "PRODUCT_ID": 120,
                    "FILE_NAME": "product/image/1673066828204_á\u0084\u0089á\u0085³á\u0084\u008fá\u0085³á\u0084\u0085á\u0085µá\u0086«á\u0084\u0089á\u0085£á\u0086º 2023-01-07 á\u0084\u008bá\u0085©á\u0084\u0092á\u0085® 1.43.09 3.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 743877,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1673066828204_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-01-07%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%201.43.09%203.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-01-07T04:47:09.000Z",
                    "PRIORITY": 2
                },
                {
                    "PRODUCT_IMAGE_ID": 285,
                    "PRODUCT_ID": 120,
                    "FILE_NAME": "product/image/1673066828224_á\u0084\u0089á\u0085³á\u0084\u008fá\u0085³á\u0084\u0085á\u0085µá\u0086«á\u0084\u0089á\u0085£á\u0086º 2023-01-07 á\u0084\u008bá\u0085©á\u0084\u0092á\u0085® 1.43.09 4.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 743877,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1673066828224_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-01-07%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%201.43.09%204.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-01-07T04:47:09.000Z",
                    "PRIORITY": 3
                }
            ],
            "SELLER_USER": {
                "NICKNAME": "하얀기린",
                "PROFILE_IMAGE": null,
                "USER_ID": 28
            },
            "tt_trade_reviews": [
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
                    "DELETE_TF": false
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
                    "DELETE_TF": false
                }
            ]
        },
        {
            "PRODUCT_ID": 175,
            "SUBJECT": "123123123ahsbeiuaiewfhaiuwehfi",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 4,
            "PRODUCT_PRICE": 123123213121,
            "PRODUCT_SIZE": "21312321321321321312",
            "PRODUCT_WEIGHT": 234213423000,
            "CONTENTS": "12312313",
            "SELLER_USER_ID": 22,
            "SELLER_USER_IPv4": 3421918658,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-04-22T13:23:29.000Z",
            "TAG": "",
            "ADDRESS": "충북 청주시 흥덕구 신봉동 28-2",
            "LATITUDE": "36.6563619120438",
            "LONGITUDE": "127.472781924359",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.472781924359,
                    36.6563619120438
                ]
            },
            "UPDATE_USER_ID": 22,
            "UPDATE_USER_IPv4": 3421918658,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-04-22T13:55:26.000Z",
            "TRADE_STATUS": 9,
            "TRADE_TIME": "2023-04-22T13:23:29.000Z",
            "BUYER_USER_ID": 26,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "213123123개",
            "CHAT_TF": true,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 467,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809249_stage_1.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 16107,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809249_stage_1.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:29.000Z",
                    "PRIORITY": 0
                }
            ],
            "SELLER_USER": {
                "NICKNAME": "얌이아빠",
                "PROFILE_IMAGE": "profile/1672990300562_9AFB98F3-D4FD-4E9C-A3A7-127B6E69D73B.jpeg",
                "USER_ID": 22
            },
            "tt_trade_reviews": []
        }
    ]
}
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
{
    "trades": [
        {
            "PRODUCT_ID": 127,
            "SUBJECT": "테라조 포세린타일600*600팔아요",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 5,
            "PRODUCT_PRICE": 200000,
            "PRODUCT_SIZE": "600*600*10",
            "PRODUCT_WEIGHT": 300000,
            "CONTENTS": "테라조 포세린타일 600*600\n13박스판매합니다.\n현장에서 쓰고 남은 자재이고\n의미없지만,\n원가는 헤베당m2당 26.000원입니다\n\n총18.72m2\n평수로는6.5평정도됩니다.\n\nm2당 12.000원해서\n12,000*18.72=224.640원\n20만원받겠습니다.\n(배송별도이니,참조바랍니다\n 박스당30킬로입니다,무게가있으니,트레이나,화물차가필요하실겁니다.)\n\n적당한 네고용의는 있습니다.\n마구찔러봐주세요!! ㅎ",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 3745434156,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-06T05:17:21.000Z",
            "TAG": "",
            "ADDRESS": "서울 성동구 하왕십리동 286-2",
            "LATITUDE": "37.569533166927",
            "LONGITUDE": "127.029562937984",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.029562937984,
                    37.569533166927
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 3745434156,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-06T05:17:21.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-06T05:17:21.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "13Box",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 305,
                    "PRODUCT_ID": 127,
                    "FILE_NAME": "product/image/1678079841551_2CF8CAC9-F93B-42B3-8E51-D53A999DD14B.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 3458643,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678079841551_2CF8CAC9-F93B-42B3-8E51-D53A999DD14B.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:17:26.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 306,
                    "PRODUCT_ID": 127,
                    "FILE_NAME": "product/image/1678079841536_E3B3CCC8-0883-407E-A6AB-FAA04898ACB2.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 4577721,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678079841536_E3B3CCC8-0883-407E-A6AB-FAA04898ACB2.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:17:27.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 307,
                    "PRODUCT_ID": 127,
                    "FILE_NAME": "product/image/1678079841477_C9B0862C-4138-4F29-B2C1-FCF98601A4DA.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 4757545,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678079841477_C9B0862C-4138-4F29-B2C1-FCF98601A4DA.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:17:27.000Z",
                    "PRIORITY": 0
                }
            ],
            "SELLER_USER": {
                "NICKNAME": "rockstar",
                "PROFILE_IMAGE": null,
                "USER_ID": 31
            },
            "tt_trade_reviews": []
        },
        {
            "PRODUCT_ID": 128,
            "SUBJECT": "회색압착시멘트20킬로 팝니다",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 999,
            "PRODUCT_PRICE": 50000,
            "PRODUCT_SIZE": "380*550*130",
            "PRODUCT_WEIGHT": 300000,
            "CONTENTS": "회색압착 20키로짜리 20포 판매합니다.\n포장지터진거 없습니다.\n현장에서 타일 붙이고,남은겁니다.\n1층까지는 내려드릴수 있고 운송은 직접하셔야합니다.\n\n채팅주세요!!\n",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 3745434156,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-06T05:29:39.000Z",
            "TAG": "",
            "ADDRESS": "서울 성동구 하왕십리동 286-2",
            "LATITUDE": "37.569533166927",
            "LONGITUDE": "127.029562937984",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.029562937984,
                    37.569533166927
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 3745434156,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-06T05:29:39.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-06T05:29:39.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "20포",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 308,
                    "PRODUCT_ID": 128,
                    "FILE_NAME": "product/image/1678080580079_C3D55D70-6E69-45C6-A783-FD1D6C5F99B7.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 89129,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678080580079_C3D55D70-6E69-45C6-A783-FD1D6C5F99B7.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:29:40.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 309,
                    "PRODUCT_ID": 128,
                    "FILE_NAME": "product/image/1678080580001_A80B6C0D-35B5-4308-AFE3-85D9C55ADD41.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 3361145,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678080580001_A80B6C0D-35B5-4308-AFE3-85D9C55ADD41.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:29:44.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 310,
                    "PRODUCT_ID": 128,
                    "FILE_NAME": "product/image/1678080580074_297899DF-1F4E-46CC-B36B-39156B6A6266.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 0,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product%2Fimage%2F1678080580074_297899DF-1F4E-46CC-B36B-39156B6A6266.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:29:47.000Z",
                    "PRIORITY": 0
                }
            ],
            "SELLER_USER": {
                "NICKNAME": "rockstar",
                "PROFILE_IMAGE": null,
                "USER_ID": 31
            },
            "tt_trade_reviews": []
        }
    ]
}
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
