import { configure, addDecorator } from '@kadira/storybook';
import React from 'react';
import {StyleRoot} from 'radium';

const req = require.context('../lib/', true, /story\.js$/);

require("./public/style.css");
require("../node_modules/xterm/dist/xterm.css");

function loadStories() {
  req.keys().forEach(req)
}

addDecorator((story) => (
  <StyleRoot>
    {story()}
  </StyleRoot>
));

configure(loadStories, module);
