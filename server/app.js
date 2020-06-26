const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
//express related stuff
const express = require('express');
const app = express();
var router = express.Router();
const middlewares = require("./middlewares/middlewares");
// mongoose
const mongoose = require('mongoose');
// MongoClient = require('mongodb').MongoClient;
let connectionString=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-xiaj2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

/* ==============basic app config==================*/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
// app.locals.title = config.sitename;
app.use('/', express.static(path.join(__dirname, '../public')));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

/* ==============routing and middlewares==================*/
// require("./routes/routes")(app)
let customerRoutes=require("./routes/customer.routes")
app.use('/NutriNET', customerRoutes);
// app.use('/', router); // Mount the router as middleware at path /first
// In short, app.use('/first', router) mounts the middleware at path /first, then router.get sets the subpath accordingly.

app.use(middlewares.incorrectRoutes);

/* ==============connect to db and start server==================*/
console.log(connectionString)
mongoose.connect(connectionString, {useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
    if(err) {
        console.log(err);
    }
    else {
        console.log('connected to ' + connectionString);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`)
        })
    }
})