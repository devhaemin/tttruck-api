import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {tt_user_signout} from "@src/models/tt_user_signout";
import {tt_user} from "@src/models/tt_user";
import {tt_user_group} from "@src/models/dummy/tt_user_group";


// **** Variables **** //

export const userNotFoundErr = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(user: tt_user): Promise<tt_user[]> {
  if (user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      "User can't perform this action",
    );
  }
  const users = await tt_user.findAll({
    attributes:
      ["USER_ID", "PHONE", "NAME", "NICKNAME", "UPD_TIME", "JOIN_TIME"],
  });
  return users;
}

async function getSignout(user: tt_user): Promise<tt_user_signout[]> {
  if (user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      "User can't perform this action",
    );
  }
  const userFeedbacks = await tt_user_signout.findAll({
    attributes:
      ["TEXT", "TIME"],
    order:
      [["TIME", "DESC"]],
    include:
      [{
        model: tt_user, as: "USER",
        attributes: ["USER_ID", "PHONE", "NAME", "NICKNAME", "UPD_TIME", "JOIN_TIME"],
      }],
  });

  return userFeedbacks;
}

// **** Export default **** //

export default {
  getAll,
  getSignout,
} as const;
