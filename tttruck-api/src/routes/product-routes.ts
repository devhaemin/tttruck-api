import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import productService from '@src/services/product-service';
import {IReq, IRes} from './shared/types';
import {tt_product, tt_product_category} from '@src/models/init-models';
import logger from "jet-logger";
import {getClientIP} from "@src/util/ip-util";
import {S3File} from "@src/routes/shared/awsMultipart";


// **** Variables **** //

// Paths
const paths = {
  basePath: '/products',
  getAll: '/all',
  getCategories: '/category',
  getByCategories: '/categories',
  getByCategory: '/category/:id',
  getById: '/:id',
  add: '/add',
  setImageOrder: '/image/order',
  imageUpload: '/image/upload',
  _imageDelete: 'image/delete/:id',
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
 * @apiParamExample {json} Request-Example:
 * {
 *     "latitude": "37.56211",
 *     "longitude": "126.941069"
 * }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "PRODUCT_ID": 8,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-26T08:19:55.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-26T08:19:55.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": [],
 *         "SELLER_USER": {
 *             "NICKNAME": "꼬리무123",
 *             "PROFILE_IMAGE": null,
 *             "USER_ID": 4
 *         }
 *     },
 *     {
 *         "PRODUCT_ID": 9,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 1794396811,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:33:48.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 1794396811,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:33:48.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": [],
 *         "SELLER_USER": {
 *             "NICKNAME": "꼬리무123",
 *             "PROFILE_IMAGE": null,
 *             "USER_ID": 4
 *         }
 *     }
 * ]
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
async function getAll(req: IReq, res: IRes) {
  const {longitude, latitude} = res.locals.location.location;
  const products = await productService.getAll(longitude, latitude);
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
 * @apiParamExample {json} Request-Example:
 * {
 * "location":{
 *         "latitude": "37.56211",
 *         "longitude": "126.941069"
 *     }
 * }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "PRODUCT_ID": 8,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-26T08:19:55.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-26T08:19:55.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": [],
 *         "SELLER_USER": {
 *             "NICKNAME": "꼬리무123",
 *             "PROFILE_IMAGE": null,
 *             "USER_ID": 4
 *         }
 *     },
 *     {
 *         "PRODUCT_ID": 9,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 1794396811,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:33:48.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 1794396811,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:33:48.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": [],
 *         "SELLER_USER": {
 *             "NICKNAME": "꼬리무123",
 *             "PROFILE_IMAGE": null,
 *             "USER_ID": 4
 *         }
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
  const {longitude, latitude} = res.locals.location.location;
  const products = await productService.getByCategory(longitude, latitude, id);
  logger.info(products);
  return res.status(HttpStatusCodes.OK).json(products);
}

