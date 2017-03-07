const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const db = require('./db');
const path = require('path');
const routes =  require("./routes.js");
// nunjucks will cache when in production, not in dev
const noCache = process.env.NOCACHE || false;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.use(express.static(path.join(__dirname,'node_modules')));

app.use('/', routes);
module.exports = app;
