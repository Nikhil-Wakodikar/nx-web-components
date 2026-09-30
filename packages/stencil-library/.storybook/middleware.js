const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function expressMiddleware(router) {
  // Proxy /api-proxy/* requests to the target server, bypassing CORS
  router.use(
    '/api-proxy',
    createProxyMiddleware({
      target: 'https://pushengineuat.bajajfinserv.in',
      changeOrigin: true,
      pathRewrite: { '^/api-proxy': '' },
      secure: false,
    })
  );
};
