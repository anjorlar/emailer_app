const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    console.log(">>>>>>> Setup proxy is ever called");
    app.use('/auth/google', createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
    },
        "/api/*", {
        target: "http://localhost:5000",
        changeOrigin: true,
    }
    ));
};