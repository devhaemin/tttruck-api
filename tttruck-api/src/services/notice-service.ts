import {
  tt_notice,
  tt_notice_image,
  tt_notice_master, tt_temp_images, tt_trucker_center, tt_trucker_center_image,
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

export const noticeNotFoundErr = 'Notice not found';
export const noticeAuthorityErr = 'Can not modify Notice with your authority';


// **** Functions **** //

/**
 * Get all notices
 */
async function getAll(): Promise<tt_notice[]> {
  const persists = await tt_notice.findAll(
    {
      include:
        [{model: tt_notice_image, as: "tt_notice_images"},
          {
            model: tt_notice_master,
            as: "NOTICE_MASTER",
            attributes: ["NOTICE_MASTER_ID", "TITLE"],
          },
        ],
      where: {DISPLAY_TF: 1},
      order: [["TOP_FIX_TF","DESC"],['UPDATE_TIME','DESC']],
    });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  return persists;
}

async function getAllByAdmin(): Promise<tt_notice[]> {
  const persists = await tt_notice.findAll(
    {
      include:
        [{model: tt_notice_image, as: "tt_notice_images"},
          {
            model: tt_notice_master,
            as: "NOTICE_MASTER",
            attributes: ["NOTICE_MASTER_ID", "TITLE"],
          }],
      order: [["TOP_FIX_TF","DESC"],['UPDATE_TIME','DESC']],
    });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get notices by category
 */
async function getByCategory(id: number): Promise<tt_notice[]> {
  const persists = await tt_notice.findAll({
    where: {NOTICE_MASTER_ID: id},
    include:
      [{model: tt_notice_image, as: "tt_notice_images"},
        {
          model: tt_notice_master,
          as: "NOTICE_MASTER",
          attributes: ["NOTICE_MASTER_ID", "TITLE"],
        }],
    order: [["TOP_FIX_TF","DESC"],['UPDATE_TIME','DESC']],
  });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get Notice by ID
 */
async function getById(id: number): Promise<tt_notice> {
  const persists = await tt_notice.findByPk(id, {
    include:
      [{model: tt_notice_image, as: "tt_notice_images"},
        {
          model: tt_notice_master,
          as: "NOTICE_MASTER",
          attributes: ["NOTICE_MASTER_ID", "TITLE"],
        }],
  });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  return persists;
}

/**
 * Add one Notice.
 */
function addOne(notice: tt_notice): Promise<tt_notice> {
  return tt_notice.create(notice);
}

async function updateTopFix(user: tt_user, noticeId:number, topFix: boolean): Promise<tt_notice>{
  const persist = await tt_notice.findByPk(noticeId);
  if (!persist) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  if (persist.POST_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      noticeAuthorityErr,
    );
  }
  return await persist.update({
    TOP_FIX_TF : topFix? 1 : 0,
    UPDATE_USER_ID : user.USER_ID,
  });
}

/**
 * Update one Notice
 */
async function updateOne(user: tt_user, notice: tt_notice): Promise<tt_notice> {
  if (!notice) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  const persists = await tt_notice.findAll({where: {NOTICE_ID: notice.NOTICE_ID}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  if (persists[0].POST_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      noticeAuthorityErr,
    );
  }
  // Return user
  const affectedCount = await tt_notice.update(notice, {where: {NOTICE_ID: notice.NOTICE_ID}});
  logger.info(affectedCount);
  return notice;
}

async function uploadImage(noticeId: number, file: S3File | null, user: tt_user, ip: number) {
  const notice = await tt_notice.findByPk(noticeId);
  if (!notice) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr, //todo: prodNotFound 추가
    );
  }
  if (!file) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "AWS API Connection error.",
    );
  }
  notice.UPDATE_IPv4 = ip;
  notice.UPDATE_USER_ID = user.USER_ID;
  await notice.update(notice);
  return await tt_notice_image.create({
    NOTICE_ID: notice.NOTICE_ID,
    FILE_NAME: file.key,
    FILE_PATH: file.path,
    FILE_URL: file.location,
    FILE_SIZE: file.size,
  });
}

/**
 * Delete a user by their id.
 */
async function _delete(user: tt_user, id: number): Promise<void> {
  const persists = await tt_notice.findAll({where: {NOTICE_ID: id}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  if (persists[0].POST_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      noticeAuthorityErr,
    );
  }
  // Delete user
  await tt_notice.destroy({where: {NOTICE_ID: id}});
}

async function uploadTempImage( file: S3File | null, user: tt_user, ip: number) {
  if (!file) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "AWS API Connection error.",
    );
  }
  const tmpImage = await tt_temp_images.create({
    FILE_NAME: file.key,
    FILE_PATH: file.path,
    FILE_URL: file.location,
    FILE_SIZE: file.size,
  });
  return tmpImage;
}

async function associateTempImage(user: tt_user, tempImageIds: [number], noticeId: number) {
  const notice = await tt_notice.findByPk(noticeId);
  if (!notice) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  const tmpImages = await tt_temp_images.findAll({
    where: {
      TEMP_IMAGE_ID: {
        [Op.in]: tempImageIds,
      },
    },
  });
  if (!tmpImages) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    );
  }
  const newImages = tmpImages.map(obj => {
    return {
      ...obj.dataValues,
      NOTICE_ID: notice.NOTICE_ID,
    };
  });
  const newNoticeImages = await tt_notice_image.bulkCreate(newImages);
  return newNoticeImages;
}


// **** Export default **** //

export default {
  getAll,
  getAllByAdmin,
  getByCategory,
  getById,
  updateTopFix,
  addOne,
  updateOne,
  uploadImage,
  uploadTempImage,
  associateTempImage,
  delete: _delete,
} as const;
