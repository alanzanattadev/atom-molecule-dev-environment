import React from 'react';
import { shallow, mount } from 'enzyme';
import LogsButton from "./LogsButton";
import DiagnosticsModeSelector from './DiagnosticsModeSelector';
import OrganizedButton from "./OrganizedButton";

describe('DiagnosticsModeSelector', () => {
  it('should display a logs button if type props is organized', () => {
    let subject = shallow(<DiagnosticsModeSelector type="organized"/>);

    expect(subject.find(LogsButton).length).toBe(1);
  });

  it('should display an organized button if type props is logs', () => {
    let subject = shallow(<DiagnosticsModeSelector type="logs"/>);

    expect(subject.find(OrganizedButton).length).toBe(1);
  });

  it('should call onClick on click', () => {
    let spy = jest.fn();
    let subject = shallow(<DiagnosticsModeSelector type="logs" onClick={spy}/>);

    subject.find('button').at(0).simulate('click');

    expect(spy).toBeCalled();
  });
});
