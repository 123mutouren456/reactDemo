var postcssImport = require('postcss-import');
var webpack = require('webpack');

module.exports = {
    plugins: [
	    postcssImport({
	      addDependencyTo: webpack
	    }),
        require('precss'),
        require('autoprefixer')({
            browsers: [
                "> 0.01%",
                "ie >= 8"
            ]
        })
    ]
}