const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const fileUpload = require('express-fileupload');
require('dotenv').config({path: `./environments/${process.env.NODE_ENV}.env`});
const mongoose = require('mongoose');

const {PORT, MONGO_URL, NODE_ENV} = require('./config/config');
const runCronJobs = require('./cron');
const {userRouter, carRouter, authRouter} = require('./routers');
const errorHandler = require('./errors/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {});

if (NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({}));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);

app.use('*',(req, res, next) => {
  next(new Error('Route not found'));
});

app.use(errorHandler);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('App listen', PORT);
  mongoose.connect(MONGO_URL);

  runCronJobs();
});
