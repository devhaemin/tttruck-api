import {tt_user} from "@src/models/tt_user";
import {RouteError} from "@src/declarations/classes";
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes";
import {
  tt_product,
  tt_product_image,
  tt_talkplus_channel,
  tt_user_talkplus,
} from "@src/models/init-models";
import logger from "jet-logger";
import authService from "@src/services/auth-service";
import {userNotFoundErr} from "@src/services/user-service";
import {prodNotFoundErr} from "@src/services/product-service";

const baseUrl = "https://api.talkplus.io/v1.4/";
const apiKey = process.env.TALKPLUS_API_KEY ? process.env.TALKPLUS_API_KEY : "";
const appId = process.env.TALKPLUS_APP_ID ? process.env.TALKPLUS_APP_ID : "";
const cdnBaseUrl: string = process.env.CDN_BASE_URL ? process.env.CDN_BASE_URL : "";

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface TalkPlusUserResponse {
  "user": {
    "id": string,
    "username": string,
    "profileImageUrl": string,//cnd.test.com/123.jpg",
    "disablePushNotification": boolean,
    "data": { key: string },
    "updatedAt": number,
    "createdAt": number
  },
  "loginToken": string,
  "error": boolean,
  "code": string,
  "message": string
}

interface TalkPlusChannelResponse {
  "channel": {
    "id": string,
    "name": string,
    "ownerId": string,
    "type": string,
    "imageUrl": string,
    "invitationCode": string,
    "isFrozen": boolean,
    "hideMessagesBeforeJoin": boolean,
    "category": string,
    "subcategory": string,
    "privateTag": string,
    "privateData": string,
    "memberCount": number,
    "maxMemberCount": number,
    "members": [
      {
        "id": string,
        "username": string,
        "profileImageUrl": string,
        "lastReadAt": number,
        "lastSentAt": number,
        "updatedAt": number,
        "createdAt": number,
      }],
    "mutedUsers": [],
    "bannedUsers": [],
    "updatedAt": number,
    "createdAt": number,
    "unreadCount": 1,
    "lastReadAt": number,
    "lastMessage": {
      "id": string,
      "channelId": string,
      "userId": string,
      "username": string,
      "profileImageUrl": string,
      "type": string,
      "text": string,
      "createdAt": number,
    }
  }
  "error": boolean,
  "code": string,
  "message": string,
}
async function getChannelsByProductId(productlId: number): Promise<tt_talkplus_channel[]> {
  const channelsWithProduct = await tt_talkplus_channel.findAll({
    where:{PRODUCT_ID:productlId},
    include: [{model: tt_product, as: "PRODUCT"}],
  });
  if (!channelsWithProduct) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      "Channel not found",
    );
  }
  return channelsWithProduct;
}

async function getProductByChannelId(channelId: number): Promise<tt_talkplus_channel> {
  const channelWithProduct = await tt_talkplus_channel.findByPk(channelId, {
    include: [{model: tt_product, as: "PRODUCT"}],
  });
  if (!channelWithProduct) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      "Channel not found",
    );
  }
  return channelWithProduct;
}

async function getUserChannel(user: tt_user)
  : Promise<TalkPlusChannelResponse> {
  const url = baseUrl + "api/users/" + user.tt_user_talkplu.TALKPLUS_ID + "/channels";
  const result: HttpResponse<TalkPlusChannelResponse> = await fetch(
    url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "api-key": apiKey,
        "app-id": appId,
      },
    });
  const talkPlusResult = await result.json() as TalkPlusChannelResponse;
  logger.info(JSON.stringify(talkPlusResult));
  if (talkPlusResult.error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      talkPlusResult.message,
    );
  }
  return talkPlusResult;
}


async function createUserChannel(productId: number, ownerId: number)
  : Promise<tt_talkplus_channel> {
  const owner = await tt_user_talkplus.findByPk(ownerId);
  const product = await tt_product.findByPk(productId, {
    include: [{
      model: tt_product_image,
      as: "tt_product_images",
    }],
  });
  if (!product) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  if (!owner) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      userNotFoundErr,
    );
  }
  const seller = await tt_user_talkplus.findByPk(product.SELLER_USER_ID);
  if (!seller) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      userNotFoundErr,
    );
  }
  const url = baseUrl + "api/channels/create";
  const params = {
    name: product.SUBJECT,
    ownerId: owner.TALKPLUS_ID,
    type: "private",
    /*channelId: "",*/
    members: [owner.TALKPLUS_ID, seller.TALKPLUS_ID],
    imageUrl: product.tt_product_images && product.tt_product_images[0]
      ? cdnBaseUrl + product.tt_product_images[0].FILE_NAME : "",
    maxMemberCount: 2,
  };
  const result: HttpResponse<TalkPlusChannelResponse> = await fetch(
    url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "api-key": apiKey,
        "app-id": appId,
      },
      body: JSON.stringify(params),
    });
  const talkPlusResult = await result.json() as TalkPlusChannelResponse;
  logger.info(JSON.stringify(talkPlusResult));
  if (talkPlusResult.error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      talkPlusResult.message,
    );
  }
  return await tt_talkplus_channel.create(
    {
      PRODUCT_ID: productId,
      NAME: product.SUBJECT,
      OWNER_ID: owner.TALKPLUS_ID,
      TYPE: "private",
      IMAGE_URL: params.imageUrl,
      SELLER_ID: seller.TALKPLUS_ID,
      TALKPLUS_CHANNEL_ID: talkPlusResult.channel.id,
    });
}

