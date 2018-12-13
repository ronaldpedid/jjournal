const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('../server/api/config/config')
const keys = require('../server/keys/init');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');


const setUserOnLocalsMiddleware = require('../server/middleware/user-local');
const app = express();

mongoose.Promise = global.Promise;
const db = require('./api/config/config').mongo.connectionString;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.log(err));

const PORT = '4000';

app.use(morgan('default'));

app.use(require('./middleware/health')());

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(session({
  store: new MongoStore({ url: config.mongo.connectionString }),
  secret: keys.secret,
  maxAge: 60 * 60 * 1000, // ms; lasts for one hour
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 216000000
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(setUserOnLocalsMiddleware());



// Handle static files
app.use(
  (req, res, next) => {
    next();
  },
  express.static(path.join(__dirname, '../client/www'), { fallthrough: true })
);



// Uploads
app.use('/public', express.static('public'));

// API Routes
require('./api/routes/')(app);

// Everything else to index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(process.env.PORT || PORT, () => console.log(`server started on port: ${PORT}`));


return app;
