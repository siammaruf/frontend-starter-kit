const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: "development",
    // watch: true,
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name]-[hash].js",
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static:{
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3030,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/i,
                loader: "file-loader",
                options: {
                    filename: "[name]-[hash].[ext]",
                    outputPath: 'img',
                    esModule: false,
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name]-[hash].css",
            chunkFilename: "css/[id]-[hash].css",
        }),
        new HtmlWebpackPlugin(
            {
                inject: true,
                title: "Webpack App",
                filename: "index.html",
                template: "src/views/index.html",
            }
        ),
        new HtmlWebpackPlugin(
            {
                inject: true,
                title: "About",
                filename: "about.html",
                template: "src/views/about.html",
            }
        ),
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}