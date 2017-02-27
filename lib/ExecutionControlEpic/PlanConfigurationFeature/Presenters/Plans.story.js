import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Plans from './Plans';
import planConfigs from '../Fake/Data/PlanConfig';

storiesOf('Plans', module)
  .add('Basic', () => <Plans plans={[]} pinnable />)
  .add('Filled', () => (
    <Plans
      plans={[Object.assign({}, planConfigs[0], { state: 'created' })]}
      pinnable
    />
  ));
