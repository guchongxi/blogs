---
title:  "vue-webpack 模版配置文件说明"
date:   2017-03-09
categories: 文档
tag: vue webpack config
---


![Vue](/assets/img/2017-03-09/logo.png)


*   [文件结构](#p1)
*   [指令分析](#p2)
*   [build文件夹分析](#p3)
    *   [build/dev-server.js](#p31)
    *   [build/webpack.base.conf.js](#p32)
    *   [build/webpack.dev.conf.js](#p33)
    *   [build/utils.js和build/vue-loader.conf.js](#p34)
    *   [build/build.js](#p35)
    *   [build/webpack.prod.conf.js](#p36)
    *   [build/check-versions.js和build/dev-client.js](#p37)
*   [config文件夹分析](#p4)
    *   [config/index.js](#p41)
    *   [config/dev.env.js、config/prod.env.js和config/test.env.js](#p42)
*   [其它](#p5)
    *   [vue-cli的webpack项目，webpack-hot-middleware热加载热部署有时候不刷新页面](#p51)

---

<h2 id="p1">文件结构</h2>

本文主要分析开发（dev）和构建（build）两个过程涉及到的文件，故下面文件结构仅列出相应的内容。

  ├─build <br/>
  │   ├─build.js <br/>
  │   ├─check-versions.js <br/>
  │   ├─dev-client.js <br/>
  │   ├─dev-server.js <br/>
  │   ├─utils.js <br/>
  │   ├─vue-loader.conf.js <br/>
  │   ├─webpack.base.conf.js <br/>
  │   ├─webpack.dev.conf.js <br/>
  │   ├─webpack.prod.conf.js <br/>
  │   └─webpack.test.conf.js <br/>
  ├─config <br/>
  │   ├─dev.env.js <br/>
  │   ├─index.js <br/>
  │   ├─prod.env.js <br/>
  │   └─test.env.js <br/>
  ├─... <br/>
  └─package.json 

<h2 id="p2">指令分析</h2>

首先看package.json里面的scripts字段，
{% highlight js %}
    "scripts": {
      "dev": "node build/dev-server.js",
      "build": "node build/build.js",
      "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
      "e2e": "node test/e2e/runner.js",
      "test": "npm run unit && npm run e2e",
      "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs"
     }
{% endhighlight %}

测试的东西先不看，直接看”dev”和”build”。运行”npm run dev”的时候执行的是build/dev-server.js文件，运行”npm run build”的时候执行的是build/build.js文件，我们可以从这两个文件开始进行代码阅读分析。

<h2 id="p3">build文件夹分析</h2>

<h3 id="p31">build/dev-server.js</h3>

首先来看执行”npm run dev”时候最先执行的build/dev-server.js文件。
{% highlight js %}
    /*
    * 执行”npm run dev”时候最先执行此文件
     1. 检查node和npm的版本
     2. 引入相关插件和配置
     3. 创建express服务器和webpack编译器
     4. 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
     5. 挂载代理服务和中间件
     6. 配置静态资源
     7. 启动服务器监听特定端口（8080）
     8. 自动打开浏览器并打开特定网址（localhost:8080）
    */
    
    // 检查NodeJS和npm的版本
    require('./check-versions')()
    
    // 获取配置
    var config = require('../config')
    // 如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的配置作为当前的环境
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
    }
    
    // 一个可以调用默认软件打开网址、图片、文件等内容的插件
    // 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080
    var opn = require('opn')
    // 引入nodejs的path模块，进行一些路径的操作，详情可以查看node官方的api
    var path = require('path')
    // 引入nodejs的一个框架express,可以帮助我们快速搭建一个node服务 github https://github.com/expressjs/express
    var express = require('express')
    // 引入node为webpack提供的一个模块服务 github https://github.com/webpack/webpack
    var webpack = require('webpack')
    
    // 一个express中间件，用于将http请求代理到其他服务器 https://github.com/chimurai/http-proxy-middleware
    // 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
    // 这里使用该插件可以将前端开发中涉及到的请求代理到API服务器上，方便与服务器对接
    var proxyMiddleware = require('http-proxy-middleware')
    
    // 根据 Node 环境来引入相应的 webpack 配置
    var webpackConfig = process.env.NODE_ENV === 'testing'
      ? require('./webpack.prod.conf')
      : require('./webpack.dev.conf')
    
    // dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
    var port = process.env.PORT || config.dev.port
    
    // 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
    var autoOpenBrowser = !!config.dev.autoOpenBrowser
    
    // // 获取需要代理的服务api
    var proxyTable = config.dev.proxyTable
    
    // 创建1个 express 实例
    var app = express()
    // 根据webpack配置文件创建Compiler对象
    var compiler = webpack(webpackConfig)
    
    // webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
    // 编译绑定后将得到的产物存放在内存中而没有写进磁盘
    // 将这个中间件交给express使用之后即可访问这些编译后的产品文件
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true
    })
    
    // webpack-hot-middleware，用于实现热重载功能的中间件 https://github.com/glenjamin/webpack-hot-middleware
    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {}
    })
    
    // 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })
    
    // 将 proxyTable 中的代理请求配置挂在到express服务器上 遍历代理的配置信息,并且使用中间件加载进去
    Object.keys(proxyTable).forEach(function (context) {
      var options = proxyTable[context]
      if (typeof options === 'string') {
        options = { target: options }
      }
      app.use(proxyMiddleware(options.filter || context, options))
    })
    
    // 当访问找不到的页面的时候，该中间件指定了一个默认的页面返回https://github.com/bripkens/connect-history-api-fallback
    app.use(require('connect-history-api-fallback')())
    
    // 使用webpack开发中间件
    // 即将webpack编译后输出到内存中的文件资源挂到express服务器上
    app.use(devMiddleware)
    
    // 将热重载中间件挂在到express服务器上
    app.use(hotMiddleware)
    
    // 静态资源的路径
    var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
    
    // 将静态资源挂到express服务器上
    app.use(staticPath, express.static('./static'))
    
    // 应用的地址信息，例如：http://localhost:8080
    var uri = 'http://localhost:' + port
    
    // webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
    devMiddleware.waitUntilValid(function () {
      console.log('> Listening at ' + uri + '\n')
    })
    
    // 导出配置 启动express服务器并监听相应的端口（8080）
    module.exports = app.listen(port, function (err) {
      if (err) {
        console.log(err)
        return
      }
    
      // 如果符合自动打开浏览器的条件，则通过opn插件调用系统默认浏览器打开对应的地址uri
      if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
      }
    })

{% endhighlight %}

<h3 id="p32">build/webpack.base.conf.js</h3>

从代码中看到，dev-server使用的webpack配置来自build/webpack.dev.conf.js文件（测试环境下使用的是build/webpack.prod.conf.js，这里暂时不考虑测试环境）。而build/webpack.dev.conf.js中又引用了webpack.base.conf.js，所以这里我先分析webpack.base.conf.js。
{% highlight js %}
    /*
    * webpack基本配置文件
     1. 配置webpack编译入口
     2. 配置webpack输出路径和命名规则
     3. 配置模块resolve规则
     4. 配置不同类型模块的处理规则
    */
    
    
    var path = require('path')
    var utils = require('./utils')
    var config = require('../config')
    // vue-loader的配置
    var vueLoaderConfig = require('./vue-loader.conf')
    
    // 给出正确的绝对路径
    function resolve (dir) {
      return path.join(__dirname, '..', dir)
    }
    
    // 导出的对象，就是webpack的配置项，详情可以参考的webpack的配置说明，这里会将出现的都一一说明一下
    module.exports = {
      // 配置webpack编译入口
      entry: {
        app: './src/main.js'
      },
      // 配置webpack输出路径和命名规则
      output: {
        // 路径，从config/index读取的，值为：工程目录下的dist目录，需要的自定义的也可以去修改
        path: config.build.assetsRoot,
        // webpack输出bundle文件命名格式
        filename: '[name].js',
        // 发布路径，这里是的值为/，正式生产环境可能是服务器上的一个路径,也可以自定义
        publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
      },
      // 配置模块如何被解析，就是import或者require的一些配置
      resolve: {
        // 自动resolve的扩展名
        extensions: ['.js', '.vue', '.json'],
        // 创建路径别名，有了别名之后引用模块更方便，例如
        // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
        }
      },
      // 配置不同类型模块的处理规则
      module: {
        rules: [
          {// 对src和test文件夹下的.js和.vue文件使用eslint-loader
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: [resolve('src'), resolve('test')],
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          },
          {// 对所有.vue文件使用vue-loader
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
          },
          {// 对src和test文件夹下的.js文件使用babel-loader
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
          },
          {// 对图片资源文件使用url-loader，query.name指明了输出的命名规则
            // query比较特殊，当大小超过10kb的时候，会单独生成一个文件，文件名的生成规则是utils提供的方法，当小于10kb的时候，就会生成一个base64串放入js文件中
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {// 对字体资源文件使用url-loader，query.name指明了输出的命名规则
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      }
    }

{% endhighlight %}

<h3 id="p33">build/webpack.dev.conf.js</h3>

接下来看webpack.dev.conf.js，这里面在webpack.base.conf的基础上增加完善了开发环境下面的配置，主要包括下面几件事情：
{% highlight js %}
    /*
    * 这里面在webpack.base.conf的基础上增加完善了开发环境下面的配置
     1. 将hot-reload相关的代码添加到entry chunks
     2. 合并基础的webpack配置
     3. 使用styleLoaders
     4. 配置Source Maps
     5. 配置webpack插件
     */
    
    var utils = require('./utils')
    var webpack = require('webpack')
    var config = require('../config')
    
    // 一个可以合并数组和对象的插件
    var merge = require('webpack-merge')
    var baseWebpackConfig = require('./webpack.base.conf')
    
    // 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
    var HtmlWebpackPlugin = require('html-webpack-plugin')
    
    // 用于更友好地输出webpack的警告、错误等信息
    var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
    
    // 将热重载相关代码添加到入口文件
    Object.keys(baseWebpackConfig.entry).forEach(function (name) {
      baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
    })
    
    // 输入webpack开发配置  合并基础的webpack配置
    module.exports = merge(baseWebpackConfig, {
      // 配置样式文件的处理规则，使用styleLoaders
      module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
      },
      // 配置Source Maps。在开发中使用cheap-module-eval-source-map更快
      devtool: '#cheap-module-eval-source-map',
      // 配置webpack插件
      plugins: [
        // 通过插件修改定义的变量
        new webpack.DefinePlugin({
          'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // 后页面中的报错不会阻塞，但是会在编译结束后报错
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          // 让打包生成的html文件中css和js就默认添加到html里面，css就添加到head里面，js就添加到body里面
          inject: true
        }),
        new FriendlyErrorsPlugin()
      ]
    })

{% endhighlight %}

<h3 id="p34">build/utils.js和build/vue-loader.conf.js</h3>

前面的webpack配置文件中使用到了utils.js和vue-loader.conf.js这两个文件
{% highlight js %}
    /* utils.js
    *
     1. 配置静态资源路径
     2. 生成cssLoaders用于加载.vue文件中的样式
     3. 生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件
    */
    
    var path = require('path')
    var config = require('../config')
    var ExtractTextPlugin = require('extract-text-webpack-plugin')
    
    exports.assetsPath = function (_path) {
      var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
      return path.posix.join(assetsSubDirectory, _path)
    }
    
    exports.cssLoaders = function (options) {
      options = options || {}
    
      var cssLoader = {
        loader: 'css-loader',
        options: {
          minimize: process.env.NODE_ENV === 'production',
          sourceMap: options.sourceMap
        }
      }
    
      // generate loader string to be used with extract text plugin
      function generateLoaders (loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
          loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, loaderOptions, {
              sourceMap: options.sourceMap
            })
          })
        }
    
        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
          return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
          })
        } else {
          return ['vue-style-loader'].concat(loaders)
        }
      }
    
      // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
      return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
      }
    }
    
    // Generate loaders for standalone style files (outside of .vue)
    exports.styleLoaders = function (options) {
      var output = []
      var loaders = exports.cssLoaders(options)
      for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
          test: new RegExp('\\.' + extension + '$'),
          use: loader
        })
      }
      return output
    }

