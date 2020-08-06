const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv/config');

//MIDDLEWARES
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

//ROUTES
const welcomeRoute = require('./routes/welcome');
app.use('/', welcomeRoute);

const blogRoute = require('./routes/blog');
app.use('/post', blogRoute);

//DATABSE CONNECTION
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to databse!');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started!');
});
