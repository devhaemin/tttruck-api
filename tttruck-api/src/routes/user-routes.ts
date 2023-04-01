import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import userService from '@src/services/user-service';
import {IUser} from '@src/models/User';
import {IReq, IRes} from './shared/types';


// **** Variables **** //

// Paths
const paths = {
  basePath: '/users',
  get: '/all',
  add: '/add',
  update: '/update',
  delete: '/delete/:id',
  getSignOut: '/feedback/all',
} as const;


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await userService.getAll(res.locals.user);
  return res.status(HttpStatusCodes.OK).json(users);
}

async function getSignOut(_:IReq, res:IRes){
  const userFeedbacks = await userService.getSignout(res.locals.user);
  return res.status(HttpStatusCodes.OK).json(userFeedbacks);
}

// **** Export default **** //

export default {
  paths,
  getAll,
  getSignOut,
} as const;
