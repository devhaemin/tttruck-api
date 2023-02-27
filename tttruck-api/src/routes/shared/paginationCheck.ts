import {IReqQuery, IRes} from "@src/routes/shared/types";
import {NextFunction} from "express";
import {Query} from "express-serve-static-core";

export interface UserPagination extends Query {
  limit: string;
  offset: string;
}

export function paginationCheck(
  req: IReqQuery<UserPagination>,
  res: IRes,
  next: NextFunction,
) {
  const {limit, offset} = req.query;
  if (!limit || !offset) {
    res.locals.pagination = {
      limit: "30",
      offset: "0",
    };
    return next(req);
  }
  res.locals.pagination = {
    limit, offset,
  };
  return next();
}