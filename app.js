const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
MongoClient = require('mongodb').MongoClient;
const middlewares = require("./middlewares/middlewares");

require('dotenv').config();

// mongoose connection
let connectionString=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-8yki5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
require("./routes/routes")(app)
console.log(connectionString)

app.use(middlewares.incorrectRoutes);

MongoClient.connect(connectionString, {useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
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