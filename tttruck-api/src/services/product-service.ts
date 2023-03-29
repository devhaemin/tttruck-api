import {
  tt_product,
  tt_product_category,
  tt_product_image,
  tt_user,
} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import logger from "jet-logger";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {S3File} from "@src/routes/shared/awsMultipart";
import {Op, Sequelize} from "sequelize";


// **** Variables **** //

export const prodNotFoundErr = 'Product not found';
export const prodAuthorityErr = 'Can not modify Product with your authority';
const DEFAULT_LIMIT = 30;
const DEFAULT_OFFSET = 0;

export interface ProductFilter {
  longitude?: string,
  latitude?: string,
  offset?: number,
  limit?: number,
  queryString?: string,
  categories?: number[],
  priceMin?: number,
  priceMax?: number,
  orderBy?: string,
  orderDesc?: boolean,
}

function getAvailableFilter({
  longitude = "0",
  latitude = "0",
  offset = DEFAULT_OFFSET,
  limit = DEFAULT_LIMIT,
  queryString = "",
  categories = [0],
  priceMin = 0,
  priceMax = 100000000000000,
  orderBy = "UPLOAD_TIME",
  orderDesc = false,
}) {
  return {
    longitude,
    latitude,
    offset,
    limit,
    queryString,
    categories,
    priceMin,
    priceMax,
    orderBy,
    orderDesc,
  };
}

async function getMinMaxPrice(filter1: ProductFilter): Promise<tt_product> {
  const filter = getAvailableFilter(filter1);
  const categories = await tt_product_category.findAll({
    where: {
      [Op.or]:
        [{
          PRODUCT_CATEGORY_ID: {
            [Op.in]: filter.categories,
          },
        },
          {
            PARENT_CATEGORY_ID: {
              [Op.in]: filter.categories,
            },
          }],
    },
  });
  if (!categories) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      "Categories are not found",
    );
  }
  const categoryData = categories.map(category => category.PRODUCT_CATEGORY_ID);
  const {queryString} = filter;
  const persists = await tt_product.findOne(
    {
      where: {
        SUBJECT: {
          [Op.like]: "%" + queryString + "%",
        },
        PRODUCT_CATEGORY_ID: {
          [Op.in]: categoryData,
        },
      },
      attributes: [
        [Sequelize.fn('min', Sequelize.col('PRODUCT_PRICE')), 'MIN_PRICE'],
        [Sequelize.fn('max', Sequelize.col('PRODUCT_PRICE')), 'MAX_PRICE'],
      ],
    });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  return persists;
}

