const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://music-web-node-app.onrender.com/",
      changeOrigin: true,
    })
  );
};
