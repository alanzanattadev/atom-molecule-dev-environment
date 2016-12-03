import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import PaneDock from "./PaneDock";
import DockIcon from './DockIcon';


storiesOf('PaneDock', module)
  .add('Basic', () => (
    <div style={{width: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px'}}>
      <PaneDock>
        <DockIcon color="#21B6CE" iconUri="devtool-icon-docker.png" name="outline"/>
        <DockIcon color="#233235" iconUri="devtool-icon-docker.png" name="targets"/>
        <DockIcon color="#289B6B" iconUri="devtool-icon-flow.png" name="versionning"/>
        <DockIcon color="#CE2172" iconUri="devtool-icon-docker.png" name="params"/>
      </PaneDock>
    </div>
  ))
