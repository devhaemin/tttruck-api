import {tt_product, tt_user} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import logger from "jet-logger";
import {tt_user_group} from "@src/models/dummy/tt_user_group";


// **** Variables **** //

export const prodNotFoundErr = 'Product not found';
export const prodAuthorityErr = 'Can not modify Product with your authority';


// **** Functions **** //

/**
 * Get all products
 */
async function getAll(): Promise<tt_product[]> {
  const persists = await tt_product.findAll();
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
  const persists = await tt_product.findOne({
    where: {$PRODUCT_ID$: id},
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
 * Add one user.
 */
function addOne(product: tt_product): Promise<tt_product> {
  return tt_product.create(product);
}

/**
 * Update one user.
 */
async function updateOne(user: tt_user, product: tt_product): Promise<tt_product> {
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
  delete: _delete,
} as const;
