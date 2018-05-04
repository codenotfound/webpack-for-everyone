const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BuildManifestPlugin = require('./build/plugins/BuildManifestPlugin');

const inProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        app: [
            './src/index.js',
            './src/index2.scss'
        ],
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: inProduction,
                                // url: false
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash].[ext]'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                            ]
                        }
                    }
                ],

            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),

        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute.
            paths: glob.sync(path.join(__dirname, 'app/*.html')), // example: resources/views/**/*.jsx
            minimize: inProduction
        }),

        new CleanWebpackPlugin(['dist']),

        new BuildManifestPlugin('test') //also htmlwebpackplugin
    ]
};

if(inProduction) {
    module.exports.plugins.push(
        new UglifyJsPlugin()
    );
}