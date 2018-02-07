const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const TreeNode = require('./api/models/node');
const apiRouter = require('./api/apiRouter');

const dbConnectString = process.env.CONN_STRING || 'mongodb://localhost:27017/LeanStratreegery';
mongoose.connect(dbConnectString);
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use('/', express.static(path.join(__dirname, 'app/build')));

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on port ${port}`);
