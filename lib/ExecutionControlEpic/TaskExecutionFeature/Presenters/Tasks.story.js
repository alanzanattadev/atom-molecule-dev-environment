import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Tasks from "./Tasks";
import moment from 'moment';


storiesOf('Tasks', module)
  .add('Basic', () => (
    <div style={{height: '200px', display: 'flex', alignItems: 'stretch'}}>
      <Tasks tasks={[
        {state: 'running', debut: moment().subtract(1, 'minutes').unix()},
        {state: 'crashed', debut: moment().subtract(5, 'minutes').unix(), end: moment().subtract('2', 's').unix(), selected: true},
        {state: 'crashed', debut: moment().subtract(6, 'minutes').unix(), end: moment().subtract('3', 's').unix()},
        {state: 'stopped', debut: moment().subtract(7, 'minutes').unix(), end: moment().subtract('2', 's').unix()},
        {state: 'stopped', debut: moment().subtract(8, 'minutes').unix(), end: moment().subtract('1', 's').unix(), selected: true},
        {state: 'running', debut: moment().subtract(10, 'minutes').unix()},
      ]}/>
    </div>
  ))
  .add('Limited', () => (
    <div style={{height: '200px', display: 'flex', alignItems: 'stretch'}}>
      <Tasks limited tasks={[
        {state: 'running', debut: moment().subtract(1, 'minutes').unix()},
        {state: 'crashed', debut: moment().subtract(5, 'minutes').unix(), end: moment().subtract('2', 's').unix()},
        {state: 'crashed', debut: moment().subtract(6, 'minutes').unix(), end: moment().subtract('3', 's').unix()},
        {state: 'stopped', debut: moment().subtract(7, 'minutes').unix(), end: moment().subtract('2', 's').unix()},
        {state: 'stopped', debut: moment().subtract(8, 'minutes').unix(), end: moment().subtract('1', 's').unix()},
        {state: 'running', debut: moment().subtract(10, 'minutes').unix()},
      ]}/>
    </div>
  ))