{% endhighlight %}

{% highlight js %}
    // vue-loader.js
    var utils = require('./utils')
    var config = require('../config')
    var isProduction = process.env.NODE_ENV === 'production'
    
    module.exports = {
      // css加载器
      loaders: utils.cssLoaders({
        sourceMap: isProduction
          ? config.build.productionSourceMap
          : config.dev.cssSourceMap,
        extract: isProduction
      })
      // 编译css之后自动添加前缀 已移植到 .postcssrc.js 在package.json中配置
      /*postcss: [
        require('autoprefixer')({
          browsers: ['last 2 versions']
        })
      ]*/
    }

{% endhighlight %}

<h3 id="p35">build/build.js</h3>

讲完了开发环境下的配置，下面开始来看构建环境下的配置。执行”npm run build”的时候首先执行的是build/build.js文件
{% highlight js %}
    /*
    *执行”npm run build”的时候首先执行的是此文件
     1. loading动画
     2. 删除创建目标文件夹
     3. webpack编译
     4. 输出信息
    */
    
    // 检查NodeJS和npm的版本
    require('./check-versions')()
    
    // 设置NODE环境变量为生产环境
    process.env.NODE_ENV = 'production'
    
    // Elegant terminal spinner
    var ora = require('ora')
    var path = require('path')
    
    // 执行Unix命令删除的插件
    var rm = require('rimraf')
    
    // 用于在控制台输出带颜色字体的插件
    var chalk = require('chalk')
    
    //引入webpack配置文件
    var webpack = require('webpack')
    var config = require('../config')
    var webpackConfig = require('./webpack.prod.conf')
    
    var spinner = ora('building for production...')
    
    // 开启loading动画
    spinner.start()
    
    // 递归删除旧的目标文件夹
    rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
      if (err) throw err
      // 没有出错则进行webpack再编译
      webpack(webpackConfig, function (err, stats) {
        // 停止loading动画
        spinner.stop()
        if (err) throw err
        // 没有出错则输出相关信息
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')
    
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ))
      })
    })

