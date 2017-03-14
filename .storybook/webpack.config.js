let path = require("path");
let webpack = require("webpack");
const autoPrefixer = require('autoprefixer');

// load the default config generator.
let genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = function (config, env) {
  config = genDefaultConfig(config, env);

  config.module.loaders.push({test: /\.less$/, loader: "style!css!less"});

  config.lessLoader = {
    includePaths: [
      path.resolve(__dirname, '..', 'styles')
    ],
    sourceMap: true
  };

  config.postcss = function() {
    return [autoPrefixer];
  };

  return config;
};