/**
 * @api {get} /products/categories Get Products by Category
 * @apiName GetProductByCategory
 * @apiGroup Product
 *
 * @apiPermission none
 * @apiParamExample {json} Request-Example:
 * {
 *     "location":{
 *         "latitude": "37.56211",
 *         "longitude": "126.941069"
 *     },
 *     "categories":[
 *         1,2,3
 *       ]
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "PRODUCT_ID": 6,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 3,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": null,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-23T11:46:34.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": null,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T16:46:37.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": [
 *             {
 *                 "PRODUCT_IMAGE_ID": 1,
 *                 "PRODUCT_ID": 6,
 *                 "FILE_NAME": "product/image/1672043380525_img-ObBaphDQMth1gVfJIwiS0HUh.png",
 *                 "FILE_PATH": null,
 *                 "FILE_SIZE": 3147977,
 *                 "ORG_FILE_SEQ": null,
 *                 "FILE_URL": "https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672043380525_img-ObBaphDQMth1gVfJIwiS0HUh.png",
 *                 "THUMB_PATH": null,
 *                 "FILE_ID": null,
 *                 "CONTENT_ID": null,
 *                 "TIME": "2022-12-26T08:29:46.000Z"
 *             }
 *         ]
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
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 8,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-26T08:19:55.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-26T08:19:55.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 9,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 1794396811,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:33:48.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 1794396811,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:33:48.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 10,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 1794396811,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:35:41.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 1794396811,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:35:41.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 11,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 1794396811,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:36:15.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 1794396811,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:36:15.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 12,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:40:02.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:40:02.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 13,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:43:11.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:43:11.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 14,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 1794396811,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:44:06.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 1794396811,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:44:06.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 15,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:47:54.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.626356",
 *         "LONGITUDE": "127.074697",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 127.074697,
 *                 37.626356
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:47:54.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 16,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T05:47:59.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.541",
 *         "LONGITUDE": "126.986",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 126.986,
 *                 37.541
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T05:47:59.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 20,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T13:10:00.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "37.541",
 *         "LONGITUDE": "126.986",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 126.986,
 *                 37.541
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T13:10:00.000Z",
 *         "DISTANCE": null,
 *         "tt_product_images": []
 *     },
 *     {
 *         "PRODUCT_ID": 22,
 *         "SUBJECT": "SUBJECT 1",
 *         "PRIORITY": 1,
 *         "PRODUCT_CATEGORY_ID": 1,
 *         "PRODUCT_PRICE": 30000,
 *         "PRODUCT_SIZE": "1024x1024",
 *         "PRODUCT_WEIGHT": 500,
 *         "CONTENTS": "CONTENTS 1",
 *         "SELLER_USER_ID": 4,
 *         "SELLER_USER_IPv4": 0,
 *         "SELLER_USER_IPv6": null,
 *         "UPLOAD_TIME": "2022-12-27T13:20:08.000Z",
 *         "TAG": "TAG 1",
 *         "ADDRESS": "ADDRESS 1",
 *         "LATITUDE": "10",
 *         "LONGITUDE": "120",
 *         "LOCATION": {
 *             "type": "Point",
 *             "coordinates": [
 *                 120,
 *                 10
 *             ]
 *         },
 *         "UPDATE_USER_ID": 4,
 *         "UPDATE_USER_IPv4": 0,
 *         "UPDATE_USER_IPv6": null,
 *         "UPDATE_DATE": "2022-12-27T13:20:08.000Z",
 *         "DISTANCE": null,
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
async function getByCategories(
  req: IReq<{ categories: [number] }>,
  res: IRes) {
  const {categories} = req.body;
  const {longitude, latitude} = res.locals.location.location;
  const products = await productService.getByCategories(longitude, latitude, categories);
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
 * @apiParam {Number} longitude
 * @apiParam {Number} latitude
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "PRODUCT_ID": 16,
 *     "SUBJECT": "SUBJECT 1",
 *     "PRIORITY": 1,
 *     "PRODUCT_CATEGORY_ID": 1,
 *     "PRODUCT_PRICE": 30000,
 *     "PRODUCT_SIZE": "1024x1024",
 *     "PRODUCT_WEIGHT": 500,
 *     "CONTENTS": "CONTENTS 1",
 *     "SELLER_USER_ID": 4,
 *     "SELLER_USER_IPv4": 0,
 *     "SELLER_USER_IPv6": null,
 *     "UPLOAD_TIME": "2022-12-27T05:47:59.000Z",
 *     "TAG": "TAG 1",
 *     "ADDRESS": "ADDRESS 1",
 *     "LATITUDE": "37.541",
 *     "LONGITUDE": "126.986",
 *     "LOCATION": {
 *         "type": "Point",
 *         "coordinates": [
 *             126.986,
 *             37.541
 *         ]
 *     },
 *     "UPDATE_USER_ID": 4,
 *     "UPDATE_USER_IPv4": 0,
 *     "UPDATE_USER_IPv6": null,
 *     "UPDATE_DATE": "2022-12-27T05:47:59.000Z",
 *     "tt_product_images": [],
 *     "SELLER_USER": {
 *         "NICKNAME": "꼬리무123",
 *         "PROFILE_IMAGE": null,
 *         "USER_ID": 4
 *     }
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

//사진 삭제 API / productImageId -> PRIORITY

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
 *     "ADDRESS": "ADDRESS 1",
 *     "LATITUDE": "10",
 *     "LONGITUDE":"120"
 *   }
 * }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
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
 * @api {post} /products/image/upload Add product image file
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
  const result =
    await productService.uploadImage(productId, file, res.locals.user, getClientIP(req));
  return res.status(HttpStatusCodes.CREATED).json(result).end();
}

/**
 * @api {post} /products/image/order Set Image order
 * @apiName AddProductImage
 * @apiGroup Product
 *
 * @apiPermission normalUser
 *
 *
 * @apiParamExample {json} Request-Example:
 * [{ PRODUCT_IMAGE_ID: number, PRIORITY: number },
 * { PRODUCT_IMAGE_ID: number, PRIORITY: number }
 * ]
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
async function setImageOrder(req: IReq<[{ PRODUCT_IMAGE_ID: number, PRIORITY: number }]>, res: IRes)
{
  const priorities = req.body;
  await productService.setImageOrder(priorities);
  return res.status(HttpStatusCodes.CREATED).end();
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
 * @api {delete} /products/image/delete/:id delete product
 * @apiName DeleteProductImage
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
 *       "error": "ImageNotFound"
 *     }
 */
async function _imageDelete(req: IReq, res: IRes) {
  const id = +req.params.id;
  await productService.deleteImage(res.locals.user, id);
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
async function getCategories(req: IReq, res: IRes) {
  logger.info("TEST");
  const categories = await tt_product_category.findAll();
  return res.status(HttpStatusCodes.OK).json(categories).end();
}


// **** Export default **** //

export default {
  paths,
  getAll,
  getCategories,
  getByCategory,
  getById,
  add,
  setImageOrder,
  imageUpload,
  _imageDelete,
  update,
  delete: _delete,
  getByCategories,
} as const;
