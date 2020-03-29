var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();
var port = process.env.PORT || 3000;
var routes = require('./api/routes/route'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));


routes(app);

app.listen(port);
console.log()