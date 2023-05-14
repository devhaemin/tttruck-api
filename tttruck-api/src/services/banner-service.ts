import {
  tt_banner,
  tt_user,
} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import logger from "jet-logger";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {S3File} from "@src/routes/shared/awsMultipart";
import {Op} from "sequelize";
import {truckerCenterNotFoundErr} from "@src/services/trucker-center-service";


// **** Variables **** //

export const bannerNotFoundErr = 'banner not found';
export const bannerAuthorityErr = 'Can not modify banner with your authority';


// **** Functions **** //

/**
 * Get all banners
 */
async function getAll(): Promise<tt_banner[]> {
  const persists = await tt_banner.findAll(
    {
      where: {DISPLAY_TF: 1},
      order: [["TOP_FIX_TF","DESC"],['UPDATE_TIME','DESC']],
    });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      bannerNotFoundErr,
    );
  }
  return persists;
}

async function getAllByAdmin(): Promise<tt_banner[]> {
  const persists = await tt_banner.findAll(
    {
      order: [["TOP_FIX_TF","DESC"],['UPDATE_TIME','DESC']],
    });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      bannerNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get banner by ID
 */
async function getById(id: number): Promise<tt_banner> {
  const persists = await tt_banner.findByPk(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      bannerNotFoundErr,
    );
  }
  return persists;
}

/**
 * Add one banner.
 */
function addOne(banner: tt_banner): Promise<tt_banner> {
  return tt_banner.create(banner);
}

async function updateTopFix(user: tt_user, bannerId:number, topFix: boolean): Promise<tt_banner>{
  const persist = await tt_banner.findByPk(bannerId);
  if (!persist) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      bannerNotFoundErr,
    );
  }
  if (persist.POST_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      bannerAuthorityErr,
    );
  }
  return await persist.update({
    TOP_FIX_TF : topFix? 1 : 0,
    UPDATE_USER_ID : user.USER_ID,
  });
}

/**
 * Update one banner
 */
async function updateOne(user: tt_user, banner: tt_banner): Promise<tt_banner> {
  if (!banner) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      bannerNotFoundErr,
    );
  }
  const persists = await tt_banner.findAll({where: {BANNER_ID : banner.BANNER_ID}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      bannerNotFoundErr,
    );
  }
  if (persists[0].POST_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      bannerAuthorityErr,
    );
  }
  // Return user
  const affectedCount = await tt_banner.update(banner, {where: {BANNER_ID : banner.BANNER_ID}});
  logger.info(affectedCount);
  return banner;
}

async function uploadImage(bannerId: number, file: S3File | null, user: tt_user, ip: number) {
  const banner = await tt_banner.findByPk(bannerId);
  if (!banner) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      bannerNotFoundErr, //todo: prodNotFound 추가
    );
  }
  if (!file) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "AWS API Connection error.",
    );
  }
  banner.UPDATE_IPv4 = ip;
  banner.UPDATE_USER_ID = user.USER_ID;
  banner.FILE_NAME = file.filename;
  banner.FILE_PATH = file.key;
  await banner.save();
  return banner;
}



// **** Export default **** //

export default {
  getAll,
  getAllByAdmin,
  getById,
  updateTopFix,
  addOne,
  updateOne,
  uploadImage,
} as const;
