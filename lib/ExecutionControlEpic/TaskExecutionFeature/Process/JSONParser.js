
module.exports = function(json) {
  var cb = this.async();
  console.log("parsing");
  try {
    let parsed = JSON.parse(json);
    console.log("end of parsing");
    emit('json:success', parsed);
    console.log("end of emitting");
  } catch (e) {
    emit('json:error', e);
  }
  cb();
}
