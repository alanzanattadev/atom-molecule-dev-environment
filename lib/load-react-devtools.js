if (global.atom.inDevMode()) {
  try {
    require("react-devtools");
  } catch (err) {
    void err;
  }
}
