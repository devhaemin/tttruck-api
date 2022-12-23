import {Router} from 'express';
import jetValidator from 'jet-validator';

import {adminMw, normalUserMw} from './shared/userCheckMw';
import productRoutes from './product-routes';
import {tt_notice, tt_product} from "@src/models/init-models";
import authRoutes from "@src/routes/auth-routes";
import noticeRoutes from "@src/routes/notice-routes";
import {getS3Multer} from "@src/routes/shared/awsMultipart";
// **** Init **** //

const apiRouter = Router(),
  validate = jetValidator();


// **** Setup auth routes **** //

const authRouter = Router();

authRouter.get(
  authRoutes.paths.tokenLogin,
  normalUserMw,
  authRoutes.tokenLogin,
);
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


// **** Setup auth routes **** //

// **** Setup product routes **** //

const productRouter = Router();
const productImageMulter = getS3Multer('product/image');

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

productRouter.post(
  productRoutes.paths.imageUpload,
  //validate(["productId","number","body"]),
  normalUserMw,
  productImageMulter.single('file'),
  productRoutes.imageUpload,
);

// Delete one user
productRouter.delete(
  productRoutes.paths.delete,
  validate(['id', 'number', 'params']),
  normalUserMw,
  productRoutes.delete,
);
apiRouter.use(productRoutes.paths.basePath, productRouter);
// **** Setup Product routes **** //

// **** Setup Notice routes **** //

const noticeRouter = Router();
const noticeImageMulter = getS3Multer('notice/image');

// Get all products
noticeRouter.get(noticeRoutes.paths.getAll, noticeRoutes.getAll);

// Get products by category
noticeRouter.get(noticeRoutes.paths.getByCategory, noticeRoutes.getByCategory);

// Get product by ID
noticeRouter.get(noticeRoutes.paths.getById, noticeRoutes.getById);

// Add a product
noticeRouter.post(
  noticeRoutes.paths.add,
  validate(['notice', typeof tt_notice]),
  adminMw,
  noticeRoutes.add,
);

// Update a product
noticeRouter.put(
  productRoutes.paths.update,
  validate(['notice', typeof tt_notice]),
  adminMw,
  productRoutes.update,
);

noticeRouter.post(
  noticeRoutes.paths.imageUpload,
  //validate(["productId","number","body"]),
  adminMw,
  noticeImageMulter.single('file'),
  noticeRoutes.imageUpload,
);

// Delete one user
noticeRouter.delete(
  noticeRoutes.paths.delete,
  validate(['id', 'number', 'params']),
  adminMw,
  noticeRoutes.delete,
);
apiRouter.use(noticeRoutes.paths.basePath, noticeRouter);
// **** Setup Product routes **** //

// **** Export default **** //

// Add userRouter
export default apiRouter;
