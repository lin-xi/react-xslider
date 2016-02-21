/* eslint-disable no-var, strict */
'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
    }
});

server.listen(config.port, config.host, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at http://' + config.host + ':' + config.port);
});


