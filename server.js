/* eslint-disable no-var, strict */
'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var proxy = {
    dev: 'http://cq01-newdev.epc.baidu.com:8086',
    qa: 'http://cp01-rdqa-dev388.cp01.baidu.com:8086',
    lh: 'http://cp01-rdqa04-dev170.cp01.baidu.com:8186',
    prd: 'http://waimai.baidu.com'
}

var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/waimaiui/mobile/waimai/*': proxy.prd,
        '/waimai/trade/getorderprice': proxy.dev,
        // '/mobile/waimai': proxy.prd,
        // 路由转发
        // '/*': proxy.prd
    }
});

server.listen(config.port, config.host, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at http://' + config.host + ':' + config.port);
});


