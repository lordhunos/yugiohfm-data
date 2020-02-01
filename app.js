const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

//Initializations
const app = express();

//Database
const database = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next();
});

//Routes
app.use(routes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});