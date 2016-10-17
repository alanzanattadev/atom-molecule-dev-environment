import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DiagnosticsSummaryCircle from "./DiagnosticsSummaryCircle";


storiesOf('DiagnosticsSummaryCircle', module)
  .add('Warning', () => (
    <DiagnosticsSummaryCircle type="warning" number={2}/>
  ))
  .add('Error', () => (
    <DiagnosticsSummaryCircle type="error" number={2}/>
  ))
  .add('Info', () => (
    <DiagnosticsSummaryCircle type="info" number={2}/>
  ))
  .add('Success', () => (
    <DiagnosticsSummaryCircle type="success" number={2}/>
  ))
