import {Router} from 'express';
import jetValidator from 'jet-validator';

import {adminMw, normalUserMw} from '@src/routes/shared/userCheckMw';
import productRoutes from '@src/routes/product-routes';
import authRoutes from "@src/routes/auth-routes";
import noticeRoutes from "@src/routes/notice-routes";
import {getS3Multer} from "@src/routes/shared/awsMultipart";
import tradeRoutes from "@src/routes/trade-routes";
import {locationCheck} from "@src/routes/shared/locationCheck";
import tradeReviewRoutes from "@src/routes/trade-review-routes";
import chatRoutes from "@src/routes/chat-routes";
// **** Init **** //

const apiRouter = Router(),
  validate = jetValidator();

const chatRouter = Router();

chatRouter.get(
  chatRoutes.paths.getUserChannel,
  normalUserMw,
  chatRoutes.getUserChannel,
);
chatRouter.get(
  chatRoutes.paths.getChannelsByProductId,
  normalUserMw,
  chatRoutes.getChannelsByProductId,
);
chatRouter.get(
  chatRoutes.paths.getChannelById,
  normalUserMw,
  chatRoutes.getChannelById,
);

chatRouter.post(
  chatRoutes.paths.createChannel,
  normalUserMw,
  chatRoutes.createChannel,
);

chatRouter.post(
  chatRoutes.paths.sendMessage,
  normalUserMw,
  chatRoutes.sendMessage,
);

apiRouter.use(
  chatRoutes.paths.basePath,
  chatRouter,
);
// **** Setup auth routes **** //

const authRouter = Router();
const profileImageMulter = getS3Multer('profile');

authRouter.get(
  authRoutes.paths.generateNickname,
  authRoutes.generateNickname,
);

authRouter.get(
  authRoutes.paths.tokenLogin,
  normalUserMw,
  authRoutes.tokenLogin,
);
authRouter.put(
  authRoutes.paths.updateProfile,
  normalUserMw,
  authRoutes.updateProfile,
);
// Login user
authRouter.post(
  authRoutes.paths.login,
  authRoutes.login,
);
authRouter.post(
  authRoutes.paths.signup,
  authRoutes.signup,
);
authRouter.post(
  authRoutes.paths.phoneRequestAuth,
  validate('phone'),
  authRoutes.phoneRequestAuth,
);
authRouter.post(
  authRoutes.paths.phoneCheckAuth,
  authRoutes.phoneCheckAuth,
);
authRouter.post(
  authRoutes.paths.profileImageUpload,
  normalUserMw,
  profileImageMulter.single('file'),
  authRoutes.profileImageUpload,
);
authRouter.post(
  authRoutes.paths.signout,
  normalUserMw,
  authRoutes.signout,
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
productRouter.get(productRoutes.paths.getAll, locationCheck, productRoutes.getAll);

productRouter.get(
  productRoutes.paths.getByCategories,
  locationCheck,
  productRoutes.getByCategories);

productRouter.get(productRoutes.paths.getCategories, productRoutes.getCategories);

// Get products by category
productRouter.get(productRoutes.paths.getByCategory, locationCheck, productRoutes.getByCategory);

// Get product by ID
productRouter.get(productRoutes.paths.getById, productRoutes.getById);

// Add a product
productRouter.post(
  productRoutes.paths.add,
  //validate(['product', typeof tt_product]),
  normalUserMw,
  productRoutes.add,
);

// Update a product
productRouter.put(
  productRoutes.paths.update,
  normalUserMw,
  productRoutes.update,
);

productRouter.put(
  productRoutes.paths.updateStatus,
  normalUserMw,
  productRoutes.updateStatus,
)

productRouter.post(
  productRoutes.paths.imageUpload,
  normalUserMw,
  productImageMulter.single('file'),
  productRoutes.imageUpload,
);

productRouter.post(
  productRoutes.paths.setImageOrder,
  normalUserMw,
  productRoutes.setImageOrder,
);

// Delete one product
productRouter.delete(
  productRoutes.paths.delete,
  validate(['id', 'number', 'params']),
  normalUserMw,
  productRoutes.delete,
);
productRouter.delete(
  productRoutes.paths._imageDelete,
  validate(['id', 'number', 'params']),
  normalUserMw,
  productRoutes._imageDelete,
);
apiRouter.use(productRoutes.paths.basePath, productRouter);
// **** Setup Product routes **** //

// **** Setup Notice routes **** //

const noticeRouter = Router();
const noticeImageMulter = getS3Multer('notice/image');

// Get notice categories
noticeRouter.get(noticeRoutes.paths.getCategories, noticeRoutes.getCategories);

// Get all notices
noticeRouter.get(noticeRoutes.paths.getAll, noticeRoutes.getAll);

// Get notices by category
noticeRouter.get(noticeRoutes.paths.getByCategory, noticeRoutes.getByCategory);

// Get notice by ID
noticeRouter.get(noticeRoutes.paths.getById, noticeRoutes.getById);

// Add a notice
noticeRouter.post(
  noticeRoutes.paths.add,
  adminMw,
  noticeRoutes.add,
);

// Update a notice
noticeRouter.put(
  noticeRoutes.paths.update,
  adminMw,
  noticeRoutes.update,
);

noticeRouter.post(
  noticeRoutes.paths.imageUpload,
  //validate(["productId","number","body"]),
  adminMw,
  noticeImageMulter.single('file'),
  noticeRoutes.imageUpload,
);

// Delete one notice
noticeRouter.delete(
  noticeRoutes.paths.delete,
  validate(['id', 'number', 'params']),
  adminMw,
  noticeRoutes.delete,
);
apiRouter.use(noticeRoutes.paths.basePath, noticeRouter);
// **** Setup Product routes **** //

// **** Setup Trade routes **** //
const tradeRouter = Router();

tradeRouter.get(
  tradeRoutes.paths.getUserBought,
  normalUserMw,
  tradeRoutes.getUserBought);

tradeRouter.get(
  tradeRoutes.paths.getUserSold,
  normalUserMw,
  tradeRoutes.getUserSold);

tradeRouter.put(
  tradeRoutes.paths.doTrade,
  normalUserMw,
  tradeRoutes.doTrade);

apiRouter.use(tradeRoutes.paths.basePath, tradeRouter);
// **** Setup Trade routes **** //

// **** Setup Trade review Routes **** //
const tradeReviewRouter = Router();

// Get trade review by product_id
tradeReviewRouter.get(tradeReviewRoutes.paths.getByProduct,
  normalUserMw,
  tradeReviewRoutes.getByProduct);

// Add a seller review on product
tradeReviewRouter.post(
  tradeReviewRoutes.paths.postSeller,
  normalUserMw,
  tradeReviewRoutes.postSeller,
);

// Add a buyer review on product
tradeReviewRouter.post(
  tradeReviewRoutes.paths.postBuyer,
  normalUserMw,
  tradeReviewRoutes.postBuyer,
);

// Update a review
tradeReviewRouter.put(
  tradeReviewRoutes.paths.update,
  normalUserMw,
  tradeReviewRoutes.update,
);

// Delete one user
noticeRouter.delete(
  tradeReviewRoutes.paths.delete,
  validate(['id', 'number', 'params']),
  adminMw,
  tradeReviewRoutes.delete,
);
apiRouter.use(tradeReviewRoutes.paths.basePath, tradeReviewRouter);

// **** Setup Trade review Routes **** //
// **** Export default **** //

// Add userRouter
export default apiRouter;
