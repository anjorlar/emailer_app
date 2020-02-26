const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;

app.listen(PORT);


// mongodb+srv://anjy:<0luwatomisin>@cluster0-s91o5.mongodb.net/test
