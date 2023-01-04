import {IReq, IRes} from './shared/types';
import chatService from "@src/services/chat-service";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";

// **** Variables **** //

// Paths
const paths = {
  basePath: '/chat',
  getChannelsByProductId: '/talkplus/product/:id/channels',
  getChannelById: '/talkplus/channel/:id',
  getUserChannel: '/talkplus/channel/all',
  createChannel: '/talkplus/channel/add',
  sendMessage: '/talkplus/message/add',
} as const;

/**
 * @api {get} /chat/talkplus/product/:id/channels Get all Channels with buyer user
 * @apiName GetChannelByProductId
 * @apiGroup TalkPlus
 * @apiPermission normalUser
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "CHANNEL_ID": 1,
 *         "TALKPLUS_CHANNEL_ID": "63b1dacabd470d0001002d61",
 *         "PRODUCT_ID": 61,
 *         "NAME": "ewwer",
 *         "BUYER_ID": "tttruck21",
 *         "TYPE": "private",
 *         "IMAGE_URL": "",
 *         "MAX_MEMBER_COUNT": 2,
 *         "STATUS": 0,
 *         "SELLER_ID": "tttruck22",
 *         "LASTCHAT_TIME": "2023-01-03T13:27:08.000Z",
 *         "PRODUCT": {
 *             "PRODUCT_ID": 61,
 *             "SUBJECT": "ewwer",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 123123123,
 *             "PRODUCT_SIZE": "123123",
 *             "PRODUCT_WEIGHT": 300000,
 *             "CONTENTS": "213123123123",
 *             "SELLER_USER_ID": 22,
 *             "SELLER_USER_IPv4": 2097057137,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_TIME": "2022-12-31T08:14:23.000Z",
 *             "TAG": "",
 *             "ADDRESS": " 1",
 *             "LATITUDE": "37.541",
 *             "LONGITUDE": "126.986",
 *             "LOCATION": {
 *                 "type": "Point",
 *                 "coordinates": [
 *                     126.986,
 *                     37.541
 *                 ]
 *             },
 *             "UPDATE_USER_ID": 22,
 *             "UPDATE_USER_IPv4": 2097057137,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2023-01-03T13:07:04.000Z",
 *             "TRADE_STATUS": 0,
 *             "TRADE_TIME": "2022-12-31T08:14:23.000Z",
 *             "BUYER_USER_ID": null,
 *             "BUYER_USER_IPv4": null,
 *             "BUYER_USER_IPv6": null,
 *             "DELETE_TF": false,
 *             "QUANTITY": "123123개",
 *             "CHAT_TF": true
 *         },
 *         "BUYER": {
 *             "USER_ID": 21,
 *             "TALKPLUS_USERNAME": "너그러운북극곰",
 *             "TALKPLUS_PROFILE_IMAGE_URL": "https://cdn.tttruck.co.kr/profile/1672636824458_chvu.jpeg"
 *         }
 *     },
 *     {
 *         "CHANNEL_ID": 8,
 *         "TALKPLUS_CHANNEL_ID": "63b294464b5f8800010013bc",
 *         "PRODUCT_ID": 61,
 *         "NAME": "ewwer",
 *         "BUYER_ID": "tttruck21",
 *         "TYPE": "private",
 *         "IMAGE_URL": "https://cdn.tttruck.co.kr/product/image/1672474463470_banner.jpg",
 *         "MAX_MEMBER_COUNT": 2,
 *         "STATUS": 0,
 *         "SELLER_ID": "tttruck22",
 *         "LASTCHAT_TIME": "2023-01-03T13:27:08.000Z",
 *         "PRODUCT": {
 *             "PRODUCT_ID": 61,
 *             "SUBJECT": "ewwer",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 123123123,
 *             "PRODUCT_SIZE": "123123",
 *             "PRODUCT_WEIGHT": 300000,
 *             "CONTENTS": "213123123123",
 *             "SELLER_USER_ID": 22,
 *             "SELLER_USER_IPv4": 2097057137,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_TIME": "2022-12-31T08:14:23.000Z",
 *             "TAG": "",
 *             "ADDRESS": " 1",
 *             "LATITUDE": "37.541",
 *             "LONGITUDE": "126.986",
 *             "LOCATION": {
 *                 "type": "Point",
 *                 "coordinates": [
 *                     126.986,
 *                     37.541
 *                 ]
 *             },
 *             "UPDATE_USER_ID": 22,
 *             "UPDATE_USER_IPv4": 2097057137,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2023-01-03T13:07:04.000Z",
 *             "TRADE_STATUS": 0,
 *             "TRADE_TIME": "2022-12-31T08:14:23.000Z",
 *             "BUYER_USER_ID": null,
 *             "BUYER_USER_IPv4": null,
 *             "BUYER_USER_IPv6": null,
 *             "DELETE_TF": false,
 *             "QUANTITY": "123123개",
 *             "CHAT_TF": true
 *         },
 *         "BUYER": {
 *             "USER_ID": 21,
 *             "TALKPLUS_USERNAME": "너그러운북극곰",
 *             "TALKPLUS_PROFILE_IMAGE_URL": "https://cdn.tttruck.co.kr/profile/1672636824458_c.jpeg"
 *         }
 *     },
 *     {
 *         "CHANNEL_ID": 10,
 *         "TALKPLUS_CHANNEL_ID": "63b428788aabd70001001dd1",
 *         "PRODUCT_ID": 61,
 *         "NAME": "ewwer",
 *         "BUYER_ID": "tttruck21",
 *         "TYPE": "private",
 *         "IMAGE_URL": "https://cdn.tttruck.co.kr/product/image/1672474463470_banner.jpg",
 *         "MAX_MEMBER_COUNT": 2,
 *         "STATUS": 0,
 *         "SELLER_ID": "tttruck22",
 *         "LASTCHAT_TIME": "2023-01-03T13:27:08.000Z",
 *         "PRODUCT": {
 *             "PRODUCT_ID": 61,
 *             "SUBJECT": "ewwer",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 123123123,
 *             "PRODUCT_SIZE": "123123",
 *             "PRODUCT_WEIGHT": 300000,
 *             "CONTENTS": "213123123123",
 *             "SELLER_USER_ID": 22,
 *             "SELLER_USER_IPv4": 2097057137,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_TIME": "2022-12-31T08:14:23.000Z",
 *             "TAG": "",
 *             "ADDRESS": " 1",
 *             "LATITUDE": "37.541",
 *             "LONGITUDE": "126.986",
 *             "LOCATION": {
 *                 "type": "Point",
 *                 "coordinates": [
 *                     126.986,
 *                     37.541
 *                 ]
 *             },
 *             "UPDATE_USER_ID": 22,
 *             "UPDATE_USER_IPv4": 2097057137,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2023-01-03T13:07:04.000Z",
 *             "TRADE_STATUS": 0,
 *             "TRADE_TIME": "2022-12-31T08:14:23.000Z",
 *             "BUYER_USER_ID": null,
 *             "BUYER_USER_IPv4": null,
 *             "BUYER_USER_IPv6": null,
 *             "DELETE_TF": false,
 *             "QUANTITY": "123123개",
 *             "CHAT_TF": true
 *         },
 *         "BUYER": {
 *             "USER_ID": 21,
 *             "TALKPLUS_USERNAME": "너그러운북극곰",
 *             "TALKPLUS_PROFILE_IMAGE_URL": "https://cdn.tttruck.co.kr/profile/1672636824458_chv.jpeg"
 *         }
 *     },
 *     {
 *         "CHANNEL_ID": 15,
 *         "TALKPLUS_CHANNEL_ID": "63b57d5a25317a0001001795",
 *         "PRODUCT_ID": 61,
 *         "NAME": "ewwer",
 *         "BUYER_ID": "tttruck23",
 *         "TYPE": "private",
 *         "IMAGE_URL": "https://cdn.tttruck.co.kr/product/image/1672474463470_banner.jpg",
 *         "MAX_MEMBER_COUNT": 2,
 *         "STATUS": 0,
 *         "SELLER_ID": "tttruck22",
 *         "LASTCHAT_TIME": "2023-01-04T13:21:31.000Z",
 *         "PRODUCT": {
 *             "PRODUCT_ID": 61,
 *             "SUBJECT": "ewwer",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 123123123,
 *             "PRODUCT_SIZE": "123123",
 *             "PRODUCT_WEIGHT": 300000,
 *             "CONTENTS": "213123123123",
 *             "SELLER_USER_ID": 22,
 *             "SELLER_USER_IPv4": 2097057137,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_TIME": "2022-12-31T08:14:23.000Z",
 *             "TAG": "",
 *             "ADDRESS": " 1",
 *             "LATITUDE": "37.541",
 *             "LONGITUDE": "126.986",
 *             "LOCATION": {
 *                 "type": "Point",
 *                 "coordinates": [
 *                     126.986,
 *                     37.541
 *                 ]
 *             },
 *             "UPDATE_USER_ID": 22,
 *             "UPDATE_USER_IPv4": 2097057137,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2023-01-03T13:07:04.000Z",
 *             "TRADE_STATUS": 0,
 *             "TRADE_TIME": "2022-12-31T08:14:23.000Z",
 *             "BUYER_USER_ID": null,
 *             "BUYER_USER_IPv4": null,
 *             "BUYER_USER_IPv6": null,
 *             "DELETE_TF": false,
 *             "QUANTITY": "123123개",
 *             "CHAT_TF": true
 *         },
 *         "BUYER": {
 *             "USER_ID": 23,
 *             "TALKPLUS_USERNAME": "차가운염소4146",
 *             "TALKPLUS_PROFILE_IMAGE_URL": ""
 *         }
 *     },
 *     {
 *         "CHANNEL_ID": 17,
 *         "TALKPLUS_CHANNEL_ID": "63b57ee81cbf20000100178e",
 *         "PRODUCT_ID": 61,
 *         "NAME": "ewwer",
 *         "BUYER_ID": "tttruck22",
 *         "TYPE": "private",
 *         "IMAGE_URL": "https://cdn.tttruck.co.kr/product/image/1672474463470_banner.jpg",
 *         "MAX_MEMBER_COUNT": 2,
 *         "STATUS": 0,
 *         "SELLER_ID": "tttruck22",
 *         "LASTCHAT_TIME": "2023-01-04T13:28:08.000Z",
 *         "PRODUCT": {
 *             "PRODUCT_ID": 61,
 *             "SUBJECT": "ewwer",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 123123123,
 *             "PRODUCT_SIZE": "123123",
 *             "PRODUCT_WEIGHT": 300000,
 *             "CONTENTS": "213123123123",
 *             "SELLER_USER_ID": 22,
 *             "SELLER_USER_IPv4": 2097057137,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_TIME": "2022-12-31T08:14:23.000Z",
 *             "TAG": "",
 *             "ADDRESS": " 1",
 *             "LATITUDE": "37.541",
 *             "LONGITUDE": "126.986",
 *             "LOCATION": {
 *                 "type": "Point",
 *                 "coordinates": [
 *                     126.986,
 *                     37.541
 *                 ]
 *             },
 *             "UPDATE_USER_ID": 22,
 *             "UPDATE_USER_IPv4": 2097057137,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2023-01-03T13:07:04.000Z",
 *             "TRADE_STATUS": 0,
 *             "TRADE_TIME": "2022-12-31T08:14:23.000Z",
 *             "BUYER_USER_ID": null,
 *             "BUYER_USER_IPv4": null,
 *             "BUYER_USER_IPv6": null,
 *             "DELETE_TF": false,
 *             "QUANTITY": "123123개",
 *             "CHAT_TF": true
 *         },
 *         "BUYER": {
 *             "USER_ID": 22,
 *             "TALKPLUS_USERNAME": "얌이아빠",
 *             "TALKPLUS_PROFILE_IMAGE_URL": "https://cdn.tttruck.co.kr/profile/1672837842224_Frame 4288.png"
 *         }
 *     }
 * ]
 */
