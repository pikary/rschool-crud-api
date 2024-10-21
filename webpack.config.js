const path = require('path')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Output bundled file to ./dist folder
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve .ts and .js files
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    target: 'node',
    mode: 'development',
}