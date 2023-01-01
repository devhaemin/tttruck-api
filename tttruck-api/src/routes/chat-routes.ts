import {IReq, IRes} from './shared/types';
import chatService from "@src/services/chat-service";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";

// **** Variables **** //

// Paths
const paths = {
  basePath: '/chat',
  getUserChannel: '/talkplus/channel/all',
  createChannel: '/talkplus/channel/add',
} as const;

/**
 * @api {get} /chat/talkplus/channel/all Get all User chat channels.
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
 * @api {post} /chat/talkplus/channel/add 채팅 채널 생성
 * @apiName AddTalkplusChannel
 * @apiGroup Talkplus
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

async function createChannel(req: IReq<{ productId: number}>, res: IRes) {
  const {productId} = req.body;
  const ownerId = res.locals.user.USER_ID;
  const talkPlusChannel = await chatService.createUserChannel(productId, ownerId);
  res.status(HttpStatusCodes.OK).json(talkPlusChannel).end();
}

// **** Export default **** //

export default {
  paths,
  createChannel,
  getUserChannel,
} as const;
