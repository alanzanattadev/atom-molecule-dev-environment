import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import Term from "./Term";
import Terminal from "xterm";

const term = new Terminal();
term.writeln("Hello man !");
term.on('key', key => {
  term.write(key);
})

storiesOf("Term", module).add("Basic", () => (
  <Term xtermInstance={term} />
));
