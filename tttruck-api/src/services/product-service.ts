import {tt_product, tt_product_image, tt_user} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import logger from "jet-logger";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {S3File} from "@src/routes/shared/awsMultipart";
import {noticeNotFoundErr} from "@src/services/notice-service";


// **** Variables **** //

export const prodNotFoundErr = 'Product not found';
export const prodAuthorityErr = 'Can not modify Product with your authority';


// **** Functions **** //

/**
 * Get all products
 */
async function getAll(): Promise<tt_product[]> {
  const persists = await tt_product.findAll(
    {
      include:
        [{model: tt_product_image, as: "tt_product_images"}],
    });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get products by category
 */
async function getByCategory(id: number): Promise<tt_product[]> {
  const persists = await tt_product.findAll({
    where: {$PRODUCT_CATEGORY_ID$: id},
    include:
      [{model: tt_product_image, as: "tt_product_images"}],
  });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  return persists;
}

/**
 * Get product by ID
 */
async function getById(id: number): Promise<tt_product> {
  const persists = await tt_product.findByPk(id, {
    include:
      [{model: tt_product_image, as: "tt_product_images"}],
  });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  return persists;
}

/**
 * Add one product
 */
function addOne(product: tt_product): Promise<tt_product> {
  product.LATITUDE = product.LATITUDE? product.LATITUDE : "37.541";
  product.LONGITUDE = product.LONGITUDE? product.LONGITUDE : "126.986";
  product.LOCATION = {
    type: 'Point',
    coordinates: [Number(product.LONGITUDE), Number(product.LATITUDE)],
  };
  return tt_product.create(product);
}

/**
 * Update one product
 */
async function updateOne(user: tt_user, product: tt_product): Promise<tt_product> {
  if(!product){
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      noticeNotFoundErr,
    )
  }
  const persists = await tt_product.findAll({where: {PRODUCT_ID: product.PRODUCT_ID}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  if (persists[0].SELLER_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      prodAuthorityErr,
    );
  }
  // Return user
  const affectedCount = await tt_product.update(product, {where: {PRODUCT_ID: product.PRODUCT_ID}});
  logger.info(affectedCount);
  return product;
}

async function uploadImage(productId: number, file: S3File | null, user: tt_user, ip: number) {
  const product = await tt_product.findByPk(productId);
  if (!product) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  if (!file) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "AWS API Connection error.",
    );
  }
  product.UPDATE_USER_IPv4 = ip;
  product.UPDATE_USER_ID = user.USER_ID;
  tt_product_image.create({
    PRODUCT_ID: product.PRODUCT_ID,
    FILE_NAME: file.key,
    FILE_PATH: file.path,
    FILE_URL: file.location,
    FILE_SIZE: file.size,
  });
  return await product.update(product);
}

/**
 * Delete a user by their id.
 */
async function _delete(user: tt_user, id: number): Promise<void> {
  const persists = await tt_product.findAll({where: {PRODUCT_ID: id}});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  if (persists[0].SELLER_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      prodAuthorityErr,
    );
  }
  // Delete user
  await tt_product.destroy({where: {PRODUCT_ID: id}});
}


// **** Export default **** //

export default {
  getAll,
  getByCategory,
  getById,
  addOne,
  updateOne,
  uploadImage,
  delete: _delete,
} as const;
