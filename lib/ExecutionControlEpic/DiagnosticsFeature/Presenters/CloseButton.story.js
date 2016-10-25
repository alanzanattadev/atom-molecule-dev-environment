import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import CloseButton from "./CloseButton";


storiesOf('CloseButton', module)
  .add('Basic', () => (
    <CloseButton />
  ))
