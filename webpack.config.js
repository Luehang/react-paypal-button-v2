/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
/* eslint-enable */
const libraryName = "reactGlide";

module.exports = {
    entry: path.join(__dirname, "src"),
    output: {
        path: path.join(__dirname, "lib"),
        library: libraryName,
        filename: libraryName + ".js",
        libraryTarget: "umd",
        umdNamedDefine: true,
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                exclude: /\.html/,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /^(?!.*test\.tsx|\.ts?$).*\.tsx|\.ts?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /^(?!.*test\.tsx|\.ts?$).*\.tsx|\.ts?$/,
                exclude: /node_modules/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
        ]
    },
    resolve: {
        extensions: [".js", ".tsx", ".css", ".ts", ".jsx"],
    },
    devServer: {
        contentBase: "dist",
        port: 3000,
        open: true,
        host: "localhost",
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "example/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            entry: "src/index.css",
            filename: libraryName + ".css",
            chunkFilename: libraryName + ".[id].css"
        }),

    ]
};
