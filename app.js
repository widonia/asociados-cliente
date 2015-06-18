'use strict';

/* dependencies */
var express     = require('express'),
    app         = express(),
    path        = require('path'),
    logger      = require('morgan'),
    bodyParser  = require('body-parser');



/* define modules and app config */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));


/* start app */
app.listen(4000, function(){
    console.log('server running');
});