/*
async function deleteUserChannel(){

}
*/

async function createChatUser(user: tt_user): Promise<tt_user_talkplus> {
  const url = baseUrl + "api/users/create";

  const params = {
    userId: "tttruck" + String(user.USER_ID),
    password: user.PASSWORD,
    username: user.NICKNAME,
    //profileImageUrl : user.PROFILE_IMAGE_URL
  };
  const result: HttpResponse<TalkPlusUserResponse> = await fetch(
    url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "api-key": apiKey,
        "app-id": appId,
      },
      body: JSON.stringify(params),
    });
  const talkPlusResult = await result.json() as TalkPlusUserResponse;
  logger.info(JSON.stringify(talkPlusResult));
  if (talkPlusResult.error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      talkPlusResult.message,
    );
  }
  return await tt_user_talkplus.create(
    {
      USER_ID: user.USER_ID,
      TALKPLUS_ID: talkPlusResult.user.id,
      TALKPLUS_PASSWORD: user.PASSWORD,
      TALKPLUS_USERNAME: talkPlusResult.user.username,
      TALKPLUS_PROFILE_IMAGE_URL: talkPlusResult.user.profileImageUrl,
      TALKPLUS_LOGIN_TOKEN: talkPlusResult.loginToken,
    });
}

async function updateUserProfile(user: tt_user): Promise<tt_user> {
  const profileImage = user.PROFILE_IMAGE ? user.PROFILE_IMAGE : "";
  const url = baseUrl + "api/users/" + String(user.tt_user_talkplu.TALKPLUS_ID);
  const params = {
    username: user.NICKNAME,
    profileImageUrl: cdnBaseUrl + profileImage,
  };
  const result: HttpResponse<TalkPlusUserResponse> = await fetch(
    url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "api-key": apiKey,
        "app-id": appId,
      },
      body: JSON.stringify(params),
    });
  const talkPlusResult = await result.json() as TalkPlusUserResponse;
  if (talkPlusResult.error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      talkPlusResult.message,
    );
  }
  logger.info(JSON.stringify(talkPlusResult));
  await tt_user_talkplus.update(
    {
      TALKPLUS_USERNAME: talkPlusResult.user.username,
      TALKPLUS_PROFILE_IMAGE_URL: talkPlusResult.user.profileImageUrl,
    },
    {where: {USER_ID: user.USER_ID}});
  return await authService.getUserWithTalkplus(user.USER_ID);
}

async function loginTalkplus(userId: number): Promise<tt_user_talkplus> {
  const url = baseUrl + "api/users/login";
  const userTalkplus = await tt_user_talkplus.findByPk(userId);
  if (!userTalkplus) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      "User not authorized",
    );
  }
  const params = {
    userId: userTalkplus.TALKPLUS_ID,
    password: userTalkplus.TALKPLUS_PASSWORD,
  };
  const result: HttpResponse<TalkPlusUserResponse> = await fetch(
    url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "api-key": apiKey,
        "app-id": appId,
      },
      body: JSON.stringify(params),
    });
  const talkPlusResult = await result.json() as TalkPlusUserResponse;
  if (talkPlusResult.error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      talkPlusResult.message,
    );
  }
  return await userTalkplus.update({
    TALKPLUS_LOGIN_TOKEN: talkPlusResult.loginToken,
    TALKPLUS_USERNAME: talkPlusResult.user.username,
    TALKPLUS_ID: talkPlusResult.user.id,
    TALKPLUS_PROFILE_IMAGE_URL: talkPlusResult.user.profileImageUrl,
  });
}

export default {
  createChatUser,
  updateUserProfile,
  loginTalkplus,
  createUserChannel,
  getUserChannel,
  getProductByChannelId,
  getChannelsByProductId,
};