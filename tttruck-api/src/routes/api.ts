import {Router} from 'express';
import jetValidator from 'jet-validator';

import {adminMw, normalUserMw} from '@src/routes/shared/userCheckMw';
import productRoutes from '@src/routes/product-routes';
import authRoutes from "@src/routes/auth-routes";
import noticeRoutes from "@src/routes/notice-routes";
import {
  getS3ImageMulter,
  getS3VideoMulter,
} from "@src/routes/shared/awsMultipart";
import tradeRoutes from "@src/routes/trade-routes";
import {locationCheck} from "@src/routes/shared/locationCheck";
import tradeReviewRoutes from "@src/routes/trade-review-routes";
import chatRoutes from "@src/routes/chat-routes";
import {paginationCheck} from "@src/routes/shared/paginationCheck";
import badgeRoutes from "@src/routes/badge-routes";
import truckerCenterRoutes from "@src/routes/trucker-center-routes";
import imageRoutes from "@src/routes/image-routes";
import userRoutes from "@src/routes/user-routes";
import alarmRoutes from "@src/routes/alarm-routes";
// **** Init **** //

const apiRouter = Router(),
  validate = jetValidator();

const imageRouter = Router();

imageRouter.get(
  imageRoutes.paths.getResizedImage,
  imageRoutes.getResizedImage,
);
apiRouter.use(
  imageRoutes.paths.basePath,
  imageRouter,
);

const alarmRouter = Router();
alarmRouter.get(
  alarmRoutes.paths.getAlarm,
  normalUserMw,
  alarmRoutes.getAlarm,
);
alarmRouter.get(
  alarmRoutes.paths.getNewAlarm,
  normalUserMw,
  alarmRoutes.getNewAlarm,
);
alarmRouter.post(
  alarmRoutes.paths.sendAlarm,
  normalUserMw,
  alarmRoutes.sendAlarm,
);
alarmRouter.post(
  alarmRoutes.paths.registerFCMToken,
  normalUserMw,
  alarmRoutes.registerFCMToken,
);
apiRouter.use(
  alarmRoutes.paths.basePath,
  alarmRouter,
);

const chatRouter = Router();
const chatImageMulter = getS3ImageMulter('chat/image');
const chatVideoMulter = getS3VideoMulter('chat/video');

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
chatRouter.post(
  chatRoutes.paths.sendImageMessage,
  normalUserMw,
  chatImageMulter.single('file'),
  chatRoutes.sendImageMessage,
);
chatRouter.post(
  chatRoutes.paths.sendVideoMessage,
  normalUserMw,
  chatVideoMulter.single('file'),
  chatRoutes.sendVideoMessage,
);


apiRouter.use(
  chatRoutes.paths.basePath,
  chatRouter,
);

const userRouter = Router();

userRouter.get(
  userRoutes.paths.get,
  adminMw,
  userRoutes.getAll,
);

userRouter.get(
  userRoutes.paths.getSignOut,
  adminMw,
  userRoutes.getSignOut,
);

userRouter.post(
  userRoutes.paths.getByFilter,
  adminMw,
  userRoutes.getByFilter,
);

apiRouter.use(
  userRoutes.paths.basePath,
  userRouter,
);

// **** Setup auth routes **** //

