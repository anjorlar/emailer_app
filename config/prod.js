//prod.js -- production keys here
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    sendGridKey: process.env.SEND_GRID_KEY
};


//emailer-app-API-key for send grid
// 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