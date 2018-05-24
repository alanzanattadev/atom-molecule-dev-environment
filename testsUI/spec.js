const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");
const os = require("os");
const process = require("process");

describe("Application launch", function() {
  this.timeout(100000);

  beforeEach(function() {
    let binaryPath = "";
    if (os.platform() === "win32") {
      const userName = process.env.USERNAME;
      binaryPath =
        "C:\\Users\\" + userName + "\\AppData\\Local\\atom\\atom.exe";
    } else if (os.platform() === "darwin") {
      binaryPath = "/usr/local/bin/atom";
    } else {
      binaryPath = "/usr/share/atom/atom";
    }

    this.app = new Application({
      // Put your atom binary path here
      // For windows : C:\Users\<UserName>\AppData\Local\atom\atom.exe
      // For Linux : /usr/share/atom/atom  You may try with /usr/bin/atom
      // For Mac : /usr/local/bin/atom not sure for this one
      path: binaryPath,

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
      "span",
      "Unified Diagnostics",
      20000,
    );
  });

  it("should create a Plan for NPM", function() {
    return this.app.client
      .waitUntilTextExists("span", "Unified Diagnostics", 20000)
      .then(() => {
        return this.app.client
          .click("#jestNewPlan")
          .waitUntilTextExists("h1", "jest")
          .element("#name")
          .setValue("TestPlanJest")
          .click("button*=Create");
      })
      .then(() => {
        return this.app.client.waitUntilTextExists("span", "TestPlanJest");
      });
  });
});