const authRouter = Router();
const profileImageMulter = getS3ImageMulter('profile');

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
  authRoutes.paths.resetPassword,
  normalUserMw,
  authRoutes.resetPassword,
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
  authRoutes.paths.phoneRequestPwAuth,
  validate('phone'),
  authRoutes.phoneRequestPwAuth,
);
authRouter.post(
  authRoutes.paths.phonePwCheckAuth,
  authRoutes.phonePwCheckAuth,
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

// **** Setup badge routes **** //

const badgeRouter = Router();
const badgeImageMulter = getS3ImageMulter('badge/image');

badgeRouter.get(badgeRoutes.paths.getUserBadges,normalUserMw,badgeRoutes.getUserBadges);
badgeRouter.get(badgeRoutes.paths.getBadges,adminMw,badgeRoutes.getBadges);
badgeRouter.get(badgeRoutes.paths.getBadge,adminMw,badgeRoutes.getBadge);
badgeRouter.put(badgeRoutes.paths.setRepresentBadge, normalUserMw, badgeRoutes.setRepresentBadge);

badgeRouter.post(badgeRoutes.paths.addBadge,adminMw,badgeRoutes.addBadge);
badgeRouter.post(badgeRoutes.paths.checkBadgeAvailable, normalUserMw, badgeRoutes.checkBadgeAvailable);
badgeRouter.put(badgeRoutes.paths.updateBadge,adminMw,badgeRoutes.updateBadge);
badgeRouter.delete(badgeRoutes.paths.deleteBadge,adminMw,badgeRoutes.deleteBadge);


badgeRouter.post(
  badgeRoutes.paths.setActiveImage,
  adminMw,
  badgeImageMulter.single('file'),
  badgeRoutes.setActiveImage,
);
badgeRouter.post(
  badgeRoutes.paths.setFalseImage,
  adminMw,
  badgeImageMulter.single('file'),
  badgeRoutes.setFalseImage,
);

apiRouter.use(badgeRoutes.paths.basePath,badgeRouter);

// **** Setup product routes **** //



const productRouter = Router();
const productImageMulter = getS3ImageMulter('product/image');

// Get all products
productRouter.post(
  productRoutes.paths.getByFilter,
  productRoutes.getByFilter);

productRouter.post(
  productRoutes.paths.getMinMaxPrice,
  productRoutes.getMinMaxPrice);

productRouter.get(
  productRoutes.paths.getAll,
  locationCheck,
  productRoutes.getAll);

productRouter.get(
  productRoutes.paths.getByCategories,
  locationCheck,
  productRoutes.getByCategories);

productRouter.get(productRoutes.paths.getCategories, productRoutes.getCategories);

// Get products by category
productRouter.get(
  productRoutes.paths.getByCategory,
  locationCheck,
  productRoutes.getByCategory);

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
);

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
const noticeImageMulter = getS3ImageMulter('notice/image');

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

// Update a notice
noticeRouter.put(
  noticeRoutes.paths.associateTempImage,
  adminMw,
  noticeRoutes.associateTempImage,
);
noticeRouter.put(
  noticeRoutes.paths.updateTopfix,
  adminMw,
  noticeRoutes.updateTopfix,
);

noticeRouter.post(
  noticeRoutes.paths.imageUpload,
  //validate(["productId","number","body"]),
  adminMw,
  noticeImageMulter.single('file'),
  noticeRoutes.imageUpload,
);

noticeRouter.post(
  noticeRoutes.paths.uploadTempImages,
  //validate(["productId","number","body"]),
  adminMw,
  noticeImageMulter.single('file'),
  noticeRoutes.uploadTempImages,
);

// Delete one notice
noticeRouter.delete(
  noticeRoutes.paths.delete,
  validate(['id', 'number', 'params']),
  adminMw,
  noticeRoutes.delete,
);
apiRouter.use(noticeRoutes.paths.basePath, noticeRouter);

// **** Setup TruckerCenter routes **** //

const truckerCenterRouter = Router();
const truckerCenterImageMulter = getS3ImageMulter('truckercenter/image');

// Get notice categories
truckerCenterRouter.get(truckerCenterRoutes.paths.getCategories, truckerCenterRoutes.getCategories);

// Get all notices
truckerCenterRouter.get(truckerCenterRoutes.paths.getAll, truckerCenterRoutes.getAll);

// Get notices by category
truckerCenterRouter.get(truckerCenterRoutes.paths.getByCategory, truckerCenterRoutes.getByCategory);

// Get notice by ID
truckerCenterRouter.get(truckerCenterRoutes.paths.getById, truckerCenterRoutes.getById);

// Add a notice
truckerCenterRouter.post(
  truckerCenterRoutes.paths.add,
  adminMw,
  truckerCenterRoutes.add,
);

// Update a notice
truckerCenterRouter.put(
  truckerCenterRoutes.paths.update,
  adminMw,
  truckerCenterRoutes.update,
);

truckerCenterRouter.post(
  truckerCenterRoutes.paths.imageUpload,
  //validate(["productId","number","body"]),
  adminMw,
  truckerCenterImageMulter.single('file'),
  truckerCenterRoutes.imageUpload,
);

truckerCenterRouter.post(
  truckerCenterRoutes.paths.uploadTempImages,
  //validate(["productId","number","body"]),
  adminMw,
  truckerCenterImageMulter.single('file'),
  truckerCenterRoutes.uploadTempImages,
);

// Update a notice
truckerCenterRouter.put(
  truckerCenterRoutes.paths.associateTempImage,
  adminMw,
  truckerCenterRoutes.associateTempImage,
);

truckerCenterRouter.put(
  truckerCenterRoutes.paths.updateTopfix,
  adminMw,
  truckerCenterRoutes.updateTopfix,
);



// Delete one notice
truckerCenterRouter.delete(
  noticeRoutes.paths.delete,
  validate(['id', 'number', 'params']),
  adminMw,
  truckerCenterRoutes.delete,
);
apiRouter.use(truckerCenterRoutes.paths.basePath, truckerCenterRouter);

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
tradeReviewRouter.delete(
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
