module.exports = {
  devServer: {
    proxy: 'http://sbytlk.cq58583.tmweb.ru',
    // proxy: {
    //   '/api': {
    //     target: 'http://10.0.0.18:3000',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
};