async function getChannelsByProductId(req: IReq, res: IRes) {
  const user = res.locals.user;
  const prodId = req.params.id;
  const result = await chatService.getChannelsByProductId(user, Number(prodId));
  res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {get} /chat/talkplus/channel/:id Get one channel by channel ID
 * @apiName GetChannelById
 * @apiGroup TalkPlus
 * @apiPermission normalUser
 * @apiDeprecated Don't use.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "CHANNEL_ID": 1,
 *     "TALKPLUS_CHANNEL_ID": "63b1dacabd470d0001002d61",
 *     "PRODUCT_ID": 61,
 *     "NAME": "ewwer",
 *     "OWNER_ID": "tttruck21",
 *     "TYPE": "private",
 *     "IMAGE_URL": "",
 *     "MAX_MEMBER_COUNT": 2,
 *     "STATUS": 0,
 *     "SELLER_ID": "tttruck22",
 *     "PRODUCT": {
 *         "PRODUCT_ID": 61,
 *         "SUBJECT": "ewwer",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 123123123,
 *         "PRODUCT_SIZE": "123123",
 *         "PRODUCT_WEIGHT": 300000,
 *         "CONTENTS": "213123123123",
 *         "SELLER_USER_ID": 22,
 *         "SELLER_USER_IPv4": 2097057137,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-31T08:14:23.000Z",
 *         "TAG": "",
 *         "ADDRESS": " 1",
 *         "LATITUDE": "37.541",
 *         "LONGITUDE": "126.986",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 126.986,
 *                 37.541
 *             ]
 *         },
 *         "UPDATE_USER_ID": 22,
 *         "UPDATE_USER_IPv4": 2097057137,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-31T08:14:23.000Z",
 *         "TRADE_STATUS": 0,
 *         "TRADE_TIME": "2022-12-31T08:14:23.000Z",
 *         "BUYER_USER_ID": null,
 *         "BUYER_USER_IPv4": null,
 *         "BUYER_USER_IPv6": null,
 *         "DELETE_TF": false,
 *         "QUANTITY": "123123개"
 *     }
 * }
 */
