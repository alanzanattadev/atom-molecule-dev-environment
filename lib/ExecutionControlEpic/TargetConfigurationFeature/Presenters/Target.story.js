import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Target from "./Target";


storiesOf('Target', module)
  .add('Basic', () => (
    <Target iconUri="devtool-icon-docker.png" name="build"/>
  ))
  .add('Running', () => (
    <Target iconUri="devtool-icon-docker.png" name="build" state="running"/>
  ))
  .add('Stopped', () => (
    <Target iconUri="devtool-icon-docker.png" name="build" state="stopped"/>
  ))
  .add('Failed', () => (
    <Target iconUri="devtool-icon-docker.png" name="build" state="failed"/>
  ))
  .add('Crashed', () => (
    <Target iconUri="devtool-icon-docker.png" name="build" state="crashed"/>
  ))
  .add('Created', () => (
    <Target iconUri="devtool-icon-docker.png" name="build" state="created"/>
  ))
  .add('Succeed', () => (
    <Target iconUri="devtool-icon-docker.png" name="build" state="succeed"/>
  ))
  .add('Pinnable', () => (
    <Target iconUri="devtool-icon-docker.png" name="build" pinnable/>
  ))
