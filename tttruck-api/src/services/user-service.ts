import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {tt_user_signout} from "@src/models/tt_user_signout";
import {tt_user} from "@src/models/tt_user";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {Op, Sequelize} from "sequelize";
import {tt_product_image} from "@src/models/init-models";


// **** Variables **** //

export const userNotFoundErr = 'User not found';
export interface UserFilter {
  offset?: number,
  limit?: number,
  queryString?: string,
  orderBy?: string,
  orderDesc?: boolean,
}



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

async function getByFilter(filter1: UserFilter): Promise<tt_user[]> {
  const filter = getAvailableFilter(filter1);
  const offset = filter.offset || 0;
  const limit = filter.limit || 30;
  const {orderBy, orderDesc, queryString} = filter;
  const users = await tt_user.findAll({
    where: {
      LEAVE_TF: 0,
      [Op.or]: [
        {
          PHONE: {
            [Op.like]: "%" + queryString + "%",
          },
        },
        {
          NICKNAME: {
            [Op.like]: "%" + queryString + "%",
          },
        },
      ],
    },
    order: [
      [
        orderBy,
        orderDesc ? "DESC" : "ASC",
      ],
    ],
  });
  return users;
}

function getAvailableFilter({
  offset = 0,
  limit = 30,
  queryString = "",
  orderBy = "JOIN_TIME",
  orderDesc = true,
}) {
  return {
    offset,
    limit,
    queryString,
    orderBy,
    orderDesc,
  };
}

// **** Export default **** //

export default {
  getAll,
  getSignout,
  getByFilter,
} as const;
