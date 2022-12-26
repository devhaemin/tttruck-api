import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import productService from '@src/services/product-service';
import {IReq, IRes} from './shared/types';
import {
  tt_product,
  tt_product_category,
} from '@src/models/init-models';
import logger from "jet-logger";
import {getClientIP} from "@src/util/ip-util";
import {S3File} from "@src/routes/shared/awsMultipart";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/products',
  getAll: '/all',
  getCategories: '/category',
  getByCategory: '/category/:id',
  getById: '/:id',
  add: '/add',
  imageUpload: '/image/upload',
  update: '/update',
  delete: '/delete/:id',
} as const;


// **** Functions **** //

/**
 * @api {get} /products/all Get All Product List
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiPermission none
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "PRODUCT_ID": 6,
 *         "SUBJECT": "Test1",
 *         "PRIORITY": 999,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 3000,
 *         "PRODUCT_SIZE": "1000x1000",
 *         "PRODUCT_WEIGHT": 200,
 *         "CONTENTS": "TEST CONTENTS",
 *         "SELLER_USER_ID": null,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-23T11:46:34.000Z",
 *         "TAG": null,
 *         "ADDRESS": null,
 *         "LATITUDE": "",
 *         "LONGITUDE": "",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 37.56211,
 *                 126.941069
 *             ]
 *         },
 *         "UPDATE_USER_ID": null,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-23T11:46:34.000Z",
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 7,
 *         "SUBJECT": "Test1",
 *         "PRIORITY": 999,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 3000,
 *         "PRODUCT_SIZE": "1000x1000",
 *         "PRODUCT_WEIGHT": 200,
 *         "CONTENTS": "TEST CONTENTS",
 *         "SELLER_USER_ID": null,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-23T11:51:20.000Z",
 *         "TAG": null,
 *         "ADDRESS": null,
 *         "LATITUDE": "37.213141",
 *         "LONGITUDE": "127.123112",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.123112,
 *                 37.213141
 *             ]
 *         },
 *         "UPDATE_USER_ID": null,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-23T11:51:20.000Z",
 *         "tt_product_images": []
 *     }
 * ]
 *
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
async function getAll(req: IReq, res: IRes) {
  const products = await productService.getAll();
  logger.info(products);
  return res.status(HttpStatusCodes.OK).json(products);
}

/**
 * @api {get} /products/category/:id Get Products by Category
 * @apiName GetProductByCategory
 * @apiGroup Product
 *
 * @apiPermission none
 * @apiParam {Number} id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "PRODUCT_ID": 6,
 *         "SUBJECT": "Test1",
 *         "PRIORITY": 999,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 3000,
 *         "PRODUCT_SIZE": "1000x1000",
 *         "PRODUCT_WEIGHT": 200,
 *         "CONTENTS": "TEST CONTENTS",
 *         "SELLER_USER_ID": null,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-23T11:46:34.000Z",
 *         "TAG": null,
 *         "ADDRESS": null,
 *         "LATITUDE": "",
 *         "LONGITUDE": "",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 37.56211,
 *                 126.941069
 *             ]
 *         },
 *         "UPDATE_USER_ID": null,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-23T11:46:34.000Z",
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 7,
 *         "SUBJECT": "Test1",
 *         "PRIORITY": 999,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 3000,
 *         "PRODUCT_SIZE": "1000x1000",
 *         "PRODUCT_WEIGHT": 200,
 *         "CONTENTS": "TEST CONTENTS",
 *         "SELLER_USER_ID": null,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-23T11:51:20.000Z",
 *         "TAG": null,
 *         "ADDRESS": null,
 *         "LATITUDE": "37.213141",
 *         "LONGITUDE": "127.123112",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.123112,
 *                 37.213141
 *             ]
 *         },
 *         "UPDATE_USER_ID": null,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-23T11:51:20.000Z",
 *         "tt_product_images": []
 *     }
 * ]
 *
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
async function getByCategory(req: IReq, res: IRes) {
  const id = +req.params.id;
  const products = await productService.getByCategory(id);
  logger.info(products);
  return res.status(HttpStatusCodes.OK).json(products);
}

/**
 * @api {get} /products/:id Get Product by ID
 * @apiName GetProductByID
 * @apiGroup Product
 *
 * @apiPermission none
 *
 * @apiParam {Number} id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "PRODUCT_ID": 6,
 *     "SUBJECT": "Test1",
 *     "PRIORITY": 999,
 *     "PRODUCT_CATEGORY_ID": 1,
 *     "PRODUCT_PRICE": 3000,
 *     "PRODUCT_SIZE": "1000x1000",
 *     "PRODUCT_WEIGHT": 200,
 *     "CONTENTS": "TEST CONTENTS",
 *     "SELLER_USER_ID": null,
 *     "SELLER_USER_IPv4": 0,
 *     "SELLER_USER_IPv6": null,
 *     "UPLOAD_TIME": "2022-12-23T11:46:34.000Z",
 *     "TAG": null,
 *     "ADDRESS": null,
 *     "LATITUDE": "",
 *     "LONGITUDE": "",
 *     "LOCATION": {
 *         "type": "Point",
 *         "coordinates": [
 *             37.56211,
 *             126.941069
 *         ]
 *     },
 *     "UPDATE_USER_ID": null,
 *     "UPDATE_USER_IPv4": 0,
 *     "UPDATE_USER_IPv6": null,
 *     "UPDATE_DATE": "2022-12-23T11:46:34.000Z",
 *     "tt_product_images": []
 * }
 *
 *
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
async function getById(req: IReq, res: IRes) {
  const id = +req.params.id;
  const product = await productService.getById(id);
  logger.info(product);
  return res.status(HttpStatusCodes.OK).json(product);
}


/**
 * @api {post} /products/add Add product
 * @apiName AddProduct
 * @apiGroup Product
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "UPLOAD_TIME": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "UPDATE_DATE": {
 *         "fn": "current_timestamp",
 *         "args": []
 *     },
 *     "PRODUCT_ID": 8,
 *     "SUBJECT": "SUBJECT 1",
 *     "PRIORITY": 1,
 *     "PRODUCT_CATEGORY_ID": 1,
 *     "PRODUCT_PRICE": 30000,
 *     "PRODUCT_SIZE": "1024x1024",
 *     "PRODUCT_WEIGHT": 500,
 *     "CONTENTS": "CONTENTS 1",
 *     "TAG": "TAG 1",
 *     "ADDRESS": "ADDRESS 1",
 *     "LATITUDE": "37.626356",
 *     "LONGITUDE": "127.074697",
 *     "UPDATE_USER_IPv4": null,
 *     "SELLER_USER_IPv4": null,
 *     "SELLER_USER_ID": 4,
 *     "UPDATE_USER_ID": 4,
 *     "LOCATION": {
 *         "type": "Point",
 *         "coordinates": [
 *             127.074697,
 *             37.626356
 *         ]
 *     }
 * }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */

