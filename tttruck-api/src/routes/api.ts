import {Router} from 'express';
import jetValidator from 'jet-validator';

import {normalUserMw} from './shared/userCheckMw';
import productRoutes from './product-routes';
import {tt_product} from "@src/models/init-models";
import authRoutes from "@src/routes/auth-routes";


// **** Init **** //

const apiRouter = Router(),
  validate = jetValidator();


// **** Setup auth routes **** //

const authRouter = Router();

// Login user
authRouter.post(
  authRoutes.paths.login,
  validate('phone', 'password'),
  authRoutes.login,
);
authRouter.post(
  authRoutes.paths.signup,
  validate("PHONE",
    "PASSWORD",
    "NICKNAME",
    "NAME",
    "INTERIOR_COMPANY_TF",
    "BIRTHDAY",
    "GENDER"),
  authRoutes.signup,
);
authRouter.post(
  authRoutes.paths.phoneRequestAuth,
  validate('phone'),
  authRoutes.phoneRequestAuth,
);

// Logout user
authRouter.get(authRoutes.paths.logout, authRoutes.logout);

// Add authRouter
apiRouter.use(authRoutes.paths.basePath, authRouter);

/*
// **** Setup user routes **** //

const userRouter = Router();

// Get all users
userRouter.get(userRoutes.paths.get, adminMw ,userRoutes.getAll);

// Add one user
userRouter.post(
  userRoutes.paths.add,
  adminMw,
  validate(['user', User.instanceOf]),
  userRoutes.add,
);

// Update one user
userRouter.put(
  userRoutes.paths.update,
  adminMw,
  validate(['user', User.instanceOf]),
  userRoutes.update,
);

// Delete one user
userRouter.delete(
  userRoutes.paths.delete,
  adminMw,
  validate(['id', 'number', 'params']),
  userRoutes.delete,
);

// Add userRouter
apiRouter.use(userRoutes.paths.basePath,
  adminMw,
  userRouter);
*/
const productRouter = Router();

// Get all products
productRouter.get(productRoutes.paths.getAll, productRoutes.getAll);

// Get products by category
productRouter.get(productRoutes.paths.getByCategory, productRoutes.getByCategory);

// Get product by ID
productRouter.get(productRoutes.paths.getById, productRoutes.getById);

// Add a product
productRouter.post(
  productRoutes.paths.add,
  validate(['product', typeof tt_product]),
  normalUserMw,
  productRoutes.add,
);

// Update a product
productRouter.put(
  productRoutes.paths.update,
  validate(['product', typeof tt_product]),
  normalUserMw,
  productRoutes.update,
);

// Delete one user
productRouter.delete(
  productRoutes.paths.delete,
  validate(['id', 'number', 'params']),
  normalUserMw,
  productRoutes.delete,
);
// **** Export default **** //

// Add userRouter
apiRouter.use(productRoutes.paths.basePath, productRouter);
export default apiRouter;
