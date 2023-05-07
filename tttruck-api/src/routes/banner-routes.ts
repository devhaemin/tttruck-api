import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {IReq, IRes} from "@src/routes/shared/types";

// **** Variables **** //

// Paths
const paths = {
  basePath: '/banners',
  getAll: '/all',
} as const;


// **** Functions **** //

/**
 * @api {get} /banners/all Get All Banner List
 * @apiName GetBanner
 * @apiGroup Banner
 *
 * @apiPermission none
 *
 * @apiSuccess {String} Nothing
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 * ]
 *
 *
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BannerNotFound"
 *     }
 */
// async function getAll(req: IReq, res: IRes) {
//   // const userGroup = await getUser(req);
//   // let notices;
//   // if(userGroup == tt_user_group.ADMIN){
//   //   notices = await noticeService.getAllByAdmin();
//   // }else{
//   //   notices = await noticeService.getAll();
//   // }
//   // logger.info(notices);
//   // //todo 이미지 Array 추가되게끔 하기.
//   return res.status(HttpStatusCodes.OK).json(notices);
// }


// **** Export default **** //

export default {
  paths,
  //getAll
} as const;
