import React from 'react';
import { mount } from 'enzyme';
import PlanConfigNumberInputField from "./PlanConfigNumberInputField";

describe('PlanConfigNumberInputField', () => {
  it('should display value', () => {
    let subject = mount(<PlanConfigNumberInputField value={2}/>);

    expect(subject.find('input[type="number"]').at(0).prop('value')).toBe(2);
  });

  it('should call onChange when a key is pressed', () => {
    let spy = jest.fn();
    let subject = mount(<PlanConfigNumberInputField value={2} onChange={spy}/>);

    subject.find('input[type="number"]').at(0).simulate('change', {target: {value: 4}});

    expect(spy).toBeCalledWith(4);
  });
});
