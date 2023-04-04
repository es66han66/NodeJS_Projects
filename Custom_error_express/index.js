const express = require('express');
const app = express();

const loginController = require('./login-controller.js');
const errorHandler = require('./error-handler.js');

app.post('/login', express.json(), loginController);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started on 3000")
});