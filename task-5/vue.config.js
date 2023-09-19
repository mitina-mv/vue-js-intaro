const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      filename: 'js/masha_[name].js',
    }
  },
  chainWebpack: config => {
    config.module
    .rule('raw')
    .test(/\.txt$/)
    .use('raw-loader')
    .loader('raw-loader')
    .end()
     }
})
