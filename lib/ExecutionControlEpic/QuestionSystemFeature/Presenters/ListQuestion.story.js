import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import ListQuestion from "./ListQuestion";

storiesOf('ListQuestion', module)
  .add('Basic', () => (
    <div style={{width: '500px', height: '300px', backgroundColor: '#7900EB', alignItems: 'stretch', display: 'flex'}}>
      <ListQuestion {...{message: "Choose an env", choices: [
        'dev',
        'staging',
        'preprod',
        'production'
      ], onNext: action('Enter')}}/>
    </div>
  ))
