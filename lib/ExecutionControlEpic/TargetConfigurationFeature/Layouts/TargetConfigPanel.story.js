import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TargetConfigPanel from "./TargetConfigPanel";


storiesOf('TargetConfigPanel', module)
  .add('Basic', () => (
    <TargetConfigPanel />
  ))
