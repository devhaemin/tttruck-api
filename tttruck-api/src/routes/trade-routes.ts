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
                    "FILE_NAME": "product/image/1673066828205_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09.png",
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
                    "FILE_NAME": "product/image/1673066828212_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09 2.png",
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
                    "FILE_NAME": "product/image/1673066828204_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09 3.png",
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
                    "FILE_NAME": "product/image/1673066828224_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09 4.png",
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
                    "DELETE_TF": true
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
                    "DELETE_TF": false
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
                },
                {
                    "PRODUCT_IMAGE_ID": 469,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809205_stage_2.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 16512,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809205_stage_2.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 472,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809244_ááµáá¡ááµáá³áá³.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 240912,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809244_%C3%A1%C2%84%C2%80%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%B3.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 2
                },
                {
                    "PRODUCT_IMAGE_ID": 470,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809247_áá¡á¯áá¡áá¡áá¥á¨áá©áá©áá³.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 263223,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809247_%C3%A1%C2%84%C2%82%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A5%C3%A1%C2%86%C2%A8%C3%A1%C2%84%C2%80%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%83%C3%A1%C2%85%C2%B3.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 3
                },
                {
                    "PRODUCT_IMAGE_ID": 473,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809404_áá¢áá¡á¼áá¡á¼ááµ.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 267041,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809404_%C3%A1%C2%84%C2%83%C3%A1%C2%85%C2%A2%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 4
                },
                {
                    "PRODUCT_IMAGE_ID": 475,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809434_áá¢á¼áá¢á¼ááµáá®á¯áá©.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 320106,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809434_%C3%A1%C2%84%C2%84%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%84%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%86%C3%A1%C2%85%C2%AE%C3%A1%C2%86%C2%AF%C3%A1%C2%84%C2%91%C3%A1%C2%85%C2%A9.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 5
                },
                {
                    "PRODUCT_IMAGE_ID": 474,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809418_áá¡áá®áá¡ááµáá³.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 308755,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809418_%C3%A1%C2%84%C2%86%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%AE%C3%A1%C2%84%C2%91%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%B3.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 6
                },
                {
                    "PRODUCT_IMAGE_ID": 468,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809245_áá¢á¨áá¡áá².png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 295804,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809245_%C3%A1%C2%84%C2%86%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%A8%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%B2.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 7
                },
                {
                    "PRODUCT_IMAGE_ID": 471,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809239_áá¡ááµáá¥á«áá¢á¨.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 300452,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809239_%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%86%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%A8.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 8
                },
                {
                    "PRODUCT_IMAGE_ID": 476,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809484_áá¢á¨áá¦áá¬áá®á¯.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 301066,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809484_%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%A8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A6%C3%A1%C2%84%C2%80%C3%A1%C2%85%C2%AC%C3%A1%C2%84%C2%86%C3%A1%C2%85%C2%AE%C3%A1%C2%86%C2%AF.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 9
                },
                {
                    "PRODUCT_IMAGE_ID": 477,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809486_áá¦ááµáá³á«áá¡á¨áá¡.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 293646,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809486_%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A6%C3%A1%C2%84%C2%83%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%A8%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A1.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 10
                },
                {
                    "PRODUCT_IMAGE_ID": 478,
                    "PRODUCT_ID": 175,
                    "FILE_NAME": "product/image/1682169809497_áá¡á·áá³á·.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 261428,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1682169809497_%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%B7%C3%A1%C2%84%C2%80%C3%A1%C2%85%C2%B3%C3%A1%C2%86%C2%B7.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-04-22T13:23:30.000Z",
                    "PRIORITY": 11
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
        },
        {
            "PRODUCT_ID": 129,
            "SUBJECT": "mdf15티 600*2420팔아요~~~",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 1,
            "PRODUCT_PRICE": 180000,
            "PRODUCT_SIZE": "600*2420*15",
            "PRODUCT_WEIGHT": 300000,
            "CONTENTS": "mdf 15미리 온장을 세로로길게 재단한\n600*2420짜리 30장입니다.\n\n장당6000원씩 18만원받겠습니다.\n네고는죄송합니다.\n\n차량댈수 있는 건물입근까지만\n내려놓을수 있으니 유의해주십시요.\nw600짜리는 생각보다 가구나 알판등에\n쓰시기좋을겁니닷!",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 3745434156,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-06T05:42:39.000Z",
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
            "UPDATE_DATE": "2023-03-06T05:42:39.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-06T05:42:39.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "30장",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 311,
                    "PRODUCT_ID": 129,
                    "FILE_NAME": "product/image/1678081359761_C03321B2-5916-4527-9CC3-DA2EF079A9FA.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 3309712,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678081359761_C03321B2-5916-4527-9CC3-DA2EF079A9FA.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:42:44.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 312,
                    "PRODUCT_ID": 129,
                    "FILE_NAME": "product/image/1678081359840_3B05D729-4ACF-477B-912B-DF461B1D8B8E.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 4004247,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678081359840_3B05D729-4ACF-477B-912B-DF461B1D8B8E.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:42:59.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 313,
                    "PRODUCT_ID": 129,
                    "FILE_NAME": "product/image/1678081359893_1A7989A1-7250-46B0-AF67-8FFF8091BDD0.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2446762,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678081359893_1A7989A1-7250-46B0-AF67-8FFF8091BDD0.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-06T05:42:59.000Z",
                    "PRIORITY": 2
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
            "PRODUCT_ID": 133,
            "SUBJECT": "펜던트조명캡 판매합니다.",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 8,
            "PRODUCT_PRICE": 7000,
            "PRODUCT_SIZE": "120*80",
            "PRODUCT_WEIGHT": 2500,
            "CONTENTS": "펜던트조명 화이트 조명캡 팔아요.\n후렌치포함이구요\n수량은7개입니다.",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 1964096058,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-07T05:05:00.000Z",
            "TAG": "",
            "ADDRESS": "서울 동대문구 장안동 94-22",
            "LATITUDE": "37.5811926051315",
            "LONGITUDE": "127.070215633765",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.070215633765,
                    37.5811926051315
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 1964096058,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-18T00:45:49.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-07T05:05:00.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "7개",
            "CHAT_TF": true,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 324,
                    "PRODUCT_ID": 133,
                    "FILE_NAME": "product/image/1678165500339_74BB9B64-3AC6-45DB-93A4-DCAD0060E063.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2150193,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165500339_74BB9B64-3AC6-45DB-93A4-DCAD0060E063.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-07T05:05:01.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 325,
                    "PRODUCT_ID": 133,
                    "FILE_NAME": "product/image/1678165500402_4D186A14-E20B-4D80-81E6-B99E899C7B10.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2588403,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165500402_4D186A14-E20B-4D80-81E6-B99E899C7B10.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-07T05:05:02.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 326,
                    "PRODUCT_ID": 133,
                    "FILE_NAME": "product/image/1678165500425_653D2ED2-8208-4ADE-96B9-BDA7451A4CEC.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2570033,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165500425_653D2ED2-8208-4ADE-96B9-BDA7451A4CEC.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-07T05:05:02.000Z",
                    "PRIORITY": 2
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
            "PRODUCT_ID": 134,
            "SUBJECT": "4인치 주백색 LED매입등 ",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 8,
            "PRODUCT_PRICE": 35000,
            "PRODUCT_SIZE": "125*45",
            "PRODUCT_WEIGHT": 2500,
            "CONTENTS": "장수조명 4인치 주백색 LED 매입등 판매합니다.수량20개,일괄로35,000원입니다.박스도 개봉안한 새상품입니다.\n택배비는 별도근요^^",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 1964096058,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-07T05:09:23.000Z",
            "TAG": "",
            "ADDRESS": "서울 동대문구 장안동 94-22",
            "LATITUDE": "37.5811926051315",
            "LONGITUDE": "127.070215633765",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.070215633765,
                    37.5811926051315
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 1964096058,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-07T05:09:23.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-07T05:09:23.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "20개",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 327,
                    "PRODUCT_ID": 134,
                    "FILE_NAME": "product/image/1678165764018_A9EFB6B0-9164-49F2-B2D9-AEC1E3335888.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2402194,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165764018_A9EFB6B0-9164-49F2-B2D9-AEC1E3335888.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-07T05:09:24.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 328,
                    "PRODUCT_ID": 134,
                    "FILE_NAME": "product/image/1678165764110_2263B22D-E13E-4A0C-8510-4B49AEB2DF81.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 4726929,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165764110_2263B22D-E13E-4A0C-8510-4B49AEB2DF81.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-07T05:09:25.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 329,
                    "PRODUCT_ID": 134,
                    "FILE_NAME": "product/image/1678165764081_651A9612-4A2F-4064-AA60-9C5056982375.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 3399241,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165764081_651A9612-4A2F-4064-AA60-9C5056982375.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-07T05:09:25.000Z",
                    "PRIORITY": 2
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
            "PRODUCT_ID": 139,
            "SUBJECT": "6인치 LED 매입등 판매",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 8,
            "PRODUCT_PRICE": 18000,
            "PRODUCT_SIZE": "120*120*60",
            "PRODUCT_WEIGHT": 2500,
            "CONTENTS": "6인치led 매입등 주광색 \n12개판매합니다.\n주광색이 우리가 알고있는 하얀색조명입니다.참고하세요\n사진상3개이지만,실제같은제품 12개 있습니다.일괄로 판매원합니다.\n",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 1964096058,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-09T08:04:29.000Z",
            "TAG": "",
            "ADDRESS": "서울 성동구 하왕십리동 286-2",
            "LATITUDE": "37.569533166927",
            "LONGITUDE": "127.029562937984",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.070215633765,
                    37.5811926051315
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 1964096058,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-09T08:04:29.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-09T08:04:29.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "12개",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 346,
                    "PRODUCT_ID": 139,
                    "FILE_NAME": "product/image/1678349069321_85BDE65C-0083-4C92-9354-F459D9D919BC.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 3164706,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349069321_85BDE65C-0083-4C92-9354-F459D9D919BC.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-09T08:04:33.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 345,
                    "PRODUCT_ID": 139,
                    "FILE_NAME": "product/image/1678349069317_0CFE7819-3CA8-43A6-B945-B3F5C9881F73.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2993887,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349069317_0CFE7819-3CA8-43A6-B945-B3F5C9881F73.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-09T08:05:50.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 344,
                    "PRODUCT_ID": 139,
                    "FILE_NAME": "product/image/1678349069323_5076CCB8-F865-42C7-956B-F639BDFB2766.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2554212,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349069323_5076CCB8-F865-42C7-956B-F639BDFB2766.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-09T08:05:50.000Z",
                    "PRIORITY": 2
                },
                {
                    "PRODUCT_IMAGE_ID": 343,
                    "PRODUCT_ID": 139,
                    "FILE_NAME": "product/image/1678349069265_87041D2E-7BD1-4C73-9E77-3E68D8BDEBA2.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2678648,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349069265_87041D2E-7BD1-4C73-9E77-3E68D8BDEBA2.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-09T08:05:50.000Z",
                    "PRIORITY": 3
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
            "PRODUCT_ID": 140,
            "SUBJECT": "205목공용본드 판매",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 1,
            "PRODUCT_PRICE": 40000,
            "PRODUCT_SIZE": "100*220*40",
            "PRODUCT_WEIGHT": 20000,
            "CONTENTS": "현장치고 남은 오공 205 목공용본드 \n판매합니다.\n수량 낱개로37개 입니다.\n1박스에 39,000정도 합니다.\n1박스값으로 거의2박스가져가세요!!",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 1964096058,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-09T08:11:36.000Z",
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
            "UPDATE_USER_IPv4": 1964096058,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-09T08:11:36.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-09T08:11:36.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "36개",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 348,
                    "PRODUCT_ID": 140,
                    "FILE_NAME": "product/image/1678349496518_98DB6432-28D2-4C43-B951-AF4CE099E115.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2767609,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349496518_98DB6432-28D2-4C43-B951-AF4CE099E115.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-09T08:12:25.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 349,
                    "PRODUCT_ID": 140,
                    "FILE_NAME": "product/image/1678349496524_F54880CC-A227-431C-81EB-E11819746E6E.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2789918,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349496524_F54880CC-A227-431C-81EB-E11819746E6E.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-09T08:12:25.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 350,
                    "PRODUCT_ID": 140,
                    "FILE_NAME": "product/image/1678349544324_6052EE39-714F-4C41-ACC0-E0FDEF028D10.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 3039093,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349544324_6052EE39-714F-4C41-ACC0-E0FDEF028D10.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-09T08:12:25.000Z",
                    "PRIORITY": 2
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
            "PRODUCT_ID": 143,
            "SUBJECT": "3단서랍레일 12조판매",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 10,
            "PRODUCT_PRICE": 24000,
            "PRODUCT_SIZE": "200*35",
            "PRODUCT_WEIGHT": 7500,
            "CONTENTS": "3단서랍레일 200mm짜리\n12조(24개)판매합니다.\n200mm다보니,키보드레일이나 얕은서랍에 맞습니다.\n일반책상서랍은400mm깊이이니,\n참조하세요!",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 1964096058,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-13T04:44:24.000Z",
            "TAG": "",
            "ADDRESS": "경기 하남시 망월동 1066-2",
            "LATITUDE": "37.559915924867",
            "LONGITUDE": "127.185547174118",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.185547174118,
                    37.559915924867
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 1964096058,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-13T04:44:24.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-13T04:44:24.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "12조",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 359,
                    "PRODUCT_ID": 143,
                    "FILE_NAME": "product/image/1678682664070_3DF517B6-3BFF-46AF-9E3D-9EE800E14301.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2663444,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682664070_3DF517B6-3BFF-46AF-9E3D-9EE800E14301.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-13T04:44:24.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 360,
                    "PRODUCT_ID": 143,
                    "FILE_NAME": "product/image/1678682664137_F55494C1-BE25-4602-AACD-F2DC436073C6.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 4286105,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682664137_F55494C1-BE25-4602-AACD-F2DC436073C6.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-13T04:44:26.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 361,
                    "PRODUCT_ID": 143,
                    "FILE_NAME": "product/image/1678682664156_4D008B7A-28DF-474C-ABF6-931795E1FF25.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 3616944,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682664156_4D008B7A-28DF-474C-ABF6-931795E1FF25.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-13T04:44:26.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 362,
                    "PRODUCT_ID": 143,
                    "FILE_NAME": "product/image/1678682664132_AF496B59-7B3D-4C83-97F7-079B695B91CA.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 4672701,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682664132_AF496B59-7B3D-4C83-97F7-079B695B91CA.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-13T04:44:26.000Z",
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
            "PRODUCT_ID": 144,
            "SUBJECT": "납판0.8t판매",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 999,
            "PRODUCT_PRICE": 57000,
            "PRODUCT_SIZE": "900*1800*0.8t",
            "PRODUCT_WEIGHT": 65000,
            "CONTENTS": "방사능차폐용으로 사용하는 납판입니다.\n엑스레이실 공사하고 남은자재입니다.\n두께 0.8t이니 참조하십시요!\n상기납판 1장값이 거의6만원합니다.\n한번도사용하지않은 새상품이나,납판특성상 잘구부러져 그런겁니다",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 1964096058,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-13T04:49:55.000Z",
            "TAG": "",
            "ADDRESS": "서울 종로구 평동 233",
            "LATITUDE": "37.5688537151032",
            "LONGITUDE": "126.965114852628",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    126.965114852628,
                    37.5688537151032
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 1964096058,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-13T04:49:55.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-13T04:49:55.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "2개",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 363,
                    "PRODUCT_ID": 144,
                    "FILE_NAME": "product/image/1678682995171_BE8BC18E-CD9E-4CB7-84FD-29969D3E62FD.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2535610,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682995171_BE8BC18E-CD9E-4CB7-84FD-29969D3E62FD.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-13T04:49:56.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 364,
                    "PRODUCT_ID": 144,
                    "FILE_NAME": "product/image/1678682995222_929C8EED-F096-4F77-A747-246FA1C37AFC.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2746451,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682995222_929C8EED-F096-4F77-A747-246FA1C37AFC.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-13T04:49:56.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 365,
                    "PRODUCT_ID": 144,
                    "FILE_NAME": "product/image/1678682995206_50ADC0E6-4A9C-446E-8168-C058139ABB3E.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2782241,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682995206_50ADC0E6-4A9C-446E-8168-C058139ABB3E.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-13T04:49:56.000Z",
                    "PRIORITY": 2
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
            "PRODUCT_ID": 164,
            "SUBJECT": "st50,st38각1박스판매",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 10,
            "PRODUCT_PRICE": 60000,
            "PRODUCT_SIZE": "50,38mm",
            "PRODUCT_WEIGHT": 20000,
            "CONTENTS": "타카판매합니다.\nst50-10개 1박스\nst38-10개 1박스 \n일괄로판매하고 싶습니다.\n새상품입니다.",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 3743817292,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-20T02:18:10.000Z",
            "TAG": "",
            "ADDRESS": "경기 성남시 분당구 수내동 33-1",
            "LATITUDE": "37.3771129144362",
            "LONGITUDE": "127.115485950754",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.115485950754,
                    37.3771129144362
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 3743817292,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-20T02:18:10.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-20T02:18:10.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "20개",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 427,
                    "PRODUCT_ID": 164,
                    "FILE_NAME": "product/image/1679278690881_405A8DAF-7B03-47B1-A0FB-582BDD009CB0.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2449434,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679278690881_405A8DAF-7B03-47B1-A0FB-582BDD009CB0.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:18:30.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 428,
                    "PRODUCT_ID": 164,
                    "FILE_NAME": "product/image/1679278690894_BFC7E606-4D64-4782-85BD-BCF37379A52E.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 4206994,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679278690894_BFC7E606-4D64-4782-85BD-BCF37379A52E.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:18:39.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 429,
                    "PRODUCT_ID": 164,
                    "FILE_NAME": "product/image/1679278690735_302C4D33-AD27-444E-B5E0-41C16ED256B6.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 4664001,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679278690735_302C4D33-AD27-444E-B5E0-41C16ED256B6.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:18:40.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 430,
                    "PRODUCT_ID": 164,
                    "FILE_NAME": "product/image/1679278690909_35E4F08B-94A0-44B6-9CDB-4ADBA95AF205.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 0,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product%2Fimage%2F1679278690909_35E4F08B-94A0-44B6-9CDB-4ADBA95AF205.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:18:42.000Z",
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
            "PRODUCT_ID": 165,
            "SUBJECT": "목문용 미닫이 벽체고정형 하부가이드 판매",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 10,
            "PRODUCT_PRICE": 18000,
            "PRODUCT_SIZE": "43×70",
            "PRODUCT_WEIGHT": 2500,
            "CONTENTS": "슬라이딩 도어 벽체 하부 롤러가이드판매합니다.총6개있습니다.\n목문용입니다.",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 3743817292,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-20T02:22:50.000Z",
            "TAG": "",
            "ADDRESS": "경기 성남시 분당구 수내동 33-1",
            "LATITUDE": "37.3771129144362",
            "LONGITUDE": "127.115485950754",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.115485950754,
                    37.3771129144362
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 3743817292,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-20T02:22:50.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-20T02:22:50.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "6개",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 433,
                    "PRODUCT_ID": 165,
                    "FILE_NAME": "product/image/1679278970843_11100001-DCF9-46B1-88D6-44098B413618.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2360365,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679278970843_11100001-DCF9-46B1-88D6-44098B413618.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:22:53.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 432,
                    "PRODUCT_ID": 165,
                    "FILE_NAME": "product/image/1679278970951_56F1FA5C-42C9-4FDE-97F2-71E8D88C7595.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2204302,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679278970951_56F1FA5C-42C9-4FDE-97F2-71E8D88C7595.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:23:18.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 431,
                    "PRODUCT_ID": 165,
                    "FILE_NAME": "product/image/1679278970958_CC37CE6B-630E-449C-B60E-A6177D5EDFC4.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 1924410,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679278970958_CC37CE6B-630E-449C-B60E-A6177D5EDFC4.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:23:18.000Z",
                    "PRIORITY": 2
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
            "PRODUCT_ID": 166,
            "SUBJECT": "6인치led매입등 주백색 나눔",
            "PRIORITY": 1,
            "PRODUCT_CATEGORY_ID": 8,
            "PRODUCT_PRICE": 1,
            "PRODUCT_SIZE": "175*73",
            "PRODUCT_WEIGHT": 2500,
            "CONTENTS": "6인치 주백색,매입등16w\n나눔합니다.",
            "SELLER_USER_ID": 31,
            "SELLER_USER_IPv4": 3743817292,
            "SELLER_USER_IPv6": null,
            "UPLOAD_TIME": "2023-03-20T02:28:12.000Z",
            "TAG": "",
            "ADDRESS": "경기 성남시 분당구 수내동 33-1",
            "LATITUDE": "37.3771129144362",
            "LONGITUDE": "127.115485950754",
            "LOCATION": {
                "type": "Point",
                "coordinates": [
                    127.115485950754,
                    37.3771129144362
                ]
            },
            "UPDATE_USER_ID": 31,
            "UPDATE_USER_IPv4": 3743817292,
            "UPDATE_USER_IPv6": null,
            "UPDATE_DATE": "2023-03-20T02:28:12.000Z",
            "TRADE_STATUS": 0,
            "TRADE_TIME": "2023-03-20T02:28:12.000Z",
            "BUYER_USER_ID": null,
            "BUYER_USER_IPv4": null,
            "BUYER_USER_IPv6": null,
            "DELETE_TF": false,
            "QUANTITY": "2개",
            "CHAT_TF": false,
            "tt_product_images": [
                {
                    "PRODUCT_IMAGE_ID": 434,
                    "PRODUCT_ID": 166,
                    "FILE_NAME": "product/image/1679279293049_E77251A0-4EDB-413D-A93B-DBBCBA5426AA.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2348858,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679279293049_E77251A0-4EDB-413D-A93B-DBBCBA5426AA.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:28:18.000Z",
                    "PRIORITY": 0
                },
                {
                    "PRODUCT_IMAGE_ID": 435,
                    "PRODUCT_ID": 166,
                    "FILE_NAME": "product/image/1679279293146_A9364B43-B331-42FF-99BD-E4EEBAA2FCE1.jpeg",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2384611,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679279293146_A9364B43-B331-42FF-99BD-E4EEBAA2FCE1.jpeg",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:28:19.000Z",
                    "PRIORITY": 1
                },
                {
                    "PRODUCT_IMAGE_ID": 436,
                    "PRODUCT_ID": 166,
                    "FILE_NAME": "product/image/1679279293156_8ABEAE2C-CD0A-4E7B-B5CE-6CC384FAAD80.png",
                    "FILE_PATH": null,
                    "FILE_SIZE": 2754942,
                    "ORG_FILE_SEQ": null,
                    "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1679279293156_8ABEAE2C-CD0A-4E7B-B5CE-6CC384FAAD80.png",
                    "THUMB_PATH": null,
                    "FILE_ID": null,
                    "CONTENT_ID": null,
                    "TIME": "2023-03-20T02:28:19.000Z",
                    "PRIORITY": 2
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
