var genDefaultConfig = require("@kadira/storybook/dist/server/config/defaults/webpack.config.js");
var path = require("path");

module.exports = function(config, env) {
  var config = genDefaultConfig(config, env);

  return Object.assign({}, config, {
    resolve: Object.assign({}, config.resolve, {
      alias: {
        electron: path.join(__dirname, "fake/electron.js"),
        remote: path.join(__dirname, "fake/electron.js"),
      },
    }),
  });
};
