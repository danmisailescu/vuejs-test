const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const fs = require('fs');

const appBasePath = 'src';
const jsEntries = {};
// We search for test.js files recursively inside appBasePath folder and make those as entries
const walkDirectoriesSync = (currentdirOrFilePath) => {
	fs.readdirSync(currentdirOrFilePath).forEach((name) => {
		const dirOrFilePath = path.join(currentdirOrFilePath, name);
		const dirOrFilePathRelative = path.relative(__dirname, dirOrFilePath);
		const stat = fs.statSync(dirOrFilePath);
		if (stat.isDirectory()) {
			walkDirectoriesSync(dirOrFilePath);
		}
		if (stat.isFile() && name.endsWith('.test.js')) {
			const deployScriptName = dirOrFilePathRelative.split(path.sep).filter(x => !appBasePath.includes(x)).join('-');
			jsEntries[deployScriptName] = dirOrFilePath;
		}		
	});
};
walkDirectoriesSync(path.resolve(__dirname, appBasePath));

module.exports = {
	mode: 'development',
	entry: jsEntries,
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: ['*', '.js', '.vue', '.json'],
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015'],
				plugins: ['transform-object-rest-spread'],
			},
		}, {
			test: /\.vue$/,
			use: 'vue-loader',
		}, {
			test: /\.css$/,
			use: [
				'vue-style-loader',
				'css-loader',
			],
		}, {
			test: /\.styl(us)?$/,
			use: [
				'vue-style-loader',
				'css-loader',
				'stylus-loader',
			],
		}, {
			test: /\.(scss|sass)$/i,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader',
			],
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
			use: 'file-loader',
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
			loader: 'file-loader',
			query: {
				name: '[name].[ext]?[hash]',
			},
		}],
	},
	plugins: [
		new VueLoaderPlugin(),
	],
};
