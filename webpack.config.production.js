/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var md5 = new Date() * 1;

module.exports = {
    entry: {
        main: "./examples/main"
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main_'+md5+'.js',
        chunkFilename: "[name].chunk_" + md5 +".js",
        publicPath: '', //网站运行时的访问路径
    },
    // 依赖项是外部lib，遇到require它不需要编译
    externals: {
        // 在浏览器端对应window.React
        // 'react': 'React',
        // 'npm-zepto': 'Zepto'
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //   'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        // }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 提供了设置环境变量来优化代码
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new WebpackMd5Hash(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        // 用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.html'),
            inject: true
            //hash: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,// .js .jsx
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                include: [path.join(__dirname, 'src'), path.join(__dirname, 'examples')]
            },
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.less$/,
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'    // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
            }
        ]
    }
};
