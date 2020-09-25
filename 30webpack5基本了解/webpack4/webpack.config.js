const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, 'build'),
    },
    mode: 'production'
}