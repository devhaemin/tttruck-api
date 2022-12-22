import {S3Client} from '@aws-sdk/client-s3';
import path from "path";
import multer = require("multer");
import multerS3 = require("multer-s3");
import logger from "jet-logger";
import {Multer} from "multer";

const accessKeyId = process.env.AWS_KEY_ID ? process.env.AWS_KEY_ID : "";
const secretAccessKey = process.env.AWS_SECRET_KEY ? process.env.AWS_SECRET_KEY : "";
const bucket = process.env.AWS_BUCKET_NAME ? process.env.AWS_BUCKET_NAME : "";
const region = process.env.AWS_REGION ? process.env.AWS_REGION : "";

const s3 = new S3Client({credentials: {accessKeyId, secretAccessKey}, region});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export interface S3File extends Express.Multer.File{
  size: number,//  바이트 크기
  bucket: string, //	버켓 이름
  key: string, // 파일이름
  acl: string, //이 파일에 대한 접근 권한
  contentType: string, // MIME 타입
  metadata: string, //	The metadata object to be sent to S3	S3Storage
  location: string, //	파일 url 경로	S3Storage
  contentDisposition: string //	The contentDisposition used to upload the file	S3Storage
  storageClass: string //	S3 티어 스토리지 클래스	S3Storage
  versionId: string //	S3 버저닝을 활성화했을시 부여되는 버전 아이디	S3Storage
  contentEncoding: string,
}

export function getS3Multer(dirPath: string): multer.Multer {
  return multer({
    storage: multerS3({

      // 저장 위치
      s3: s3,
      bucket: bucket,
      acl: "public-read",
      // eslint-disable-next-line @typescript-eslint/unbound-method
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(req, file, cb) {
        cb(null, dirPath + `/${Date.now()}_${path.basename(file.originalname)}`);
        // dirPath에 파일을 저장
      },
    }),
    //* 용량 제한
    limits: {fileSize: 4 * 1024 * 1024},
  });
}
