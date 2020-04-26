const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        }).catch(err => console.log('error finding user by id', err));
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, async (accessToken, refreshToken, profile, done) => {
            console.log('accesstoken', accessToken)
            try {
                const existingUser = await User.findOne({ googleId: profile.id })
                console.log('existing user', existingUser);
                // we already have a record with the given profile ID
                if (existingUser) {
                    console.log('user already exist');
                    return done(null, existingUser)
                };
                try {
                    //we don't have a user with this ID, create a new user and save the user
                    const user = await new User({ googleId: profile.id }).save();
                    done(null, user);
                } catch (error) {
                    console.error('error saving new user', error);
                };
            } catch (err) {
                console.error('err getting existing user', err);
            };
        }
    )
);

