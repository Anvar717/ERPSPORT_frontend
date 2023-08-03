// const { GenerateSW } = require('workbox-webpack-plugin');
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const  {VueLoaderPlugin} = require('vue-loader')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const version = JSON.parse(packageJson).version || 0
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    if (config.plugins.has('prefetch')) {
      config.plugin('prefetch').tap(options => {
        options[0].fileBlacklist = options[0].fileBlacklist || []
        options[0].fileBlacklist.push(/myasyncRoute(.)+?/)
        return options
      })
    }
  },
  productionSourceMap: process.env.NODE_ENV != 'production',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
    pluginOptions: {
      webpackBundleAnalyzer: {
        openAnalyzer: false
      }
    },
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    mode: process.env.VUE_APP_MODE != 'development' ? 'production' : 'development',
    resolve: {
      symlinks: false,
      // alias: {
      //   'bootstrap-vue$': 'bootstrap-vue/src/index.js'
      // }
    },
    
    performance: {
      hints: false
    },
    module: {
      rules: [
        // {
        //   test: /\.vue$/,
        //   loader: 'vue-loader',
        //   options: {
        //     loaders: {
        //       js: [
        //         { loader: 'cache-loader' },
        //         { loader: 'vue-loader'}
        //       ]
        //     }
        //   }
        // },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        // {
        //   test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
        //   loader: 'file-loader',
        //   options: {
        //     name: '[name].[ext]?[hash]'
        //   }
        // },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules\/(?!bootstrap-vue\/src\/)/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/preset-env']
        //     }
        //   }
        // },
        // {
        //   test: /\.css$/i,
        //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // },
      ]
    },
    optimization: {
      // minimize : true,
      // minimize : false
      // minimizer: [new UglifyJsPlugin({
      //   test: /\.js(\?.*)?$/i,
      //   uglifyOptions: {
      //     warnings: false,
      //     parse: {},
      //     compress: {},
      //     mangle: false,
      //     output: null,
      //     toplevel: false,
      //     nameCache: null,
      //     ie8: false,
      //     keep_fnames: false,
      //   },
      // }),
      // new TerserPlugin({
      //   terserOptions: {
      //     ecma: undefined,
      //     warnings: false,
      //     parse: {},
      //     compress: {},
      //     mangle: true,
      //     module: false,
      //     output: null,
      //     toplevel: false,
      //     nameCache: null,
      //     ie8: false,
      //     keep_classnames: undefined,
      //     keep_fnames: false,
      //     safari10: false,
      //   },
      // }),
      // ],
      
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    },
    plugins: [
			// new GenerateSW({
        
      // }),
      // new VueLoaderPlugin(),
      // new MiniCssExtractPlugin({
      //   ignoreOrder: true,
      // }),
      new BundleAnalyzerPlugin({
        defaultSizes : 'gzip'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: '"' + version + '"',
        },
    })
		],
    devtool : 'source-map'
  },
  pwa: {
    themeColor: "#42b983",
    msTileColor: "#42b983",
    appleMobileWebAppCache: "yes"    
  },
  transpileDependencies: [
    '@coreui/utils'
  ]
}
