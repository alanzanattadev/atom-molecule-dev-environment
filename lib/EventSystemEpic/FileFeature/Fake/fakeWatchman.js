"use babel";
// @flow

function watchClient() {
  this.subscription = {};
  this.path = "";
}

watchClient.prototype.end = () => {};

watchClient.prototype.capabilityCheck = (
  capability: Object,
  cb: (error?: Object, resp?: Object) => void,
) => {
  cb();
};

watchClient.prototype.command = function(
  cmd: Array<any>,
  cb: (error?: Object, resp?: Object) => void,
) {
  switch (cmd[0]) {
    case "subscribe":
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

watchClient.prototype.on = function(
  event: string,
  cb: (resp?: Object) => void,
) {
  if (event === "subscription") {
    cb({
      subscription: this.subscription.name,
      files: [
        {
          name: "test2",
          mtime_ms: 1000.42,
          type: "f",
          exists: true,
        },
        {
          name: "test",
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
          name: "true_file",
          mtime_ms: 2,
          type: "f",
          exists: true,
        },
        {
          name: "test2",
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
