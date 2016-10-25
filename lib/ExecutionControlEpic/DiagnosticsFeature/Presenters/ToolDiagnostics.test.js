import React from 'react';
import { shallow, mount } from 'enzyme';
import ToolDiagnostics from './ToolDiagnostics';
import DiagnosticsTraveller from "./DiagnosticsTraveller";
import CloseButton from "./CloseButton";
import ToolName from "./ToolName";

describe('ToolDiagnostics', () => {
  it('should display diagnostics traveller', () => {
    let diagnostics = [{type: "warning", message: "salut"}]
    let subject = shallow(<ToolDiagnostics diagnostics={diagnostics}/>);

    expect(subject.find(DiagnosticsTraveller).length).toBe(1);
    expect(subject.find(DiagnosticsTraveller).at(0).prop('diagnostics')).toEqual(diagnostics);
  });

  it('should display a close button', () => {
    let subject = shallow(<ToolDiagnostics/>);

    expect(subject.find(CloseButton).length).toBe(1);
  });

  it('should display tool name', () => {
    let subject = mount(<ToolDiagnostics toolName="gulp"/>);

    expect(subject.find(ToolName).length).toBe(1);
    expect(subject.find(ToolName).at(0).prop('children')).toBe("gulp");
  });

  it('should call onClose on close button click', () => {
    let spy = jest.fn();
    let subject = shallow(<ToolDiagnostics onClose={spy}/>);

    subject.find(CloseButton).at(0).simulate('click');

    expect(spy).toBeCalled();
  });
});
