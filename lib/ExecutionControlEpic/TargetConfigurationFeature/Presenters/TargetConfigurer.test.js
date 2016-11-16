import React from 'react';
import {shallow} from 'enzyme';
import TargetConfigPart from "./TargetConfigPart";
import TargetConfigurer from "./TargetConfigurer";
import TargetConfigTextInputField from "./TargetConfigTextInputField";
import AddButton from "./AddButton";
import TargetConfigNumberInputField from "./TargetConfigNumberInputField";

describe('TargetConfigurer', () => {
  it('should display the config UI', () => {
    let subject = shallow(<TargetConfigurer config={{type: 'number'}}/>);

    expect(subject.find(TargetConfigPart).length).not.toBe(0);
  });

  it('should display an add button', () => {
    let subject = shallow(<TargetConfigurer config={{type: 'string'}}/>);

    expect(subject.find(AddButton).length).toBe(1);
  });

  it('should display a text input field for target name', () => {
    let subject = shallow(<TargetConfigurer config={{type: 'number'}}/>);

    expect(subject.find(TargetConfigTextInputField).length).toBe(1);
  });

  it('should call onAddTarget when add button is clicked', () => {
    let spy = jest.fn();
    let subject = shallow(<TargetConfigurer config={{type: 'number'}} onAddTarget={spy}/>);

    subject.find(TargetConfigTextInputField).at(0).simulate('change', "mytarget");
    subject.find(TargetConfigPart).at(0).simulate('change', 20);
    subject.find(AddButton).at(0).simulate('click');

    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0]).toEqual({
      name: 'mytarget',
      config: 20,
      stager: {
        type: 'integrated',
        host: null,
      }
    });
  });
});
