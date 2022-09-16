const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid');

const {S3_BUCKET_URL, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME} = require('../config/config');

const S3Bucket = new S3({
  region: 'us-east-1',
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY
});

const uploadPublicFile = (file = {}, itemType = '', itemId = '') => {

  const fileName = generateFileName(file.name, itemType, itemId);

  return S3Bucket.upload({
    ContentType: file.mimetype,
    ACL: 'public-read',
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Body: file.data
  }).promise();
};

const deleteFile = (url) => {
  const path = url.split(S3_BUCKET_URL).pop();

  return S3Bucket. deleteObject({
    Bucket: 'stepan-bucket',
    Key: path
  }).promise();
};

function generateFileName(fileName = '', itemType, itemId) {

  const extension = fileName.split('.').pop();

  return `${itemType}/${itemId}/${uuid.v1()}.${extension}`;
};


module.exports = {
  uploadPublicFile,
  deleteFile
};
