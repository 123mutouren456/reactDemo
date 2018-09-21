const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

//生成入口对象
function getOEntry() {
    var routerPath = './src/multiple/',
        oEntry = {

        },
        aHtmlWebpackPlugin = [],
        files = fs.readdirSync(routerPath); //遍历router文件夹的文件

    files.forEach(function (item) {
        var tmp = item.split('.');
        if (tmp[1] !== 'js') {
            return;
        }
        // _chunks.push(tmp[0]);
        oEntry[tmp[0]] = [
            "babel-polyfill",
            [routerPath, item].join('')
        ];
        var fileSrc = tmp[0] + '.html';
        aHtmlWebpackPlugin.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'multiple', fileSrc),
            filename: fileSrc,
            chunks: [tmp[0]]
        }));
    });

    return {
        oEntry: oEntry,
        aHtmlWebpackPlugin: aHtmlWebpackPlugin
    };
}

let entries = getOEntry();

let commonConfig = {
    entry: {
        app: [
            "babel-polyfill",
            path.join(__dirname, 'src/index.js')
        ],
        ...entries.oEntry
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: "/"
    },
    module: {
        postLoaders: [
            {
                test: /\.js$/,
                loaders: ['export-from-ie8/loader']
            }
        ],
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: __dirname + '/src/3libs',
            to: '3libs'
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html'),
            chunks: ["app"]
        }),
        ...entries.aHtmlWebpackPlugin,
        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // }),
        new es3ifyPlugin()
    ],

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    }
};

module.exports = commonConfig;