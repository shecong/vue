const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,devServer: {
    proxy: {
      '/baidu': {
        target: ' https://api.1314.cool', // 设置代理目标
        changeOrigin: true, // 是否改变请求源
        pathRewrite: {
          '^/baidu': '' // 重写路径，将请求路径中的 '/api' 替换为空
        }
      },
      '/webo': {
        target: 'https://weibo.com', // 设置代理目标
        changeOrigin: true, // 是否改变请求源
        pathRewrite: {
          '^/webo': '' // 重写路径，将请求路径中的 '/api' 替换为空
        }
      }, 
      '/mock': {
        target: 'http://1.12.243.231:8082/', // 设置代理目标
        changeOrigin: true, // 是否改变请求源
        pathRewrite: {
          '^/mock': '/api' // 重写路径，将请求路径中的 '/api' 替换为/api
        }
      }, 
    }
  },
  lintOnSave : false,
  publicPath: '/IMHome',
  //只有Https才能使用录音
  devServer : {
    https : false,
    port : 9004
  }
}) 
 
