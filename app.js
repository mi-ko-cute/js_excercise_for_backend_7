const express = require('express');
const commentsRouters = require('./routers/comments');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/comments', commentsRouters);


module.exports = app;