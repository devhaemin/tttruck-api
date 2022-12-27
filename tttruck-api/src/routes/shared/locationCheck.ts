import {NextFunction, Request, Response} from 'express';

export interface UserLocation {
  location: {
    longitude: string
    latitude: string
  };
}

export function locationCheck(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const location = req.body as UserLocation;
  if (!location) {
    res.locals.location = {
      location: {
        latitude: "37.56211",
        longitude: "126.941069",
      },
    };
    return next(req);
  }
  res.locals.location = {
    location: location,
  };
  return next();
}