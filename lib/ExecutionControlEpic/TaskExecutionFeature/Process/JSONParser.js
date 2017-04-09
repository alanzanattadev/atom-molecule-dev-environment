/* eslint-disable no-undef */
module.exports = function(json) {
  var cb = this.async();

  try {
    let parsed = JSON.parse(json);
    emit("json:success", parsed);
  } catch (e) {
    emit("json:error", e);
  }
  cb();
};
