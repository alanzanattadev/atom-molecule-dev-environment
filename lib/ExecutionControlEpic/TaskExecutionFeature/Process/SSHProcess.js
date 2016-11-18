'use babel'
// @flow

require('babel-register');
var ssh2 = require('ssh2');

var sshConfig = JSON.parse(process.argv[2]);
var strategy = process.argv[3];

let stagerPath = '/molecule/lib/ExecutionControlEpic/TaskExecutionFeature/Process/RemoteStagerProcess.js';
let command = `cd /molecule && BABEL_ENV=process node "${stagerPath}" '${strategy}'`;
process.send({type: 'stdout', data: command});

var conn = new ssh2.Client();
conn.on('ready', function() {
  conn.exec(command, function(err, stream) {
    process.send({type: 'stdout', data: 'executed ' + JSON.stringify(err)});
    if (err) {
      process.send({type: 'error', data: JSON.stringify(err)});
      conn.end();
      process.exit(0);
    } else {
      stream.on('close', function(code, signal) {
        conn.end();
        process.exit(code);
      }).on('data', function(data) {
        process.send({type: 'stdout', data: data.toString()});
      }).stderr.on('data', function(data) {
        process.send({type: 'stderr', data: data.toString()});
      });
    }
  });
}).on('close', function(hadError) {
  if (hadError)
    process.send({type: 'error', data: 'Connection closed anormally'});
  process.exit(hadError ? 0 : 1);
}).on('error', function(err) {
  process.send({type: 'error', data: JSON.stringify(err).toString()});
  process.exit(1);
}).on('end', function() {

}).connect({
  host: sshConfig.host,
  port: sshConfig.port,
  username: sshConfig.transport.username,
  privateKey: require('fs').readFileSync(sshConfig.transport.privateKeyPath),
});

process.on('exit', () => {
  conn.end();
})
