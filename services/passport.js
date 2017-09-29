const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./../config/keys");

const Users = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // callbackURL: "/auth/google/callback",
      callbackURL: 'https://sleepy-escarpment-82316.herokuapp.com/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      Users.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser); // first argu: err is null, second argu: exist user
        } else {
          new Users({ googleId: profile.id })
            .save()
            .then(user => done(null, user)); // save() put the model instance into mongodb collection
        }
      });
    }
  )
);
