module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    open: true, //配置自动启动浏览器
    proxy: {
      '/apis': {
        //axios的配置：当遇到apis时替换成为target内的内容
        target: 'http://192.168.0.109:8083', // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/apis': '', // rewrite path
        },
      },
      '/api/stories/latest': {
        target: 'http://news-at.zhihu.com/api/4/stories/latest', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api/stories/latest': '',
        },
      },
      '/api/stories/content': {
        target: 'http://news-at.zhihu.com/api/4/news', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api/stories/content': '',
        },
      },
      '/api/stories/before': {
        target: 'http://news-at.zhihu.com/api/4/stories/before', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api/stories/before': '',
        },
      },
    },
  },
}