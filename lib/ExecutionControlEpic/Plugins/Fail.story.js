import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import FailMessage from "./FailMessage";

storiesOf('', module)
  .add('Basic', () => (
    <FailMessage/>
  ))
