const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = 3000;

const index = require('./routes/index');
const api = require('./routes/api');
const auth = require('./routes/auth');
const app = express();

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname, 'client')));

// use morgan to log requests to the console
app.use(morgan('dev'));

//body parser midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', api);
app.use('/api/auth', auth);

app.listen(port, function () {
    console.log('server started at port' + port);
});

