import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import InputQuestion from "./InputQuestion";

storiesOf('InputQuestion', module)
  .add('Basic', () => (
    <div style={{width: '500px', height: '300px', backgroundColor: '#7900EB', alignItems: 'stretch', display: 'flex'}}>
      <InputQuestion {...{message: "What's your name ?", default: 'Alan'}}/>
    </div>
  ))
