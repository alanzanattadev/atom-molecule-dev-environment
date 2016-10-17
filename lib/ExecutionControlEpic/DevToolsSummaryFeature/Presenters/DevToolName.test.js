import React from 'react';
import {shallow} from 'enzyme';
import DevToolName from "./DevToolName";

describe('DevToolName', () => {
  it('should display devtool name', () => {
    let subject = shallow(<DevToolName>docker</DevToolName>);

    expect(subject.text()).toBe('docker');
  });

  it('should display settings icon', () => {
    let subject = shallow(<DevToolName>docker</DevToolName>);

    expect(subject.find('img').length).toBe(1);
  });

  it('should call onClick on click', () => {
    let spy = jest.fn();
    let subject = shallow(<DevToolName onClick={spy}>docker</DevToolName>);

    subject.find('div').at(0).simulate('click');

    expect(spy).toBeCalled();
  });
});
