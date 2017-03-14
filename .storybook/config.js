import { configure, addDecorator } from '@kadira/storybook';
import React from 'react';
import {StyleRoot} from 'radium';

const req = require.context('../lib/', true, /story\.js$/)

require("../styles/diagnostic-color.less");
require("../styles/molecule-dev-environment.less");

function loadStories() {
  req.keys().forEach(req)
}

addDecorator((story) => (
  <StyleRoot>
    {story()}
  </StyleRoot>
));

configure(loadStories, module);