{% endhighlight %}

<h3 id="p36">build/webpack.prod.conf.js</h3>

构建的时候用到的webpack配置来自webpack.prod.conf.js，该配置同样是在webpack.base.conf基础上的进一步完善。
{% highlight js %}
    /*
    * 
     1. 合并基础的webpack配置
     2. 使用styleLoaders
     3. 配置webpack的输出
     4. 配置webpack插件
     5. gzip模式下的webpack插件配置
     6. webpack-bundle分析
     说明： webpack插件里面多了丑化压缩代码以及抽离css文件等插件。
    */
    
    var path = require('path')
    var utils = require('./utils')
    var webpack = require('webpack')
    var config = require('../config')
    var merge = require('webpack-merge')
    var baseWebpackConfig = require('./webpack.base.conf')
    var CopyWebpackPlugin = require('copy-webpack-plugin')
    var HtmlWebpackPlugin = require('html-webpack-plugin')
    
    // 用于从webpack生成的bundle中提取文本到特定文件中的插件
    // 可以抽取出css，js文件将其与webpack输出的bundle分离
    var ExtractTextPlugin = require('extract-text-webpack-plugin')
    var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
    
    var env = process.env.NODE_ENV === 'testing'
      ? require('../config/test.env')
      : config.build.env
    
    // 合并基础的webpack配置
    var webpackConfig = merge(baseWebpackConfig, {
      module: {
        rules: utils.styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true
        })
      },
      devtool: config.build.productionSourceMap ? '#source-map' : false,
      // 配置webpack的输出
      output: {
        // 编译输出目录
        path: config.build.assetsRoot,
        // 编译输出文件名格式
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        // 没有指定输出名的文件输出的文件名格式
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      },
      // 配置webpack插件
      plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
          'process.env': env
        }),
        // 混淆JS代码
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: true
        }),
        // 抽离css文件
        new ExtractTextPlugin({
          filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // 压缩抽离出测CSS,不同组件中重复的CSS会被删除
        new OptimizeCSSPlugin(),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
          filename: process.env.NODE_ENV === 'testing'
            ? 'index.html'
            : config.build.index,
          template: 'index.html',
          inject: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
          chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
          }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
          chunks: ['vendor']
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
          }
        ])
      ]
    })
    
    // gzip模式下需要引入compression插件进行压缩
    if (config.build.productionGzip) {
      var CompressionWebpackPlugin = require('compression-webpack-plugin')
    
      webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    
    if (config.build.bundleAnalyzerReport) {
      var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    }
    
    module.exports = webpackConfig

{% endhighlight %}

<h3 id="p37">build/check-versions.js和build/dev-client.js</h3>

最后是build文件夹下面两个比较简单的文件，dev-client.js似乎没有使用到，代码也比较简单，这里不多讲。check-version.js完成对node和npm的版本检测
{% highlight js %}
    // 用于在控制台输出带颜色字体的插件
    var chalk = require('chalk')
    // 语义化版本检查插件（The semantic version parser used by npm）
    var semver = require('semver')
    // 引入package.json
    var packageConfig = require('../package.json')
    
    // 开辟子进程执行指令cmd并返回结果
    function exec (cmd) {
      return require('child_process').execSync(cmd).toString().trim()
    }
    
    // node和npm版本需求
    var versionRequirements = [
      {
        name: 'node',
        // 当前版本
        currentVersion: semver.clean(process.version),
        // 要求版本
        versionRequirement: packageConfig.engines.node
      },
      {
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
      }
    ]
    
    module.exports = function () {
      var warnings = []
      // 依次判断版本是否符合要求
      for (var i = 0; i < versionRequirements.length; i++) {
        var mod = versionRequirements[i]
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
          warnings.push(mod.name + ': ' +
            chalk.red(mod.currentVersion) + ' should be ' +
            chalk.green(mod.versionRequirement)
          )
        }
      }
      // 如果有警告则将其输出到控制台
      if (warnings.length) {
        console.log('')
        console.log(chalk.yellow('To use this template, you must update following to modules:'))
        console.log()
        for (var i = 0; i < warnings.length; i++) {
          var warning = warnings[i]
          console.log('  ' + warning)
        }
        console.log()
        process.exit(1)
      }
    }

