import {RouteError} from "@src/declarations/classes";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";
import logger from "jet-logger";
import * as CryptoJS from 'crypto-js';

const nCloudSMSBody ="{" +
  "    \"type\":\"(SMS | LMS | MMS)\"," +
  "    \"contentType\":\"(COMM | AD)\"," +
  "    \"countryCode\":\"string\"," +
  "    \"from\":\"string\"," +
  "    \"subject\":\"string\"," +
  "    \"content\":\"string\"," +
  "    \"messages\":[" +
  "        {" +
  "            \"to\":\"string\"," +
  "            \"subject\":\"string\"," +
  "            \"content\":\"string\"" +
  "        }" +
  "    ]," +
  "    \"files\":[" +
  "        {" +
  "            \"name\":\"string\"," +
  "            \"body\":\"string\"" +
  "        }" +
  "    ]," +
  "    \"reserveTime\": \"yyyy-MM-dd HH:mm\"," +
  "    \"reserveTimeZone\": \"string\"," +
  "    \"scheduleCode\": \"string\"" +
  "}";
export type SMSParams = {
  type: string, //"(SMS | LMS | MMS)",
  contentType: string, //"(COMM | AD)",
  from: string, //"발신번호",
  subject: string, //"string",
  content: string, //"string",
  messages: [
    {
      to: string,
      subject: string,
      content: string,
    },
  ]
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface NCloudResponse {
  requestId: string,
  requestTime: string,
  statusCode: string,
  statusName: string,
  "error": {
    "errorCode": string,
    "message": string,
    "details": string,
  }
}

function makeSignature(method: string, uri: string, timestamp: string) {
  const space = " ";				// one space
  const newLine = "\n";				// new line		// current timestamp (epoch)
  const accessKey = process.env.NCLOUD_ACCESS_KEY_ID ? process.env.NCLOUD_ACCESS_KEY_ID : "";			// access key id (from portal or Sub Account)
  const secretKey = process.env.NCLOUD_SECRET_KEY ? process.env.NCLOUD_SECRET_KEY : "";			// secret key (from portal or Sub Account)
  logger.info(secretKey);
  logger.info(nCloudSMSBody);
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(uri);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);
  //hmac.update(newLine);
  //hmac.update(nCloudSMSBody);
  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}

export async function sendSMS(param: SMSParams): Promise<HttpResponse<NCloudResponse>> {
  const serviceId = process.env.SMS_NCLOUD_SERVICE_ID;
  if (!serviceId) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Naver cloud serviceID is not detected.",
    );
  }
  const uri = "/sms/v2/services/"+ serviceId.toString()+ "/messages";
  const url = "https://sens.apigw.ntruss.com"+uri;
  const timestamp = Date.now().toString();
  const result: HttpResponse<NCloudResponse> = await fetch(
    url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-iam-access-key": process.env.NCLOUD_ACCESS_KEY_ID ? process.env.NCLOUD_ACCESS_KEY_ID : "",
        "x-ncp-apigw-signature-v2": makeSignature("POST", uri, timestamp),
      },
      body: JSON.stringify(param),
    });
  result.parsedBody = await result.json() as NCloudResponse;
  logger.info(JSON.stringify(result));
  return result;
}

export async function sendPhoneAuthSMS(code: string, phone: string) {
  if (!process.env.SMS_FROM_PHONE_NUM) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "FROM Phone Information is not detected",
    );
  }
  const params: SMSParams = {
    type: "SMS",
    contentType: "COMM", //"(COMM | AD)",
    from: process.env.SMS_FROM_PHONE_NUM, //"발신번호",
    subject: "땡땡트럭", //"string",
    content: "본인확인 인증번호[" + code + "]를 입력해주세요.", //"string",
    messages: [
      {
        to: phone,
        subject: "땡땡트럭",
        content: "본인확인 인증번호[" + code + "]를 입력해주세요.",
      },
    ],
  };
  return sendSMS(params);
}