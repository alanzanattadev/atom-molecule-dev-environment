import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import LoadingQuestion from "./LoadingQuestion";

storiesOf('LoadingQuestion', module)
  .add('Basic', () => (
    <div style={{width: '500px', height: '300px', backgroundColor: '#7900EB', alignItems: 'stretch', display: 'flex'}}>
      <LoadingQuestion />
    </div>
  ))
