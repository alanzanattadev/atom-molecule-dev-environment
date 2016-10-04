import { configure } from '@kadira/storybook';

const req = require.context('../lib/', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module);
