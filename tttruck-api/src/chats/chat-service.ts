import {tt_user} from "@src/models/tt_user";
import {RouteError} from "@src/declarations/classes";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";
import {tt_user_talkplus} from "@src/models/init-models";
import logger from "jet-logger";
import authService from "@src/services/auth-service";

const baseUrl = "https://api.talkplus.io/v1.4/";
const apiKey = process.env.TALKPLUS_API_KEY?process.env.TALKPLUS_API_KEY:"";
const appId = process.env.TALKPLUS_APP_ID?process.env.TALKPLUS_APP_ID:"";

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}
interface TalkPlusResponse {
  "user": {
    "id": string,
    "username": string,
    "profileImageUrl": string,//cnd.test.com/123.jpg",
    "disablePushNotification": boolean,
    "data": {key:string},
    "updatedAt": number,
    "createdAt": number
  },
  "loginToken": string,
  "error": boolean,
  "code": string,
  "message": string
}
async function createChatUser(user:tt_user):Promise<tt_user_talkplus>{
  const url = baseUrl + "api/users/create";

  const params = {
    userId : "tttruck"+String(user.USER_ID),
    password : user.PASSWORD,
    username : user.NICKNAME,
    //profileImageUrl : user.PROFILE_IMAGE_URL
  };
  const result: HttpResponse<TalkPlusResponse> = await fetch(
    url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "api-key":apiKey,
        "app-id":appId,
      },
      body: JSON.stringify(params),
    });
  const talkPlusResult = await result.json() as TalkPlusResponse;
  logger.info(JSON.stringify(talkPlusResult));
  if(talkPlusResult.error){
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      talkPlusResult.message,
    );
  }
  return await tt_user_talkplus.create(
    {
      USER_ID : user.USER_ID,
      TALKPLUS_ID : talkPlusResult.user.id,
      TALKPLUS_PASSWORD : user.PASSWORD,
      TALKPLUS_USERNAME : talkPlusResult.user.username,
      TALKPLUS_PROFILE_IMAGE_URL : talkPlusResult.user.profileImageUrl,
      TALKPLUS_LOGIN_TOKEN : talkPlusResult.loginToken,
    });
}

async function updateUserProfile(user:tt_user):Promise<tt_user>{
  const cdnBaseUrl = process.env.CDN_BASE_URL? process.env.CDN_BASE_URL : "";
  const url = baseUrl + "api/users/"+String(user.tt_user_talkplu.TALKPLUS_ID);
  const params = {
    username : user.NICKNAME,
    profileImageUrl : cdnBaseUrl+user.PROFILE_IMAGE,
  };
  const result: HttpResponse<TalkPlusResponse> = await fetch(
    url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "api-key":apiKey,
        "app-id":appId,
      },
      body: JSON.stringify(params),
    });
  const talkPlusResult = await result.json() as TalkPlusResponse;
  if(talkPlusResult.error){
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      talkPlusResult.message,
    );
  }
  logger.info(JSON.stringify(talkPlusResult));
  await tt_user_talkplus.update(
    {
      TALKPLUS_USERNAME : talkPlusResult.user.username,
      TALKPLUS_PROFILE_IMAGE_URL : talkPlusResult.user.profileImageUrl,
    },
    {where:{USER_ID:user.USER_ID}});
  return await authService.getUserWithTalkplus(user.USER_ID);
}

async function loginTalkplus(userId:number):Promise<tt_user_talkplus>{
  const url = baseUrl + "api/users/login";
  const userTalkplus = await tt_user_talkplus.findByPk(userId);
  if(!userTalkplus){
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      "User not authorized",
    );
  }
  const params = {
    userId : userTalkplus.TALKPLUS_ID,
    password : userTalkplus.TALKPLUS_PASSWORD,
  };
  const result: HttpResponse<TalkPlusResponse> = await fetch(
    url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "api-key":apiKey,
        "app-id":appId,
      },
      body: JSON.stringify(params),
    });
  const talkPlusResult = await result.json() as TalkPlusResponse;
  if(talkPlusResult.error){
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      talkPlusResult.message,
    );
  }
  return await userTalkplus.update({
    TALKPLUS_LOGIN_TOKEN:talkPlusResult.loginToken,
    TALKPLUS_USERNAME:talkPlusResult.user.username,
    TALKPLUS_ID:talkPlusResult.user.id,
    TALKPLUS_PROFILE_IMAGE_URL:talkPlusResult.user.profileImageUrl,
  });
}

export default {
  createChatUser,
  updateUserProfile,
  loginTalkplus,
}