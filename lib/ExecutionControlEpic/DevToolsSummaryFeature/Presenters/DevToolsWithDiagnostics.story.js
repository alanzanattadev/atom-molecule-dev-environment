import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DevToolsWithDiagnostics from "./DevToolsWithDiagnostics";


storiesOf('DevToolsWithDiagnostics', module)
  .add('Basic', () => (
    <DevToolsWithDiagnostics tools={[{
      errors: 1,
      warnings: 2,
      name: 'webpack'
    }, {
      infos: 9,
      name: 'npm',
    }, {
      successes: 1,
      errors: 5,
      name: 'jest'
    }, {
      errors: 0,
      successes: 0,
      warnings: 0,
      infos: 0,
      name: 'chrome'
    }]}/>
  ))
