"use babel";
// @flow

export let SSHConfigSchema: SSHConfigSchema = {
  type: "object",
  schemas: {
    username: {
      type: "string",
      default: "",
      label: "username",
    },
    privateKeyPath: {
      type: "string",
      default: "",
      label: "key path",
    },
  },
};

export let HostConfigSchema = {
  type: "object",
  schemas: {
    host: {
      type: "string",
      default: "127.0.0.1",
      label: "host",
    },
    port: {
      type: "number",
      default: "22",
      label: "port",
    },
  },
};
