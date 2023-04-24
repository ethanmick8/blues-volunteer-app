const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

// local strat
passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }
));

// strat for GitHub OAuth
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ where: { githubId: profile.id } });
    if (existingUser) {
      done(null, existingUser);
    } else {
      const newUser = await User.create({
        githubId: profile.id,
        username: profile.username,
        email: profile.emails[0].value,
      });

      done(null, newUser);
    }
  } catch (err) {
      done(err, null);
    }
  }
));

passport.initialize();

module.exports = passport;