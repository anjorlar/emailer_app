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
        }).catch(err => console.log('error finding user by id', err))
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then((existingUuser) => {
                    if (existingUuser) {
                        console.log('user already exist')
                        done(null, existingUuser)
                    } else {
                        new User({ googleId: profile.id }).save()
                            .then(user => done(null, user))
                            .catch(error => console.log('error saving user', error))
                    }
                }).catch(e => console.log('error getting exsiting user', e))
        }
    )
);

