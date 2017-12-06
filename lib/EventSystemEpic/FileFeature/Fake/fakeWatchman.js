"use babel";
// @flow

function watchClient() {
  this.subscription = {};
  this.path = "";
}

watchClient.prototype.end = () => {};

watchClient.prototype.capabilityCheck = (args, cb) => {
  cb();
};

watchClient.prototype.command = function(cmd, cb) {
  console.log("cmd: " + cmd);
  switch (cmd[0]) {
    case "subscribe":
      console.log("subscribing...");
      this.subscription = Object.assign({ name: cmd[2], sub: cmd[3] });
      break;
    case "watch-project":
      this.path = cmd[1];
      cb(undefined, { watch: "fake", relative_path: "fake" });
      break;
    default:
      return;
  }
};

watchClient.prototype.on = function(event, cb) {
  console.log("ev: " + event);
  if (event === "subscription") {
    cb({
      subscription: this.subscription.name,
      files: [
        {
          name: this.path + "test2",
          mtime_ms: 1000.42,
          type: "f",
          exists: true,
        },
        {
          name: this.path + "test",
          mtime_ms: 1000.43,
          type: "f",
          exists: true,
        },
      ],
    });
    cb({
      subscription: this.subscription.name,
      files: [
        {
          name: this.path + "true_file",
          mtime_ms: 2,
          type: "f",
          exists: true,
        },
        {
          name: this.path + "test2",
          mtime_ms: 2,
          type: "f",
          exists: false,
        },
      ],
    });
  }
};

const watchman = {
  Client: watchClient,
};

export default watchman;
