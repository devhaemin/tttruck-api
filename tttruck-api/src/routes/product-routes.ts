import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import productService from '@src/services/product-service';
import {IReq, IRes} from './shared/types';
import {tt_product, tt_product_image} from '@src/models/init-models';
import logger from "jet-logger";
import {getClientIP} from "@src/util/ip-util";
import {S3File} from "@src/routes/shared/awsMultipart";
import {tt_productId} from "@src/models/tt_product";
import {RouteError} from "@src/declarations/classes";
import multer from "multer";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/products',
  getAll: '/all',
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
 *     {
 *     "products": [
 *         {
 *             "PRODUCT_ID": 1,
 *             "SUBJECT": "SUBJECT 1",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 1,
 *             "PRODUCT_SIZE": "1000x1000",
 *             "PRODUCT_WEIGHT": 1,
 *             "CONTENTS": "CONTENTS 1",
 *             "PRODUCT_STATUS": 1,
 *             "SELLER_USER_ID": 1,
 *             "SELLER_USER_IPv4": null,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_DATE": "2022-12-17T14:17:35.000Z",
 *             "SHARED_TF": "N",
 *             "TAG": "TAG 1",
 *             "ADDRESS": "ADDRESS 1",
 *             "UPDATE_USER_ID": 1,
 *             "UPDATE_USER_IPv4": null,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2022-12-17T14:17:35.000Z"
 *         },
 *         {
 *             "PRODUCT_ID": 2,
 *             "SUBJECT": "SUBJECT 1",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 1,
 *             "PRODUCT_SIZE": "1000x1000",
 *             "PRODUCT_WEIGHT": 1,
 *             "CONTENTS": "CONTENTS 1",
 *             "PRODUCT_STATUS": 1,
 *             "SELLER_USER_ID": 1,
 *             "SELLER_USER_IPv4": null,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_DATE": "2022-12-17T14:17:35.000Z",
 *             "SHARED_TF": "N",
 *             "TAG": "TAG 1",
 *             "ADDRESS": "ADDRESS 1",
 *             "UPDATE_USER_ID": 1,
 *             "UPDATE_USER_IPv4": null,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2022-12-17T14:17:35.000Z"
 *         }
 *     ]
 * }
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
  return res.status(HttpStatusCodes.OK).json({products});
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
 *     {
 *     "products": [
 *         {
 *             "PRODUCT_ID": 1,
 *             "SUBJECT": "SUBJECT 1",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 1,
 *             "PRODUCT_SIZE": "1000x1000",
 *             "PRODUCT_WEIGHT": 1,
 *             "CONTENTS": "CONTENTS 1",
 *             "PRODUCT_STATUS": 1,
 *             "SELLER_USER_ID": 1,
 *             "SELLER_USER_IPv4": null,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_DATE": "2022-12-17T14:17:35.000Z",
 *             "SHARED_TF": "F",
 *             "TAG": "TAG 1",
 *             "ADDRESS": "ADDRESS 1",
 *             "UPDATE_USER_ID": 1,
 *             "UPDATE_USER_IPv4": null,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2022-12-17T14:17:35.000Z"
 *         },
 *         {
 *             "PRODUCT_ID": 2,
 *             "SUBJECT": "SUBJECT 1",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 1,
 *             "PRODUCT_SIZE": "1000x1000",
 *             "PRODUCT_WEIGHT": 1,
 *             "CONTENTS": "CONTENTS 1",
 *             "PRODUCT_STATUS": 1,
 *             "SELLER_USER_ID": 1,
 *             "SELLER_USER_IPv4": null,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_DATE": "2022-12-17T14:17:35.000Z",
 *             "SHARED_TF": "F",
 *             "TAG": "TAG 1",
 *             "ADDRESS": "ADDRESS 1",
 *             "UPDATE_USER_ID": 1,
 *             "UPDATE_USER_IPv4": null,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2022-12-17T14:17:35.000Z"
 *         }
 *     ]
 * }
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
  return res.status(HttpStatusCodes.OK).json({products});
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
 *     {
 *     "product":
 *         {
 *             "PRODUCT_ID": 1,
 *             "SUBJECT": "SUBJECT 1",
 *             "PRIORITY": 1,
 *             "PRODUCT_CATEGORY_ID": 1,
 *             "PRODUCT_PRICE": 1,
 *             "PRODUCT_SIZE": "1000x1000",
 *             "PRODUCT_WEIGHT": 1,
 *             "CONTENTS": "CONTENTS 1",
 *             "PRODUCT_STATUS": 1,
 *             "SELLER_USER_ID": 1,
 *             "SELLER_USER_IPv4": null,
 *             "SELLER_USER_IPv6": null,
 *             "UPLOAD_DATE": "2022-12-17T14:17:35.000Z",
 *             "SHARED_TF": "F",
 *             "TAG": "TAG 1",
 *             "ADDRESS": "ADDRESS 1",
 *             "UPDATE_USER_ID": 1,
 *             "UPDATE_USER_IPv4": null,
 *             "UPDATE_USER_IPv6": null,
 *             "UPDATE_DATE": "2022-12-17T14:17:35.000Z"
 *         }
 * }
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
  return res.status(HttpStatusCodes.OK).json({product});
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
 *   "product" : {
 *     "SUBJECT": "SUBJECT 1",
 *     "PRIORITY": 1,
 *     "PRODUCT_CATEGORY_ID": 1,
 *     "PRODUCT_PRICE": 30000,
 *     "PRODUCT_SIZE": "1024x1024",
 *     "PRODUCT_WEIGHT": 500,
 *     "CONTENTS": "CONTENTS 1",
 *     "PRODUCT_STATUS": 1,
 *     "TAG": "TAG 1",
 *     "ADDRESS": "ADDRESS 1"
 *   }
 * }
 *
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
 *     {}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
//todo: 상품 이미지랑 파일 db 에 추가하는 service 생성하고 로직만들기.
async function imageUpload(req: IReq<{productId: tt_productId }>, res: IRes) {
  const {productId} = req.body;
  const file = req.file as S3File;
  const product = await tt_product.findByPk(productId);
  await productService.uploadImage(product,file,res.locals.user,getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).end();
}


/**
 * @api {update} /products/update Add product
 * @apiName AddProduct
 * @apiGroup Product
 *
 *
 * @apiPermission normalUser
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "product" : {
 *     "PRODUCT_ID": 1,
 *     "SUBJECT": "SUBJECT 1",
 *     "PRIORITY": 1,
 *     "PRODUCT_CATEGORY_ID": 1,
 *     "PRODUCT_PRICE": 30000,
 *     "PRODUCT_SIZE": "1024x1024",
 *     "PRODUCT_WEIGHT": 500,
 *     "CONTENTS": "CONTENTS 1",
 *     "PRODUCT_STATUS": 1,
 *     "TAG": "TAG 1",
 *     "ADDRESS": "ADDRESS 1"
 *   }
 * }
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

async function update(req: IReq<{ product: tt_product }>, res: IRes) {
  const {product} = req.body;
  await productService.updateOne(res.locals.user, product);
  return res.status(HttpStatusCodes.OK).end();
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
} as const;
