import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DevToolsWithDiagnostics from "./DevToolsWithDiagnostics";


storiesOf('DevToolsWithDiagnostics', module)
  .add('Basic', () => (
    <DevToolsWithDiagnostics tools={[]}/>
  ))
