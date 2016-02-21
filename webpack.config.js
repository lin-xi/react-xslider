var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var host = "lx.waimai.baidu.com";
var port = "8008";

// host可以改为ip 用于手机测试
module.exports = {
    host: host,
    port: port,
    entry: [
        // 支持多页面多入口
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/only-dev-server',
        './examples/main' // 打包的入口  可以是多页 多页最后就是 page1.bundle.js 和 page2.bundle.js
    ],
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'build'),//打包文件存放的绝对路径
        filename: 'pinzhi.js',//打包后的文件名
        publicPath: '', //网站运行时的访问路径
        hash: true
    },
    externals: {
        // 在浏览器端对应window.React
        // 'npm-react': 'React',
        // zepto后续要拆分出去
        // 'npm-zepto': 'Zepto'
    },
    plugins: [
        // 热替换 防止报错插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new WebpackMd5Hash(),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            inject: true,
            hash: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,// .js .jsx
                loader: 'react-hot',
                include: [path.join(__dirname, 'src'), path.join(__dirname, 'examples')]
            },
            {
                test: /\.jsx?$/,// .js .jsx
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                include: [path.join(__dirname, 'src'), path.join(__dirname, 'examples')]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    }
};
