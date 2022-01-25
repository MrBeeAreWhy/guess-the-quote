const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'client', 'index.js'),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './client', 'index.html')
        })
    ]
}