{% endhighlight %}

<h2 id="p4">config文件夹分析</h2>

<h3 id="p41">config/index.js</h3>
config文件夹下最主要的文件就是index.js了，在这里面描述了开发和构建两种环境下的配置，前面的build文件夹下也有不少文件引用了index.js里面的配置。
{% highlight js %}
    // see http://vuejs-templates.github.io/webpack for documentation.
    var path = require('path')
    
    module.exports = {
      // 构建产品时使用的配置
      build: {
        // webpack的编译环境
        env: require('./prod.env'),
        // 编译输入的index.html文件
        index: path.resolve(__dirname, '../dist/index.html'),
        // webpack输出的目标文件夹路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        // webpack编译输出的二级文件夹
        assetsSubDirectory: 'static',
        // webpack编译输出的发布路径
        assetsPublicPath: '/',
        // 使用SourceMap
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // 默认不打开开启gzip模式
        productionGzip: false,
        // gzip模式下需要压缩的文件的扩展名
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
      },
      // 开发过程中使用的配置
      dev: {
        // webpack的编译环境
        env: require('./dev.env'),
        // dev-server监听的端口
        port: 8080,
        // 启动dev-server之后自动打开浏览器
        autoOpenBrowser: true,
        // webpack编译输出的二级文件夹
        assetsSubDirectory: 'static',
        // webpack编译输出的发布路径
        assetsPublicPath: '/',
        // 请求代理表，在这里可以配置特定的请求代理到对应的API接口
        // 例如将'/api/xxx'代理到'www.example.com/api/xxx'
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        // 是否开启 cssSourceMap
        cssSourceMap: false
      }
    }

{% endhighlight %}

<h3 id="p42">config/dev.env.js、config/prod.env.js和config/test.env.js</h3>


这三个文件就简单设置了环境变量而已，没什么特别的。

<h2 id="p5">其它</h2>

<h3 id="p51">vue-cli的webpack项目，webpack-hot-middleware热加载热部署有时候不刷新页面</h3>

在dev-server.js里面
{% highlight js %}
    var hotMiddleware = require('webpack-hot-middleware')(compiler)  
    // force page reload when html-webpack-plugin template changes  
    compiler.plugin('compilation', function (compilation) {  
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {  
        hotMiddleware.publish({ action: 'reload' })  
        cb()  
      })  
    })
{% endhighlight %}

已经使用热加载的代码，然后我的项目是用webstorm打开的，发现有时候会热部署，有时候不热部署了.
解决方案如下：
它默认保存在临时文件，把settings=>appearance=>system=>synchornization=>use 'safe write'(...) 一项勾**去掉**，热部署替换是没问题的