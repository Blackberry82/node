const express = require('express');
require('dotenv').config();

const {PORT} = require('./config/config');
const userRouter = require('./routers/user.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});