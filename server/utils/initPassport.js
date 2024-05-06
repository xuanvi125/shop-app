const passport = require("passport");
const User = require("../models/User.model");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const SERVER_URL = "https://shop-app-7lkl.vercel.app";
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${SERVER_URL}/api/v1/auth/google/callback`,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile.email }],
        });

        const { displayName, email, id, photos } = profile;
        if (!user) {
          const newUser = new User({
            name: displayName,
            email,
            googleId: id,
            image: photos[0].value,
          });
          user = await newUser.save({ validateBeforeSave: false });
        }
        done(null, user);
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${SERVER_URL}/api/v1/auth/facebook/callback`,
      },
      async function (accessToken, refreshToken, profile, cb) {
        let user = await User.findOne({
          facebookId: profile.id,
        });
        const { displayName, id } = profile;
        if (!user) {
          const newUser = new User({
            name: displayName,
            facebookId: id,
          });
          user = await newUser.save({ validateBeforeSave: false });
        }
        cb(null, user);
      }
    )
  );
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
