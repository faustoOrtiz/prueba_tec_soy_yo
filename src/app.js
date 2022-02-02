const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const apiRouter = require('./routes/index');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.set('port', process.env.PORT);


app.use(apiRouter);

app.listen(app.get('port'), (error) => {
    if (!error) {
        console.log(`Listen on port http://localhost:${app.get('port')}`);
    } else {
        console.log(error);
    }
});

module.exports = app;
