/**
 * Middleware to verify user logged in and is an an admin.
 */

import {Request, Response, NextFunction} from 'express';
import {JwtPayload} from 'jsonwebtoken';

import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import EnvVars from '@src/declarations/major/EnvVars';
import jwtUtil from '@src/util/jwt-util';
import {IUser, UserRoles} from '@src/models/User';
import {tt_user, tt_userAttributes} from "@src/models/tt_user";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {IReq} from "@src/routes/shared/types";
import logger from "jet-logger";


// **** Variables **** //

const jwtNotPresentErr =
    'JWT not present in header ( Authorization - Bearer Token )',
  userUnauthErr = 'User not authorized to perform this action';


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

  const userToken = req.headers['authorization'];
  if (!userToken) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: jwtNotPresentErr});
  }
  const clientData = await tt_user.findAll({where : {ACCESSTOKEN : userToken}});
  if (
    clientData &&
    clientData[0].GROUP === tt_user_group.ADMIN
  ) {
    res.locals.sessionUser = clientData;
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
)
{
  const userToken = req.headers['authorization'];
  if (!userToken) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: jwtNotPresentErr});
  }
  const clientData = await tt_user.findAll({where : {ACCESSTOKEN : userToken}});
  if (
    clientData &&
    (clientData[0].GROUP >= tt_user_group.NORMAL)
  ) {
    res.locals.user = clientData;
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
  const clientData = await tt_user.findAll({where : {ACCESSTOKEN : userToken}});
  logger.info(clientData);
  if (
    clientData && clientData.length > 0 &&
    (clientData[0].GROUP >= tt_user_group.NORMAL) &&
    clientData[0].PHONE_AUTH_TF === 'T'
  ) {
    res.locals.user = clientData;
    return next();
    // Return an unauth error if user is not an admin
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({error: userUnauthErr});
  }
}

