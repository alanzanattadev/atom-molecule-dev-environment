import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Questions from "./Questions";

storiesOf('Questions', module)
  .add('Basic', () => (
    <Questions />
  ))
