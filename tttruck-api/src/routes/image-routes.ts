import {IReqQuery, IRes} from './shared/types';
import {uploadImage} from "@src/routes/shared/awsMultipart";
import sharp from "sharp";
import axios from "axios";

// **** Variables **** //

const cdnPath = "https://cdn.tttruck.co.kr/";
// Paths
const paths = {
  basePath: '/image',
  getResizedImage: '/get',
} as const;

/**
 * @api {GetResizedImage} /image/get Get Resized Image
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
  const width = req.query.width ? Number(req.query.width) : 256;
  const height = req.query.height ? Number(req.query.height) : 256;
  const imageUrl = cdnPath + key;
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
    console.log(err);
  }

  const input = (await axios({
    url: imageUrl,
    responseType: "arraybuffer",
  })).data as Buffer;
  //const composite = (await axios({ url: "https://somewhere.com/another-image.png", responseType: "arraybuffer" })).data as Buffer;

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