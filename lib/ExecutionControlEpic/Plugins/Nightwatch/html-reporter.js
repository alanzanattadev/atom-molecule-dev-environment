var HtmlReporter = require("nightwatch-html-reporter");
/* Same options as when using the built in nightwatch reporter option */
var reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: "/tmp/",
  debug: {
    saveNightwatch: "/tmp/report-nightwatch.json",
  },
});

module.exports = {
  write: function(results, options, done) {
    reporter.fn(results, done);
  },
};
