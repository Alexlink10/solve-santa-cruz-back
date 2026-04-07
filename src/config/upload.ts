import multer from 'multer';
import AWS from 'aws-sdk';
import crypto from 'crypto';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
});

export const upload = multer({
  storage: multer.memoryStorage(),
});

export async function uploadToS3(file: Express.Multer.File) {
  const fileName = `${crypto.randomUUID()}-${file.originalname}`;

  const result = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();

  return result.Location;
}
