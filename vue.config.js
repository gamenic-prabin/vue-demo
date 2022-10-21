module.exports = {
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-demo/'
    : '/'
}