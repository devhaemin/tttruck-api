import {tt_user} from "@src/models/tt_user";
import {RouteError} from "@src/declarations/classes";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";
import {userNotFoundErr} from "@src/services/user-service";
import {tt_alarm} from "@src/models/tt_alarm";
import firebase from "firebase-admin";

import serviceAccount
  from "@src/tttruck-android-firebase-adminsdk-n1mzw-ec2d931538.json";


firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as firebase.ServiceAccount),
});

export async function sendPushMessage(targetSeq: number,
  title: string, content: string, redirectUrl: string) {
  if (!targetSeq) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      "User ID Are not provided",
    );
  }
  const user = await tt_user.findByPk(targetSeq);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      userNotFoundErr,
    );
  }
  const fcm_target_token = user.FCMTOKEN;
  if (!fcm_target_token) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      "User's fcmToken is not valid.",
    );
  }

  const fcm_message = {
    data: {
      title: title,
      content: content,
      redirectUrl: redirectUrl,
    },
    token: fcm_target_token,
  };
  try{
    const fcmMessage = await firebase.messaging().send(fcm_message);
    const newAlarm = await tt_alarm.create(
      {
        USER_ID: targetSeq,
        SUBJECT: title,
        CONTENTS: content,
        REDIRECT_URL: redirectUrl,
        FCM_MSG_ID: fcmMessage,
      },
    );
    return newAlarm;
  }catch (e) {
    const newAlarm = await tt_alarm.create(
      {
        USER_ID: targetSeq,
        SUBJECT: title,
        CONTENTS: content,
        REDIRECT_URL: redirectUrl,
        FCM_MSG_ID: "WITHOUTFCM",
      },
    );
    return newAlarm;
  }
}