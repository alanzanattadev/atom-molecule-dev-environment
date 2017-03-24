'use babel';
// @flow
import React from 'react';
import FlowLogData from "../Fake/Data/FlowLogData";
import FlowDiagnostic from './FlowDiagnostic';
import FlowDiagnosticExtras from './FlowDiagnosticExtras';
import FlowDiagnosticMessages from './FlowDiagnosticMessages';
import { shallow, mount } from 'enzyme';

describe('FlowDiagnostic', () => {
  it('should display messages of diagnostic', () => {
    let data = {
      message: [
        {
          context: 'describe("AssociatedFiles", () => {',
          descr: 'identifier `describe`',
          type: 'Blame',
          path: 'lib/EditorContextEpic/TabsManagmentFeature/Model/AssociatedFiles.test.js',
          line: 10,
          endline: 10,
          start: 1,
          end: 8
        },
        {
          context: null,
          descr: 'Could not resolve name',
          type: 'Comment',
          path: '',
          line: 0,
          endline: 0,
          start: 1,
          end: 0
        }
      ]
    };
    let subject = shallow(<FlowDiagnostic log={data} />);

    expect(subject.find(FlowDiagnosticMessages).length).toBe(1);
  });

  it('should display extras from diagnostic', () => {
    let subject = shallow(<FlowDiagnostic log={FlowLogData} />);

    expect(subject.find(FlowDiagnosticExtras).length).toBe(1);
  });

  it('should display a messages diagnostic from operation object', () => {
    let data = {
      operation: {
        context: 'describe("AssociatedFiles", () => {',
        descr: 'identifier `describe`',
        type: 'Blame',
        path: 'lib/EditorContextEpic/TabsManagmentFeature/Model/AssociatedFiles.test.js',
        line: 10,
        endline: 10,
        start: 1,
        end: 8
      }
    };
    let subject = shallow(<FlowDiagnostic log={data} />);

    expect(subject.find(FlowDiagnosticMessages).length).toBe(2);
  });
});
