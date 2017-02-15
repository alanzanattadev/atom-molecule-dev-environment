'use babel'
// @flow

export let SSHConfigSchema: SSHConfigSchema = {
  type: 'object',
  schemas: {
    username: {
      type: 'string',
      default: '',
      title: 'username'
    },
    privateKeyPath: {
      type: 'string',
      default: '',
      title: 'key path'
    }
  }
};

export let HostConfigSchema = {
  type: 'object',
  schemas: {
    host: {
      type: 'string',
      default: '127.0.0.1',
      title: 'host'
    },
    port: {
      type: 'number',
      default: '22',
      title: 'port'
    },
  },
};
