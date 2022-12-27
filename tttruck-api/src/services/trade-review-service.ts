import {
  tt_notice,
  tt_notice_image,
  tt_trade_review,
  tt_user,
} from '@src/models/init-models';
import {RouteError} from '@src/declarations/classes';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import logger from "jet-logger";
import {tt_user_group} from "@src/models/dummy/tt_user_group";
import {S3File} from "@src/routes/shared/awsMultipart";
import {IReq, IRes} from "@src/routes/shared/types";


// **** Variables **** //

async function getByProduct():Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}
async function postSeller():Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}
async function postBuyer():Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}
async function update():Promise<tt_trade_review[]>{
  return tt_trade_review.findAll();
}

/*async */function _delete(req: IReq, res: IRes) {
  const id = +req.params.id;
  //await productService.delete(res.locals.user, id);
  return res.status(HttpStatusCodes.OK).end();
}



// **** Export default **** //

export default {
  getByProduct,
  postSeller,
  postBuyer,
  update,
  delete : _delete,
} as const;
