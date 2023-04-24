const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('./passportConfig');
const usersRoutes = require('./backend/routes/users');

const sequelize = require('./backend/config/database');
const User = require('./models/User');

const app = express();
app.use(express.json());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Enable CORS
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: 'super secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', usersRoutes);

// Initialize the database and sync models
sequelize.sync()
  .then(() => {
    console.log('Database synced and models created');
  })
  .catch((err) => {
    console.error('Error syncing the database and creating models', err.stack);
  });

/*app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));*/
/*app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Login failed', error: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
});*/


app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to VMS Blues." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});