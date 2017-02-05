const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const environment = process.env.NODE_ENV || 'development';

process.stdout.write(`Building for ${environment}\n`);

let entry = [
	'./src/index.js'
];
let babelPlugins = [
	'transform-object-rest-spread'
];
let filename;
let devtool;
let plugins = [
	new CleanWebpackPlugin(['dist'], {
		verbose: true,
		dry: false
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'src/index.html'
	})
];

if (environment === 'production') {
	filename = 'build-dist[hash:6].js';
	devtool = 'source-map';
	plugins = [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false
		}),
		...plugins
	];
} else {
	entry = [
		'webpack-dev-server/client?http://0.0.0.0:3000',
		'webpack/hot/only-dev-server',
		...entry
	];
	filename = 'build-[hash:6].js';
	babelPlugins = [...babelPlugins, 'react-hot-loader/babel'];
	devtool = undefined;
	plugins = [new webpack.HotModuleReplacementPlugin(), ...plugins];
}

module.exports = {
	entry,
	output: {
		filename,
		path: join(__dirname, 'dist')
	},
	target: 'web',
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			options: {
				presets: [
					['es2015', { modules: false }],
					'es2016'
				],
				plugins: babelPlugins
			}
		}, {
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader']
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader'
		}, {
			test: /\.(woff|woff2)$/,
			loader: 'url-loader',
			options: {
				prefix: 'font',
				limit: 5000
			}
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'application/octet-stream'
			}
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				mimetype: 'image/svg+xml'
			}
		}, {
			test: /.json$/,
			loader: 'json-loader'
		}, {
			test: '/.css$/',
			loaders: ['style-loader', 'css-loader']
		}]
	},
	devtool,
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	plugins
};
