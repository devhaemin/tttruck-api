import jwtUtil from '@src/util/jwt-util';
import pwdUtil from '@src/util/pwd-util';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {RouteError} from '@src/declarations/classes';
import {tick} from '@src/declarations/functions';
import {tt_user} from "@src/models/tt_user";
import logger from "jet-logger";


// **** Variables **** //

// Errors
export const errors = {
  unauth: 'Unauthorized',
  phoneNotFound: (phone: string) => `User with phone "${phone}" not found`,
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function getJwtUser(phone: string, password: string): Promise<tt_user> {
  // Fetch user
  const user = await tt_user.findOne({where:{$PHONE$:phone}});
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      errors.phoneNotFound(phone),
    );
  }
  // Check password
  const hash = (user.PASSWORD ?? '');
  const pwdPassed = await pwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      errors.unauth,
    );
  }
  // Setup Admin Cookie
  user.ACCESSTOKEN = await jwtUtil.sign({
    phone: user.PHONE,
    password: user.PASSWORD,
  });

  return user;
}


// **** Export default **** //

export default {
  getJwtUser,
} as const;
