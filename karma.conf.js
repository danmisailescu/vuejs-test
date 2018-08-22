const webpackConfig = require('./webpack.config.dev.js');

module.exports = (config) => {
	config.set({	  
		files: [		
			{ pattern: './src/**/*.test.js', watched: true },		
		],		
		frameworks: ['jasmine'],
		webpack: webpackConfig,
		preprocessors: {
			'./src/**/*.test.js': ['webpack'],
		},
		browsers: ['Chrome'],
	});
};
