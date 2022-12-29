import { Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';

export const upload = async (file) => {
  const { originalname } = file;
  const bucketS3 = 'tassfiles/tdspirit';
  var a = await uploadS3(file.buffer, bucketS3, originalname);
  console.log(file);
  return a;
};
const uploadS3 = async (file, bucket, name) => {
  const s3 = getS3();
  const params = {
    Bucket: bucket,
    Key: String(name),
    Body: file,
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        Logger.error(err);
        reject(err.message);
      }
      resolve(data);
    });
  });
};
const getS3 = () => {
  return new S3({
    accessKeyId: 'AKIAJBSC5MAGGJ2BSKTQ',
    secretAccessKey: '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',
    region: 'ap-northeast-1',
  });
};
