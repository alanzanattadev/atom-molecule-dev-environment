import React from 'react';
import { mount } from 'enzyme';
import TargetConfigTextInputField from "./TargetConfigTextInputField";

describe('TargetConfigTextInputField', () => {
  it('should display the value', () => {
    let subject = mount(<TargetConfigTextInputField value={"alan"}/>);

    expect(subject.find('input[type="text"]').at(0).prop('value')).toBe('alan');
  });

  it('should call onChange when a key is pressed', () => {
    let spy = jest.fn();
    let subject = mount(<TargetConfigTextInputField value={"alan"} onChange={spy}/>);

    subject.find('input[type="text"]').at(0).simulate('change', {target: {value: 'new value'}})

    expect(spy).toBeCalledWith('new value');
  });
});