async function getChannelById(req: IReq, res: IRes) {
  const user = res.locals.user;
  const channelId = req.params.id;
  const result = await chatService.getChannelWithProductById(channelId);
  res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {get} /chat/talkplus/channel/all Get all channels by User ID
 * @apiName GetUserChannel
 * @apiGroup TalkPlus
 * @apiPermission normalUser
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "channels": [
 *         {
 *             "id": "63b1dacabd470d0001002d61",
 *             "name": "ewwer",
 *             "imageUrl": "",
 *             "data": {},
 *             "ownerId": "tttruck21",
 *             "type": "private",
 *             "category": "",
 *             "subcategory": "",
 *             "privateTag": "",
 *             "invitationCode": "",
 *             "isFrozen": false,
 *             "memberCount": 2,
 *             "maxMemberCount": 2,
 *             "hideMessagesBeforeJoin": false,
 *             "members": [
 *                 {
 *                     "id": "tttruck21",
 *                     "username": "너그러운북극곰9393",
 *                     "profileImageUrl": "",
 *                     "data": {},
 *                     "updatedAt": 1672303062131,
 *                     "createdAt": 1672303062131,
 *                     "lastReadAt": 0,
 *                     "lastSentAt": 0
 *                 },
 *                 {
 *                     "id": "tttruck22",
 *                     "username": "엄청난북극곰",
 *                     "profileImageUrl": "https://cdn.tttruck.co.kr/profile/1672560597190_banner.png",
 *                     "data": {},
 *                     "updatedAt": 1672560597301,
 *                     "createdAt": 1672310099366,
 *                     "lastReadAt": 0,
 *                     "lastSentAt": 0
 *                 }
 *             ],
 *             "bannedUsers": [],
 *             "lastSentAt": 1672600332171,
 *             "updatedAt": 1672600266568,
 *             "createdAt": 1672600266567,
 *             "mutedUsers": [],
 *             "pushNotificationDisabled": false,
 *             "pushNotificationSoundAOS": "",
 *             "pushNotificationSoundIOS": "",
 *             "privateData": {},
 *             "unreadCount": 1,
 *             "lastReadAt": 0,
 *             "lastMessage": {
 *                 "id": "63b1db0c81e25f00010013ab",
 *                 "channelId": "63b1dacabd470d0001002d61",
 *                 "userId": "639f31a7b2eed40001000d5c",
 *                 "username": "Admin",
 *                 "profileImageUrl": "",
 *                 "type": "admin",
 *                 "text": "관리자 테스트 메시지 입니다.",
 *                 "data": {},
 *                 "fileUrl": "",
 *                 "mentions": [],
 *                 "translations": {},
 *                 "parentMessage": {},
 *                 "reactions": {},
 *                 "ownReactions": [],
 *                 "createdAt": 1672600332171
 *             }
 *         }
 *     ],
 *     "hasNext": false
 * }
 */
