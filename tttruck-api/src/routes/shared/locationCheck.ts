import {NextFunction} from 'express';
import {IReq, IReqQuery, IRes} from "@src/routes/shared/types";
import {Query} from "express-serve-static-core";
import logger from "jet-logger";

export interface UserLocation extends Query {
  longitude: string;
  latitude: string;
}

export function locationCheck(
  req: IReq,
  res: IRes,
  next: NextFunction,
) {
  let {longitude, latitude} = req.query;
  longitude = longitude as string;
  latitude = latitude as string;
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