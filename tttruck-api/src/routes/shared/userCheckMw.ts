/**
 * Middleware to verify user logged in and is an an admin.
 */

import {NextFunction, Request, Response} from 'express';
import {JwtPayload} from 'jsonwebtoken';

import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IUser} from '@src/models/User';
import {tt_user} from "@src/models/tt_user";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import logger from "jet-logger";
import {tt_access_log, tt_user_talkplus} from "@src/models/init-models";
import {getClientIP} from "@src/util/ip-util";


// **** Variables **** //

const jwtNotPresentErr =
    'JWT not present in header ( Authorization - Bearer Token )',
  userUnauthErr = 'User not authorized to perform this action',
  userLeftErr = 'The user signed out.';


// **** Types **** //

export interface ISessionUser extends JwtPayload {
  id: number;
  email: string;
  name: string;
  role: IUser['role'];
}


// **** Functions **** //

/**
 * See note at beginning of file.
 */
export async function adminMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {

  let userToken = req.headers['authorization'];
  if (!userToken) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: jwtNotPresentErr});
  }
  userToken = userToken.split(" ")[1];
  const clientData = await tt_user.findAll({where: {ACCESSTOKEN: userToken}});
  logger.info(JSON.stringify(clientData));
  if (
    clientData &&
    clientData.length > 0 &&
    clientData[0].GROUP === tt_user_group.ADMIN
  ) {
    res.locals.user = clientData[0];
    return next();
    // Return an unauth error if user is not an admin
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: userUnauthErr});
  }
}

export async function noPhoneUserMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userToken = req.headers['authorization'];
  if (!userToken) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: jwtNotPresentErr});
  }
  const clientData = await tt_user.findAll({where: {ACCESSTOKEN: userToken}});
  if (
    clientData &&
    clientData.length > 0 &&
    (clientData[0].GROUP >= tt_user_group.NORMAL)
  ) {
    res.locals.user = clientData[0];
    return next();
    // Return an unauth error if user is not an admin
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: userUnauthErr});
  }
}

export async function normalUserMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {

  let userToken = req.headers['authorization'];
  if (!userToken) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: jwtNotPresentErr});
  }
  userToken = userToken.split(" ")[1];
  const clientData = await tt_user.findAll(
    {
      where: {ACCESSTOKEN: userToken},
      include: [{model: tt_user_talkplus, as: "tt_user_talkplu"}],
    });
  if (clientData && clientData.length > 0) {
    if (clientData[0].LEAVE_TF) {
      return res
        .status(HttpStatusCodes.FORBIDDEN)
        .json({error: userLeftErr});
    }
    if ((clientData[0].GROUP >= tt_user_group.NORMAL) &&
      clientData[0].PHONE_AUTH_TF
    ) {
      res.locals.user = clientData[0];
      return next();
      // Return an unauth error if user is not an admin
    }
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: userUnauthErr});
  }
}

export async function accessLogMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.method;
  req.originalUrl;
  const accessLog = tt_access_log.build({
    ACCESS_IP: "",
    ACCESS_PATH: req.method+"#"+req.originalUrl,
    IPv4: getClientIP(req),
    IPv6: undefined,
    USER_ID: 0,
  });
  let userToken = req.headers['authorization'];
  if (!userToken) {
    await accessLog.save();
    return next();
  }
  userToken = userToken.split(" ")[1];
  const clientData = await tt_user.findAll(
    {
      where: {ACCESSTOKEN: userToken},
      include: [{model: tt_user_talkplus, as: "tt_user_talkplu"}],
    });

  if (clientData && clientData.length > 0) {
    accessLog.USER_ID = clientData[0].USER_ID;
    await accessLog.save();
  }
  return next();
}

