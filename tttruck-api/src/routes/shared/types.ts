import * as e from 'express';
import { Query } from 'express-serve-static-core';

import {tt_user} from "@src/models/tt_user";


// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
  query: T;
  body: U;
}

export interface IRes extends e.Response {
  locals: {
    user:tt_user;
  };
}
