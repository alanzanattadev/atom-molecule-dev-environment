import React from 'react';
import {shallow} from 'enzyme';
import PlanConfigPart from "./PlanConfigPart";
import PlanConfigurer from "./PlanConfigurer";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import AddButton from "./AddButton";
import PlanConfigNumberInputField from "./PlanConfigNumberInputField";

describe('PlanConfigurer', () => {
  it('should display the config UI', () => {
    let subject = shallow(<PlanConfigurer config={{type: 'number'}}/>);

    expect(subject.find(PlanConfigPart).length).not.toBe(0);
  });

  it('should display an add button', () => {
    let subject = shallow(<PlanConfigurer config={{type: 'string'}}/>);

    expect(subject.find(AddButton).length).toBe(1);
  });

  it('should display a text input field for plan name', () => {
    let subject = shallow(<PlanConfigurer config={{type: 'number'}}/>);

    expect(subject.find(PlanConfigTextInputField).length).toBe(1);
  });

  it('should call onAddPlan when add button is clicked', () => {
    let spy = jest.fn();
    let subject = shallow(<PlanConfigurer config={{type: 'number'}} onAddPlan={spy}/>);

    subject.find(PlanConfigTextInputField).at(0).simulate('change', "myplan");
    subject.find(PlanConfigPart).at(0).simulate('change', 20);
    subject.find(AddButton).at(0).simulate('click');

    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0]).toEqual({
      name: 'myplan',
      config: 20,
      stager: {
        type: 'integrated',
        host: null,
      }
    });
  });
});
