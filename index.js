const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');
console.log('>>>>>>>>>', keys.mongoURI)
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
}).then((res) => {
    console.log('connected to mongoose', res)
}).catch((e) => {
    console.log('err connecting', e)
    process.exit(1)
});

const app = express();
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //allows cookie to last for 30 days converted to milliseconds
    keys: [keys.cookieKey]
}));
// console.log('cokkies key', keys.cookieKey)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;

app.listen(PORT);


// mongodb+srv://anjy:<0luwatomisin>@cluster0-s91o5.mongodb.net/test
