import {RouteError} from "@src/declarations/classes";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";

export type SMSParams = {
  type: string, //"(SMS | LMS | MMS)",
  contentType: string, //"(COMM | AD)",
  from: string, //"발신번호",
  subject: string, //"string",
  content: string, //"string",
}

export async function sendSMS(param: SMSParams) {
  return fetch("https://sens.apigw.ntruss.com/sms/v2/services/"
    + "ncp:sms:kr:298309635533:tttruck"
    + "/messages", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-ncp-apigw-timestamp": "{Timestamp}",
      "x-ncp-iam-access-key": "{Sub Account Access Key}",
      "x-ncp-apigw-signature-v2": "{API Gateway Signature}",
    },
    body: JSON.stringify(param),
  }).then()
    .catch(() => {
      throw new RouteError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        "Naver cloud API connection failed",
      );
    });
}

export async function sendPhoneAuthSMS(phone: string, code: string) {
  const params: SMSParams = {
    type:"SMS",
    contentType: "COMM", //"(COMM | AD)",
    from: "", //"발신번호",
    subject: "땡땡트럭", //"string",
    content: "본인확인 인증번호["+code+"]를 입력해주세요.", //"string",
  };
  return sendSMS(params);
}