const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(config);

compiler.run((webpackError) => {
	if (webpackError) {
		process.stderr.write(`${webpackError}\n`);
		return;
	}
	app.use(devMiddleware(compiler, { publicPath: config.output.publicPath }));

	app.use(hotMiddleware(compiler));

	app.use(express.static(__dirname));

	app.listen(port, (err) => {
		if (err) {
			process.stderr.write(`${err}\n`);
		} else {
			process.stdout.write(`Listening at http://localhost:${port}/\n`);
		}
	});
});
