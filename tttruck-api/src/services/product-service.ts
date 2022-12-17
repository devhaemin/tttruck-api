import {tt_product} from '@src/models/init-models';
import { RouteError } from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';


// **** Variables **** //

export const prodNotFoundErr = 'Product not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<tt_product[]> {
    let persists =  tt_product.findAll();
    console.log(persists);
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
function addOne(product: tt_product ): Promise<tt_product> {
    return tt_product.create(product);
}

/**
 * Update one user.
 */
async function updateOne(product: tt_product): Promise<tt_product> {
    const persists = await tt_product.findAll({where : {PRODUCT_ID :product.PRODUCT_ID}});
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            prodNotFoundErr,
        );
    }
    // Return user
    let affectedCount = await tt_product.update( product,{where : {PRODUCT_ID :product.PRODUCT_ID}});
    console.log(affectedCount);
    return product
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
    const persists = await tt_product.findAll({where : {PRODUCT_ID :id}});
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            prodNotFoundErr,
        );
    }
    // Delete user
    await tt_product.destroy({where : {PRODUCT_ID : id}});
}


// **** Export default **** //

export default {
    getAll,
    addOne,
    updateOne,
    delete: _delete,
} as const;
