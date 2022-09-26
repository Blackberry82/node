const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config({path: `./environments/${process.env.NODE_ENV}.env`});
const mongoose = require('mongoose');

const {PORT, MONGO_URL, NODE_ENV} = require('./config/config');
const runCronJobs = require('./cron');
const {userRouter, carRouter, authRouter} = require('./routers');
const errorHandler = require('./errors/errorHandler');
const swaggerDocument = require('./swagger.json');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors:'http://localhost:63342/'});

io.on('connection', (socket) => {
  console.log('========================');
  console.log(socket.id);
  console.log(socket.handshake.auth);
  console.log('========================');

  socket.on('message:create', (data) => {
    console.log(data);
    //EMIT EVENT TO SENDER
    // socket.emit('user:create', {name:'STEPAN', hard:2});
    //EMIT EVENT ALL USERS INCLUDE SENDER
    io.emit('user:create', {name:'STEPAN', hard:2});
    //EMIT EVENT ALL USERS EXCLUDE SENDER
        // socket.broadcast.emit('user:create', {name: 'OOOOHHHH', hard: 10});
  });
  socket.on('user:join', (data) => {
    const {roomId} = data;
    socket.join(roomId);
    //SEND TO ROOM MEMBERS EXCLUDE SENDER
    // socket.to(roomId).emit('room:newMember', {userName:socket.id});
    //SEND TO ROOM MEMBER INCLUDE SENDER
    io.to(roomId).emit('room:newMember', {userName:socket.id});
  });
});

if (NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({}));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);

app.get('/health', (req, res) => res.join('OK'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
