const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// const path = require('path')
const cors = require('cors');

require('./models/user');
require('./services/passport');

//mongo connector
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('connected to mongoose')
}).catch((e) => {
    console.log('err connecting', e)
    process.exit(1)
});

const app = express();
// app.set('view engine', 'jsx');
// app.use(express.static(path.join(__dirname, '../server/client/build')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../server/client/build', 'index.html'));
// });
app.use(cors())
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //allows cookie to last for 30 days converted to milliseconds
    keys: [keys.cookieKey]
}));
// console.log('cokkies key', keys.cookieKey)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
