import {
  tt_temp_images,
  tt_trucker_center,
  tt_trucker_center_image,
  tt_trucker_center_master,
  tt_user,
} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import logger from "jet-logger";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {S3File} from "@src/routes/shared/awsMultipart";
import {Op} from "sequelize";


// **** Variables **** //

export const truckerCenterNotFoundErr = 'TruckerCenter not found';
export const truckerCenterAuthorityErr = 'Can not modify TruckerCenter with your authority';


// **** Functions **** //

/**
 * Get all truckerCenters
 */
async function getAll(): Promise<tt_trucker_center[]> {
  const persists = await tt_trucker_center.findAll(
    {
      include:
        [{model: tt_trucker_center_image, as: "tt_trucker_center_images"},
          {
            model: tt_trucker_center_master,
            as: "TRUCKER_CENTER_MASTER",
            attributes: ["TRUCKER_CENTER_MASTER_ID", "TITLE"],
          }],
      order: [['POST_TIME', 'DESC']],
    });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      truckerCenterNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get TruckerCenters by category
 */
async function getByCategory(id: number): Promise<tt_trucker_center[]> {
  const persists = await tt_trucker_center.findAll({
    where: {TRUCKER_CENTER_MASTER_ID: id},
    include:
      [{model: tt_trucker_center_image, as: "tt_trucker_center_images"},
        {
          model: tt_trucker_center_master,
          as: "TRUCKER_CENTER_MASTER",
          attributes: ["TRUCKER_CENTER_MASTER_ID", "TITLE"],
        },
      ],
    order: [['POST_TIME', 'DESC']],
  });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      truckerCenterNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get TruckerCenter by ID
 */
async function getById(id: number): Promise<tt_trucker_center> {
  const persists = await tt_trucker_center.findByPk(id, {
    include:
      [{model: tt_trucker_center_image, as: "tt_trucker_center_images"},
        {
          model: tt_trucker_center_master,
          as: "TRUCKER_CENTER_MASTER",
          attributes: ["TRUCKER_CENTER_MASTER_ID", "TITLE"],
        }],
    order: [['POST_TIME', 'DESC']],
  });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      truckerCenterNotFoundErr,
    );
  }
  return persists;
}

/**
 * Add one TruckerCenter.
 */
function addOne(truckerCenter: tt_trucker_center): Promise<tt_trucker_center> {
  return tt_trucker_center.create(truckerCenter);
}

/**
 * Update one TruckerCenter
 */
async function updateOne(user: tt_user, truckerCenter: tt_trucker_center): Promise<tt_trucker_center> {
  if (!truckerCenter) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      truckerCenterNotFoundErr,
    );
  }
  const persists = await tt_trucker_center.findAll({where: {TRUCKER_CENTER_ID: truckerCenter.TRUCKER_CENTER_ID}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      truckerCenterNotFoundErr,
    );
  }
  if (persists[0].POST_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      truckerCenterAuthorityErr,
    );
  }
  // Return user
  const affectedCount = await tt_trucker_center.update(truckerCenter, {where: {TRUCKER_CENTER_ID: truckerCenter.TRUCKER_CENTER_ID}});
  logger.info(affectedCount);
  return truckerCenter;
}

async function uploadImage(truckerCenterId: number, file: S3File | null, user: tt_user, ip: number){
  const truckerCenter = await tt_trucker_center.findByPk(truckerCenterId);
  if (!truckerCenter) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      truckerCenterNotFoundErr, //todo: prodNotFound 추가
    );
  }
  if (!file) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "AWS API Connection error.",
    );
  }
  truckerCenter.UPDATE_IPv4 = ip;
  truckerCenter.UPDATE_USER_ID = user.USER_ID;
  await truckerCenter.update(truckerCenter);
  return await tt_trucker_center_image.create({
    TRUCKER_CENTER_ID: truckerCenter.TRUCKER_CENTER_ID,
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
  const persists = await tt_trucker_center.findAll({where: {TRUCKER_CENTER_ID: id}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      truckerCenterNotFoundErr,
    );
  }
  if (persists[0].POST_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      truckerCenterAuthorityErr,
    );
  }
  // Delete user
  await tt_trucker_center.destroy({where: {TRUCKER_CENTER_ID: id}});
}

async function uploadTempImage(file: S3File | null, user: tt_user, ip: number) {
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

async function associateTempImage(user: tt_user, tempImageIds: [number], truckerCenterId: number) {
  const truckerCenter = await tt_trucker_center.findByPk(truckerCenterId);
  if (!truckerCenter) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      truckerCenterNotFoundErr,
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
      truckerCenterNotFoundErr,
    );
  }
  const newImages = tmpImages.map(obj => {
    return {
      ...obj.dataValues,
      TRUCKER_CENTER_ID: truckerCenter.TRUCKER_CENTER_ID,
    };
  });
  const newTruckerImages = await tt_trucker_center_image.bulkCreate(newImages);
  return newTruckerImages;
}

// **** Export default **** //

export default {
  getAll,
  getByCategory,
  getById,
  addOne,
  updateOne,
  uploadImage,
  uploadTempImage,
  delete: _delete,
  associateTempImage,
} as const;
