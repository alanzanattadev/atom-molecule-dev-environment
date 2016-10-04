import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Target from "./Target";


storiesOf('Target', module)
  .add('Basic', () => (
    <Target iconUri="devtool-icon-docker.png" name="build"/>
  ))
  .add('Pinnable', () => (
    <Target iconUri="devtool-icon-docker.png" name="build" pinnable/>    
  ))
