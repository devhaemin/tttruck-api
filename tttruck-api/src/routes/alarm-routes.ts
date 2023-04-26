import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from "@src/routes/shared/types";
import logger from "jet-logger";
import {sendPushMessage} from "@src/util/push-util";
import {tt_alarm} from "@src/models/init-models";
import {Op, Sequelize} from "sequelize";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/alarm',
  getAlarm: '/all',
  sendAlarm: '/send',
  getNewAlarm: '/new',
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
 * {
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
async function getAlarm(req: IReq, res: IRes) {
  const user = res.locals.user;

  const alarms = await tt_alarm.findAll({
    where: {
      USER_ID: user.USER_ID,
    },
    order: [['TIME', 'DESC']],
  });
  const alarmIds = alarms.map((alarm) => alarm.ALARM_ID);
  await tt_alarm.update(
    { VIEW_TF: 1 }, // The new values
    {
      where: {
        ALARM_ID: {
          [Op.in]: alarmIds, // Use the Op.in operator to match the primary keys
        },
      },
    },
  );
  return res.status(HttpStatusCodes.OK).send(alarms);
}

/**
 * @api {get} /alarm/new Get All haven't seen Alarms
 * @apiName GetNewAlarm
 * @apiGroup Alarm
 * @apiPermission normalUser
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
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
async function getNewAlarm(req: IReq, res: IRes) {
  const user = res.locals.user;

  const alarms = await tt_alarm.findAll({
    where: {
      USER_ID: user.USER_ID,
      VIEW_TF: false,
    },
    order: [['ALARM_ID', 'DESC']],
    attributes: {include:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'NEW_COUNT']]},
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
 * {
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
async function sendAlarm(req: IReq<{ userId: number, title: string, content: string, redirectUrl: string }>, res: IRes) {
  const {userId, title, content, redirectUrl} = req.body;
  logger.info(req.body);
  const sendPush = await sendPushMessage(userId, title, content, redirectUrl);
  return res.status(HttpStatusCodes.OK).send(sendPush);
}

/**
 * @api {post} /alarm/fcm/register Register FCM Push Token
 * @apiName SendAlarm
 * @apiGroup Alarm
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "fcmToken":"~~~"
 * }
 * @apiPermission normalUser
 *
 * @apiSuccess {String} Nothing
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
async function registerFCMToken(req: IReq<{ fcmToken: string }>, res: IRes) {
  const user = res.locals.user;
  user.FCMTOKEN = req.body.fcmToken;
  const newUser = await user.save();
  return res.status(HttpStatusCodes.OK).send(newUser); //todo 보안 조치 취하기
}

// **** Export default **** //

export default {
  paths,
  getAlarm,
  getNewAlarm,
  sendAlarm,
  registerFCMToken,
} as const;
