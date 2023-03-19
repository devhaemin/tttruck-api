import {IReqQuery, IRes} from './shared/types';
import {uploadImage} from "@src/routes/shared/awsMultipart";
import sharp from "sharp";
import axios from "axios";
import logger from "jet-logger";

// **** Variables **** //

const cdnPath = "https://cdn.tttruck.co.kr/";
// Paths
const paths = {
  basePath: '/image',
  getResizedImage: '/get',
} as const;

/**
 * @api {Get} /image/get Get Resized Image
 * @apiName GetResizedImage
 * @apiGroup Image
 * @apiPermission none
 * @apiParamExample {json} Request-Example:
 *     {
 *       "key": "product/image/1676973046614_F7B67F01-E990-41CC-91BA-032DDA033A51.jpeg",
 *       "width": 256,
 *       "height": 256
 *     }
 *
 *
 */

async function getResizedImage(req: IReqQuery<{ key: string, width: string, height: string }>, res: IRes) {

  const key = req.query.key;
  const imageUrl = cdnPath + key;
  res.set("Content-Type", "image/jpeg");
  if (!req.query.width || !req.query.height) {
    const original = (await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    })).data as Buffer;
    return sharp(original)
      .withMetadata()
      .pipe(res);
  }
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  const cacheUrl = cdnPath + "resizedCache/" + String(width) + "x" + String(height) + "/" + key;
  try {
    const checkCache = (await axios({
      url: cacheUrl,
      responseType: "arraybuffer",
    })).data as Buffer;
    return sharp(checkCache)
      .withMetadata()
      .pipe(res);
  } catch (err) {
    logger.err(err);
  }

  const input = (await axios({
    url: imageUrl,
    responseType: "arraybuffer",
  })).data as Buffer;

  const resizedImage = await sharp(input)
    .resize(width, height)
    .withMetadata()
    .jpeg()
    .toBuffer();
  const newCacheKey = "resizedCache/" + String(width) + "x" + String(height) + "/" + key;
  uploadImage(resizedImage, newCacheKey);
  return sharp(resizedImage)
    .withMetadata()
    .pipe(res);
}

export default {
  paths,
  getResizedImage,
} as const;