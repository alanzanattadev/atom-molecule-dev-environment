import React from 'react';
import { mount, shallow } from 'enzyme';
import TargetConfigGroup from './TargetConfigGroup';
import TargetConfigPart from './TargetConfigPart';
import TargetConfigSelectInputField from "./TargetConfigSelectInputField";

describe('TargetConfigGroup', () => {
  it('should display a TargetConfigPart for every key of schemas', () => {
    let subject = shallow(<TargetConfigGroup schemas={{
      image: { type: 'string' },
      scale: { type: 'number' }
    }} value={{image: "ubuntu", scale: 3}}/>);

    subject.find('div').at(1).simulate('click');

    expect(subject.find(TargetConfigPart).length).toBe(2);
    expect(subject.find(TargetConfigPart).at(0).prop('type')).toBe('string');
    expect(subject.find(TargetConfigPart).at(0).prop('value')).toBe('ubuntu');
    expect(subject.find(TargetConfigPart).at(1).prop('type')).toBe('number');
  });

  it('should call onChange when a part is changed', () => {
    let spy = jest.fn();
    let subject = shallow(<TargetConfigGroup schemas={{
      image: { type: 'string' },
      scale: { type: 'number' }
    }} onChange={spy} value={{image: 'ubuntu', scale: 3}}/>);

    subject.find('div').at(1).simulate('click');
    subject.find('TargetConfigPart').at(1).prop('onChange')(4);

    expect(spy).toBeCalledWith({image: 'ubuntu', scale: 4});
  });
});
