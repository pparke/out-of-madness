'use strict';
const gulp              = require('gulp');
const gutil             = require('gulp-util');
const webpack           = require('webpack');
const WebpackDevServer  = require('webpack-dev-server');
const webpackConfig     = require('./webpack.config.js');

const host = webpackConfig.devServer.host || '0.0.0.0';
const port = webpackConfig.devServer.port || 3000;

// launches the webpack dev server by default
gulp.task('default', ['webpack-dev-server']);

/**
 * Production build
 */
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', function (callback) {
	// modify some webpack config options
	const myConfig = Object.create(webpackConfig);

	// run webpack
	webpack(myConfig, (err, stats) => {
		if (err) throw new gutil.PluginError('webpack:build', err);

		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

/**
 * Development Build
 */
// modify some webpack config options
const myDevConfig   = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug   = true;

// create a single instance of the compiler to allow caching
const devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if (err) throw new gutil.PluginError('webpack:build-dev', err);

		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true
		}));
		callback();
	});
});

/**
 * Development Server
 */
gulp.task('webpack-dev-server', function(callback) {
	// modify some webpack config options
	const myConfig   = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug   = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		contentBase: myConfig.output.path,
		stats: {
			colors: true
		}
	}).listen(port, host, (err) => {
		if (err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', `http://${host}:${port}/webpack-dev-server/index.html`);
	});
});
