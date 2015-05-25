var webpack = require('webpack');
module.exports = {
    target: "web",
    debug: true,
    devtool: "source-map",
    entry: {
        app: "./source/scripts/app"
    },
    output: {
        path: "./public/",
        filename: "[name].bundle.js"
    },
    resolve: {
        modulesDirectories: ['bower_components', 'node_modules'],
    },
    module: {
        loaders: [{
            test: /\.css/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.js$/,
            loader: "jsx-loader?harmony"
        }, {
            test: /\.png/,
            loader: "url-loader?limit=100000&mimetype=image/png"
        }, {
            test: /\.gif/,
            loader: "url-loader?limit=100000&mimetype=image/gif"
        }, {
            test: /\.jpg/,
            loader: "file-loader"
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/font-woff2"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=image/svg+xml"
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '_': 'lodash',
            'React': 'react',
            'Promise': 'bluebird'
        }),
    ]
};