async function getUserChannel(req: IReq, res: IRes) {
  const user = res.locals.user;
  const result = await chatService.getUserChannel(user);
  res.status(HttpStatusCodes.OK).json(result).end();
}
/**
 * @api {post} /chat/talkplus/message/add SendMessage
 * @apiName SendMessage
 * @apiGroup TalkPlus
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "text": "안녕하세요",
 *       "channelId": "63b1dacabd470d0001002d61"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "MESSAGE_ID": 2,
 *     "TALKPLUS_CHANNEL_ID": "63b1dacabd470d0001002d61",
 *     "SEND_USER_TALKPLUS_ID": "tttruck21",
 *     "SEND_USER_ID": 21,
 *     "TEXT": "안녕하세요"
 * }
 *
 */
async function sendMessage(req: IReq<{text:string, channelId:string}>, res:IRes){
  const user = res.locals.user;
  const {text, channelId} = req.body;
  const result = await chatService.sendMessage(user, text, channelId);
  res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {post} /chat/talkplus/channel/add 채팅 채널 생성
 * @apiName AddTalkplusChannel
 * @apiGroup TalkPlus
 * @apiPermission normalUser
 *
 * @apiBody {number} productId 상품 USER_ID
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "MAX_MEMBER_COUNT": 2,
 *     "STATUS": 0,
 *     "CHANNEL_ID": 1,
 *     "PRODUCT_ID": 61,
 *     "NAME": "ewwer",
 *     "OWNER_ID": "tttruck21",
 *     "TYPE": "private",
 *     "IMAGE_URL": "",
 *     "SELLER_ID": "tttruck22",
 *     "TALKPLUS_CHANNEL_ID": "63b1dacabd470d0001002d61"
 * }
 *
 */

async function createChannel(req: IReq<{ productId: number }>, res: IRes) {
  const {productId} = req.body;
  const buyerId = res.locals.user.USER_ID;
  const talkPlusChannel = await chatService.createUserChannel(productId, buyerId);
  res.status(HttpStatusCodes.OK).json(talkPlusChannel).end();
}

// **** Export default **** //

export default {
  paths,
  createChannel,
  getUserChannel,
  getChannelById,
  getChannelsByProductId,
  sendMessage,
} as const;
