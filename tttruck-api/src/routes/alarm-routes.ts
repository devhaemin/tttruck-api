import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IReqQuery, IRes} from "@src/routes/shared/types";
import tradeService from "@src/services/trade-service";
import logger from "jet-logger";
import {sendPushMessage} from "@src/util/push-util";
import {tt_alarm} from "@src/models/init-models";



// **** Variables **** //

// Paths
const paths = {
  basePath: '/alarm',
  getAlarm: '/all',
  sendAlarm: '/send',
  registerFCMToken: '/fcm/register',
} as const;


// **** Functions **** //
/**
 * @api {get} /alarm/all Get All Alarms
 * @apiName GetAlarm
 * @apiGroup Alarm
 * @apiPermission normalUser
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
[
    {
        "ALARM_ID": 7,
        "USER_ID": 26,
        "FCM_MSG_ID": "",
        "SUBJECT": "Test1",
        "CONTENTS": null,
        "REDIRECT_URL": "/alarm",
        "VIEW_TF": true,
        "IMAGEURL": null,
        "TIME": "2023-04-25T21:09:03.000Z"
    },
    {
        "ALARM_ID": 10,
        "USER_ID": 26,
        "FCM_MSG_ID": "projects/tttruck-android/messages/0:1682458101865475%a0ed25c4f9fd7ecd",
        "SUBJECT": "Test1",
        "CONTENTS": "Test Content",
        "REDIRECT_URL": "/alarm",
        "VIEW_TF": true,
        "IMAGEURL": null,
        "TIME": "2023-04-25T21:28:21.000Z"
    }
]
 *
 * @apiError tradeNotFound The Trade log of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TradeNotFound"
 *     }
 */
async function getAlarm(req: IReq, res: IRes) {
  const user = res.locals.user;

  const alarms = await tt_alarm.findAll({
    where:{
      USER_ID:user.USER_ID,
    },
  });
  return res.status(HttpStatusCodes.OK).send(alarms);
}

/**
 * @api {post} /alarm/send Send Push Message
 * @apiName SendAlarm
 * @apiGroup Alarm
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "userId":26,
 *     "title":"Test1",
 *     "content":"Test Content",
 *     "redirectUrl": "/alarm"
 * }
 * @apiPermission normalUser
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "VIEW_TF": true,
    "TIME": {
        "fn": "current_timestamp",
        "args": []
    },
    "ALARM_ID": 11,
    "USER_ID": 26,
    "SUBJECT": "postmanTest",
    "CONTENTS": "Test Content",
    "REDIRECT_URL": "/alarm",
    "FCM_MSG_ID": "projects/tttruck-android/messages/0:1682473874247847%a0ed25c4f9fd7ecd"
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
async function sendAlarm(req: IReq<{ userId:number, title: string, content: string, redirectUrl: string }>, res: IRes) {
  const {userId, title, content, redirectUrl} = req.body;
  logger.info(req.body);
  const sendPush = await sendPushMessage(userId,title,content,redirectUrl );
  return res.status(HttpStatusCodes.OK).send(sendPush);
}

/**
 * @api {post} /alarm/fcm/register Register FCM Push Token
 * @apiName RegisterFCMToken
 * @apiGroup Alarm
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "fcmToken":"~~~"
 * }
 * @apiPermission normalUser
 *
 * @apiSuccess {String} Nothing
 * @apiSuccessExample Success-Response:
 * {
    "USER_ID": 26,
    "PHONE": "01098810664",
    "PASSWORD": "$2b$12$iT836fBhmSUfydP4MN1Zye7nr4XELmWpG7K1NOHZbmKKDKxpGFjyC",
    "NICKNAME": "정해민",
    "NAME": null,
    "ACCESSTOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkaVQ4MzZmQmhtU1VmeWRQNE1OMVp5ZTducjRYRUxtV3BHN0sxTk9IWmJtS0tES3hwR0ZqeUMiLCJpYXQiOjE2ODIyNjg1NTgsImV4cCI6MTY4MjUyNzc1OH0.i5ntfG-3_PVEnn18Z-oOa5lh8xZUHKhavNVVT10NpnM",
    "FCMTOKEN": "~~~",
    "BUYING_SAVINGS": 702640279000,
    "SELLING_SAVINGS": 0,
    "WASTE_SAVINGS": 702640279000,
    "GREENGAS_SAVINGS": 9836963906000,
    "COST_SAVINGS": 351320139500000,
    "GROUP": 99,
    "PROFILE_IMAGE": "profile/1673239954601_img-ObBaphDQMth1gVfJIwiS0HUh.png",
    "INTERIOR_COMPANY_TF": false,
    "INTERIOR_COMPANY_NAME": null,
    "BIRTHDAY": null,
    "GENDER": null,
    "ZIP_CODE": null,
    "ADDRESS": null,
    "DETAIL_ADDRESS": null,
    "JOIN_STATE": null,
    "RESTING_TF": false,
    "LEAVE_TF": false,
    "PHONE_AUTH_CODE": "144312",
    "PHONE_AUTH_DATE": null,
    "PHONE_AUTH_SUCCEED_DATE": null,
    "PHONE_AUTH_TF": true,
    "REG_TIME": "2023-01-05T02:24:32.000Z",
    "UPD_TIME": "2023-04-25T20:49:48.000Z",
    "JOIN_TIME": "2023-01-05T02:24:32.000Z",
    "JOIN_PERMIT_USER_ID": null,
    "JOIN_AGREE": "11100",
    "AGREE_UPD_TIME": "2023-02-27T07:35:30.000Z",
    "ACCESS_TIME": "2023-04-25T20:49:48.000Z",
    "tt_user_talkplu": {
        "USER_ID": 26,
        "TALKPLUS_ID": "tttruck26",
        "TALKPLUS_PASSWORD": "$2b$12$7h0IYZe8H5JtXgiQLN2NV.yYTbRY8cF9C1qlQ9dLOq8P3Z1cD4QH2",
        "TALKPLUS_USERNAME": "정해민",
        "TALKPLUS_PROFILE_IMAGE_URL": "https://cdn.tttruck.co.kr/profile/1673239954601_img-ObBaphDQMth1gVfJIwiS0HUh.png",
        "TALKPLUS_LOGIN_TOKEN": "$2a$06$F2tR7cWX3nhVMxQ0NhiRI.XqoO4IPhqzSITpU8eYTICBEsKP7Rnbi",
        "LEAVE_TF": false
    }
}
 * 
 *
 * @apiError tradeNotFound The Trade log of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TradeNotFound"
 *     }
 */
async function registerFCMToken(req: IReq<{ fcmToken:string }>, res: IRes) {
  const user = res.locals.user;
  user.FCMTOKEN = req.body.fcmToken;
  const newUser = await user.save();
  return res.status(HttpStatusCodes.OK).send(newUser); //todo 보안 조치 취하기
}

// **** Export default **** //

export default {
  paths,
  getAlarm,
  sendAlarm,
  registerFCMToken,
} as const;
