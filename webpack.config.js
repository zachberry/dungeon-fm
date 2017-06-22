// Does what webpack-sass does, except that it moves the css into an external file
// using ExtractTextPlugin. Now the browser can load styles in parallel but now
// two requests are made.

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: './public/bundle.js',
		publicPath: 'http://localhost:8090/assets'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract(['css', 'sass'])
			}
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	plugins: [
		new ExtractTextPlugin('./public/style.css', {
			allChunks: true
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
}