async function add(req: IReq<{ product: tt_product }>, res: IRes) {
  const {product} = req.body;
  const user = res.locals.user;
  product.UPDATE_USER_IPv4 = getClientIP(req);
  product.SELLER_USER_IPv4 = getClientIP(req);
  product.SELLER_USER_ID = user.USER_ID;
  product.UPDATE_USER_ID = user.USER_ID;
  const result = await productService.addOne(product);
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {post} /products/image Add product image file
 * @apiName AddProductImage
 * @apiGroup Product
 *
 * @apiPermission normalUser
 *
 * @apiBody Number productId 상품 ID 값
 * @apiBody File file 상품에 추가할 이미지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "PRODUCT_ID": 6,
 *     "SUBJECT": "SUBJECT 1",
 *     "PRIORITY": 1,
 *     "PRODUCT_CATEGORY_ID": 3,
 *     "PRODUCT_PRICE": 30000,
 *     "PRODUCT_SIZE": "1024x1024",
 *     "PRODUCT_WEIGHT": 500,
 *     "CONTENTS": "CONTENTS 1",
 *     "SELLER_USER_ID": null,
 *     "SELLER_USER_IPv4": 0,
 *     "SELLER_USER_IPv6": null,
 *     "UPLOAD_TIME": "2022-12-23T11:46:34.000Z",
 *     "TAG": "TAG 1",
 *     "ADDRESS": "ADDRESS 1",
 *     "LATITUDE": "37.626356",
 *     "LONGITUDE": "127.074697",
 *     "LOCATION": {
 *         "type": "Point",
 *         "coordinates": [
 *             37.56211,
 *             126.941069
 *         ]
 *     },
 *     "UPDATE_USER_ID": 4,
 *     "UPDATE_USER_IPv4": null,
 *     "UPDATE_USER_IPv6": null,
 *     "UPDATE_DATE": "2022-12-26T08:24:43.000Z"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
async function imageUpload(req: IReq<{ productId: number }>, res: IRes) {
  const {productId} = req.body;
  const file = req.file as S3File;
  const product = await tt_product.findByPk(productId);
  const result = await productService.uploadImage(productId, file, res.locals.user, getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}


/**
 * @api {put} /products/update Add product
 * @apiName UpdateProduct
 * @apiGroup Product
 *
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "product" : {
 *     "PRODUCT_ID":6,
 *     "SUBJECT": "SUBJECT 1",
 *     "PRIORITY": 1,
 *     "PRODUCT_CATEGORY_ID": 3,
 *     "PRODUCT_PRICE": 30000,
 *     "PRODUCT_SIZE": "1024x1024",
 *     "PRODUCT_WEIGHT": 500,
 *     "CONTENTS": "CONTENTS 1",
 *     "PRODUCT_STATUS": 1,
 *     "TAG": "TAG 1",
 *     "ADDRESS": "ADDRESS 1",
 *     "LATITUDE": "37.626356",
 *     "LONGITUDE":"127.074697"
 *   }
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "PRODUCT_ID": 6,
 *     "SUBJECT": "SUBJECT 1",
 *     "PRIORITY": 1,
 *     "PRODUCT_CATEGORY_ID": 3,
 *     "PRODUCT_PRICE": 30000,
 *     "PRODUCT_SIZE": "1024x1024",
 *     "PRODUCT_WEIGHT": 500,
 *     "CONTENTS": "CONTENTS 1",
 *     "PRODUCT_STATUS": 1,
 *     "TAG": "TAG 1",
 *     "ADDRESS": "ADDRESS 1",
 *     "LATITUDE": "37.626356",
 *     "LONGITUDE": "127.074697"
 * }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */

async function update(req: IReq<{ product: tt_product }>, res: IRes) {
  const {product} = req.body;
  const result = await productService.updateOne(res.locals.user, product);
  return res.status(HttpStatusCodes.OK).json(result).end();
}

/**
 * @api {delete} /products/delete/:id delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 *
 * @apiPermission normalUser
 *
 * @apiParam {Number} id
 *
 * @apiParamExample {json} Request-Example:
 * {}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
async function _delete(req: IReq, res: IRes) {
  const id = +req.params.id;
  await productService.delete(res.locals.user, id);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * @api {get} /products/category Get All Categories
 * @apiName GetProductCategories
 * @apiGroup Product
 * @apiPermission none
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_CATEGORY_NAME": "목자재",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 2,
 *         "PRODUCT_CATEGORY_NAME": "석고보드",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 3,
 *         "PRODUCT_CATEGORY_NAME": "경량자재",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 4,
 *         "PRODUCT_CATEGORY_NAME": "바닥재",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:37.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 5,
 *         "PRODUCT_CATEGORY_NAME": "타일",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:37.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 6,
 *         "PRODUCT_CATEGORY_NAME": "벽지",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:37.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 7,
 *         "PRODUCT_CATEGORY_NAME": "필름",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:37.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 8,
 *         "PRODUCT_CATEGORY_NAME": "페인트",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 9,
 *         "PRODUCT_CATEGORY_NAME": "조명",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 10,
 *         "PRODUCT_CATEGORY_NAME": "전기",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 11,
 *         "PRODUCT_CATEGORY_NAME": "전기자재",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 12,
 *         "PRODUCT_CATEGORY_NAME": "철물",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 13,
 *         "PRODUCT_CATEGORY_NAME": "금속자재",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:36.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     },
 *     {
 *         "PRODUCT_CATEGORY_ID": 999,
 *         "PRODUCT_CATEGORY_NAME": "기타",
 *         "PRODUCT_CATEGORY_PRIORITY": 0,
 *         "VISIBLE_TF": true,
 *         "UPDATE_USER_ID": 1,
 *         "UPDATE_USER_IPv4": null,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_TIME": "2022-12-23T10:36:37.000Z",
 *         "CREATE_USER_ID": 1,
 *         "CREATE_USER_IPv4": null,
 *         "CREATE_USER_IPv6": null,
 *         "CREATE_TIME": "2022-12-22T08:58:48.000Z"
 *     }
 * ]
 *
 */
async function getCategories(req:IReq, res:IRes){
  logger.info("TEST");
  const categories = await tt_product_category.findAll();
  return res.status(HttpStatusCodes.OK).json(categories).end();
}


// **** Export default **** //

export default {
  paths,
  getAll,
  getByCategory,
  getById,
  add,
  imageUpload,
  update,
  delete: _delete,
  getCategories,
} as const;