// **** Functions **** //
async function getByFilter(filter1: ProductFilter): Promise<tt_product[]> {
  const filter = getAvailableFilter(filter1);
  const categories = await tt_product_category.findAll({
    where: {
      [Op.or]:
        [{
          PRODUCT_CATEGORY_ID: {
            [Op.in]: filter.categories,
          },
        },
          {
            PARENT_CATEGORY_ID: {
              [Op.in]: filter.categories,
            },
          }],
    },
  });
  if (!categories) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      "Categories are not found",
    );
  }
  const categoryData = categories.map(category => category.PRODUCT_CATEGORY_ID);
  const offset = filter.offset || DEFAULT_OFFSET;
  const limit = filter.limit || DEFAULT_LIMIT;
  const {longitude, latitude, orderBy, orderDesc, queryString} = filter;
  const {priceMin, priceMax} = filter;
  const persists = await tt_product.findAll(
    {
      offset: offset,
      limit: limit,
      where: {
        DELETE_TF: 0,
        SUBJECT: {
          [Op.like]: "%" + queryString + "%",
        },
        PRODUCT_PRICE: {
          [Op.between]: [priceMin, priceMax],
        },
        PRODUCT_CATEGORY_ID: {
          [Op.in]: categoryData,
        },
      },
      attributes: {
        include: [
          [
            Sequelize.fn(
              'ST_Distance',
              Sequelize.col('LOCATION'),
              Sequelize.fn('POINT', longitude, latitude),
            ),
            'DISTANCE',
          ],
        ],
      },
      include:
        [{all: true},
          {model: tt_product_image, as: "tt_product_images"},
          {
            model: tt_user,
            as: "SELLER_USER",
            attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
          }],
      order: [
        [
          orderBy === "DISTANCE" ? Sequelize.literal("DISTANCE") : orderBy,
          orderDesc ? "DESC" : "ASC"],
        [{
          model: tt_product_image,
          as: "tt_product_images",
        }, 'PRIORITY', 'ASC']],
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
 * Get all products
 */
async function getAll(longitude: string, latitude: string, offset: number, limit: number): Promise<tt_product[]> {
  offset = offset || DEFAULT_OFFSET;
  limit = limit || DEFAULT_LIMIT;
  const persists = await tt_product.findAll(
    {
      offset: offset,
      limit: limit,
      where: {
        DELETE_TF: 0,
      },
      attributes: {
        include: [
          [
            Sequelize.fn(
              'ST_Distance',
              Sequelize.col('LOCATION'),
              Sequelize.fn('POINT', longitude, latitude),
            ),
            'DISTANCE',
          ],
        ],
      },
      include:
        [{model: tt_product_image, as: "tt_product_images"},
          {
            model: tt_user,
            as: "SELLER_USER",
            attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
          }],
      order: [Sequelize.literal('DISTANCE ASC'),
        [{
          model: tt_product_image,
          as: "tt_product_images",
        }, 'PRIORITY', 'ASC']],
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
async function getByCategory(longitude: string, latitude: string, id: number, offset: number, limit: number): Promise<tt_product[]> {
  offset = offset || DEFAULT_OFFSET;
  limit = limit || DEFAULT_LIMIT;
  const persists = await tt_product.findAll({
    offset: offset,
    limit: limit,
    attributes: {
      include: [
        [
          Sequelize.fn(
            'ST_Distance',
            Sequelize.col('LOCATION'),
            Sequelize.fn('POINT', longitude, latitude),
          ),
          'DISTANCE',
        ],
      ],
    },
    where: {
      $PRODUCT_CATEGORY_ID$: id,
      DELETE_TF: 0,
    },
    include:
      [{model: tt_product_image, as: "tt_product_images"},
        {
          model: tt_user,
          as: "SELLER_USER",
          attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
        }],
    order: [Sequelize.literal('DISTANCE ASC'),
      [{model: tt_product_image, as: "tt_product_images"}, 'PRIORITY', 'ASC']],
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
 *
 * Get products by categories
 */
async function getByCategories(longitude: string, latitude: string, categories: number[], offset: number, limit: number):
  Promise<tt_product[]> {
  offset = offset || DEFAULT_OFFSET;
  limit = limit || DEFAULT_LIMIT;
  const persists = await tt_product.findAll({
    offset: offset,
    limit: limit,
    attributes: {
      include: [
        [
          Sequelize.fn(
            'ST_Distance_Sphere',
            Sequelize.col('LOCATION'),
            Sequelize.fn('POINT', longitude, latitude),
          ),
          'DISTANCE',
        ],
      ],
    },
    where: {
      $PRODUCT_CATEGORY_ID$: {[Op.in]: categories},
      DELETE_TF: 0,
    },
    include:
      [{model: tt_product_image, as: "tt_product_images"},
        {
          model: tt_user,
          as: "SELLER_USER",
          attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
        }],
    order: [Sequelize.literal('DISTANCE ASC'),
      [{model: tt_product_image, as: "tt_product_images"}, 'PRIORITY', 'ASC']],
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
      [{model: tt_product_image, as: "tt_product_images"},
        {
          model: tt_user,
          as: "SELLER_USER",
          attributes: ["NICKNAME", "PROFILE_IMAGE", "USER_ID"],
        }],
    order: [[{
      model: tt_product_image,
      as: "tt_product_images",
    }, 'PRIORITY', 'ASC']],
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
  product.LATITUDE = product.LATITUDE ? product.LATITUDE : "37.541";
  product.LONGITUDE = product.LONGITUDE ? product.LONGITUDE : "126.986";
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
  if (!product) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
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

/**
 * setImageOrder
 */
async function setImageOrder(priorities: [{ PRODUCT_IMAGE_ID: number, PRIORITY: number }]) {
  for (const priority of priorities) {
    const productImage = await tt_product_image.findByPk(priority.PRODUCT_IMAGE_ID);
    if (!productImage) {
      throw new RouteError(
        HttpStatusCodes.NOT_FOUND,
        "상품 이미지를 찾을 수 없습니다.",
      );
    }
    productImage.PRIORITY = priority.PRIORITY;
    await tt_product_image.update(
      {PRIORITY: priority.PRIORITY}, {where: {PRODUCT_IMAGE_ID: priority.PRODUCT_IMAGE_ID}});
  }
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
  await product.update(product);
  return tt_product_image.create({
    PRODUCT_ID: product.PRODUCT_ID,
    FILE_NAME: file.key,
    FILE_PATH: file.path,
    FILE_URL: file.location,
    FILE_SIZE: file.size,
  });
}

async function deleteImage(user: tt_user, id: number): Promise<void> {
  const persists = await tt_product_image.findAll({
    where: {PRODUCT_IMAGE_ID: id},
    include:
      [{model: tt_product, as: "PRODUCT"}],
    order: [
      ['PRIORITY', 'ASC'],
    ],
  });
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      prodNotFoundErr,
    );
  }
  if (persists[0].PRODUCT.SELLER_USER_ID !== user.USER_ID && user.GROUP !== tt_user_group.ADMIN) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      prodAuthorityErr,
    );
  }
  // Delete user
  await tt_product_image.destroy({where: {PRODUCT_IMAGE_ID: id}});
}

/**
 * Delete a user by their id.
 */
async function _delete(user: tt_user, id: number): Promise<void> {
  const persists = await tt_product.findAll({where: {PRODUCT_ID: id}});
  if (!persists || persists.length === 0) {
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
  await tt_product.update(
    {DELETE_TF: 1},
    {
      where: {PRODUCT_ID: id},
    });
}


// **** Export default **** //

export default {
  getByFilter,
  getAll,
  getByCategory,
  getByCategories,
  getById,
  addOne,
  setImageOrder,
  updateOne,
  uploadImage,
  getMinMaxPrice,
  delete: _delete,
  deleteImage,
} as const;
