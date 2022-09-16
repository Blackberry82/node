module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',

  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/dataBase',

  ACCESS_SECRET_WORD: process.env.ACCESS_SECRET_WORD || 'ACCESS_WORD',
  REFRESH_SECRET_WORD: process.env.REFRESH_SECRET_WORD || 'REFRESH_WORD',

  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '5m',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '30d',

  NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL || 'test@gmail.com',
  NO_REPLAY_PASSWORD: process.env.NO_REPLAY_PASSWORD || 'email password',

  FRONTEND_URL: process.env.FRONTEND_URL || 'example.com',

  ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_SECRET || 'A_T_S',

  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_URL: process.env.S3_BUCKET_URL,


};
