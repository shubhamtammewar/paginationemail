const express= require('express');
const userController = require('../src/controller/user.controller');
const app = express();
app.use(express.json());
app.use("/user",userController);
module.exports = app;