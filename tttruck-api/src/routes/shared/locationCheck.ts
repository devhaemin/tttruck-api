import {NextFunction} from 'express';
import {IReqQuery, IRes} from "@src/routes/shared/types";
import {Query} from "express-serve-static-core";
import logger from "jet-logger";

export interface UserLocation extends Query {
  longitude: string;
  latitude: string;
}

export function locationCheck(
  req: IReqQuery<UserLocation>,
  res: IRes,
  next: NextFunction,
) {
  const {longitude, latitude} = req.query;
  if (!longitude || !latitude) {
    res.locals.location = {
      latitude: "0",
      longitude: "0",
    };
    return next(req);
  }
  res.locals.location = {
    latitude, longitude,
  };
  return next();
}