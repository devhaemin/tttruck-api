import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import productService from '@src/services/product-service';
import { IReq, IRes } from './shared/types';
import { tt_product } from '@src/models/init-models';


// **** Variables **** //

// Paths
const paths = {
    basePath: '/products',
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;


// **** Functions **** //

/**
 * @api {get} /products/all Request All User List
 * @apiName GetProduct
 * @apiGroup Product
 *
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 *
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
async function getAll(_: IReq, res: IRes) {
    const products = await productService.getAll();
    console.log(products)
    return res.status(HttpStatusCodes.OK).json({ products });
}

/**
 * Add one user.
 */
async function add(req: IReq<{product: tt_product}>, res: IRes) {
    const { product } = req.body;
    console.log(product)
    await productService.addOne(product);
    return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{product: tt_product}>, res: IRes) {
    const { product } = req.body;
    await productService.updateOne(product);
    return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function _delete(req: IReq, res: IRes) {
    const id = +req.params.id;
    await productService.delete(id);
    return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
    paths,
    getAll,
    add,
    update,
    delete: _delete,
} as const;
