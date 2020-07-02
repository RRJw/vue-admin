const webpack = require('webpack');
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue admin' // page title

module.exports = {
  publicPath: './',
  outputDir: 'dist', //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  productionSourceMap: false, // 是否打包.map文件
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8081',
    https: false, //是否使用https协议
    hotOnly: false, //是否开启热更新
    // proxy: {
    //   '/api': {
    //     target: 'http://101.37.156.176:8009', //API服务器的地址
    //     // target: 'http://120.27.93.160:8009', //API服务器的地址
    //     ws: true, //代理websockets
    //     changeOrigin: true, // 虚拟的站点需要更管origin
    //     pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  // configureWebpack: { //引入jquery
  //   name: name,
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       $: "jquery",
  //       jQuery: "jquery",
  //       "windows.jQuery": "jquery"
  //     })
  //   ]
  // },
  chainWebpack(config) {
    // 它可以提高第一屏的速度，建议开启预加载
    config.plugins.delete('preload')

    // 当有很多页面时，会产生很多无意义的请求
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 将elementUI拆分为单个包
                  priority: 20, // 重量需要大于libs和app，否则会被打包到libs或app中
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}