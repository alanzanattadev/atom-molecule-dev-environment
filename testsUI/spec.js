const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");

describe("Application launch", function() {
  this.timeout(100000);

  beforeEach(function() {
    this.app = new Application({
      // Your electron path can be any binary
      path: "C:\\Users\\lorenzo\\AppData\\Local\\atom\\atom.exe",

      // Assuming you have the following directory structure

      //  |__ my project
      //     |__ ...
      //     |__ main.js
      //     |__ package.json
      //     |__ index.html
      //     |__ ...
      //     |__ test
      //        |__ spec.js  <- You are here! ~ Well you should be.

      // The following line tells spectron to look and use the main.js file
      // and the package.json located 1 level above.
      args: [path.join(__dirname, "..")],
    });
    return this.app.start();
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("shows an initial window", function() {
    return this.app.client.getWindowCount().then(function(count) {
      assert.equal(count, 2);
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
    });
  });

  it("Should display Control Panel", function() {
    let ControlPanelDiv = "div*=Control Panel";
    return this.app.client.isVisible(ControlPanelDiv);
  });

  it("Should display Unified Diagnostics button", function() {
    return this.app.client.waitUntilTextExists(
      "h3",
      "Unified Diagnostics",
      20000,
    );
  });

  it("Should display Unified Diagnostics panel", function() {
    return this.app.client.waitUntilTextExists(
      "h3",
      "Unified Diagnostics",
      20000,
    );
    // no idea how to check the render of the panel, I would need an ID or something to hit on.
  });

  it("should create a Plan for NPM", function() {
    return this.app.client
      .waitUntilTextExists("h3", "Unified Diagnostics", 20000)
      .then(() => {
        return this.app.client
          .click("#jestNewPlan")
          .waitUntilTextExists("h1", "jest")
          .element("#name")
          .setValue("testPlanJest")
          .click("button*=Create");
      })
      .then(() => {
        return this.app.client.waitUntilTextExists("h3", "testPlanJest");
      });
  });
});
