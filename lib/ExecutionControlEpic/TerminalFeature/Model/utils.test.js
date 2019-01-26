import { filterAtomEnv } from "./utils";

describe("filterAtomEnv", () => {
  const testEnv = {
    COLORTERM: "truecolor",
    DESKTOP_SESSION: "budgie-desktop",
    DISPLAY: ":0",
    GDMSESSION: "budgie-desktop",
    HOME: "/home/tamer",
    LANG: "en_US.utf8",
    LC_CTYPE: "en_US.utf8",
    OLDPWD: "/home/tamer/molecule",
    PATH: "/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/bin:/snap/bin",
    PWD: "/home/tamer/molecule",
    SHELL: "/bin/zsh",
    TERM: "xterm-256color",
    USER: "tamer",
    XAUTHORITY: "/home/tamer/.Xauthority",
    ZSH: "/home/tamer/.oh-my-zsh",
  };

  it("should filter atom env vars", () => {
    let subject = filterAtomEnv({
      ...testEnv,
      ATOM_HOME: "/home/tamer/.atom",
      NODE_PATH: "/usr/share/atom/resources/app.asar/exports",
    });

    expect(subject).toEqual(testEnv);
  });

  it("should return env as is", () => {
    let subject = filterAtomEnv(testEnv);

    expect(subject).toEqual(testEnv);
  });
});
