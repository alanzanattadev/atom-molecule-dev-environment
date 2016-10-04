import React from 'react';
import { mount } from 'enzyme';
import TargetConfigPart from './TargetConfigPart';
import TargetConfigSelectInputField from "./TargetConfigSelectInputField";
import TargetConfigGroup from './TargetConfigGroup';
import TargetConfigTextInputField from './TargetConfigTextInputField';
import TargetConfigConditionalGroup from "./TargetConfigConditionalGroup";
import TargetConfigNumberInputField from './TargetConfigNumberInputField';
import TargetConfigCheckboxInputField from "./TargetConfigCheckboxInputField";
import TargetConfigList from "./TargetConfigList";

describe('TargetConfigPart', () => {
  it('should display a TargetConfigSelectInputField when type is enum', () => {
    let subject = mount(<TargetConfigPart type="enum" default="on-failure" value="on-failure" enum={[{
      value: 'no',
      description: 'No'
    }, {
      value: 'always',
      description: 'Always'
    }, {
      value: 'on-failure',
      description: 'On Failure'
    }, {
      value: 'unless-stopped',
      description: 'Unless Stopped'
    }]}/>);

    expect(subject.find(TargetConfigSelectInputField).length).toBe(1);
    expect(subject.find(TargetConfigSelectInputField).prop('options')).toBeDefined();
    expect(subject.find(TargetConfigSelectInputField).prop('default')).toBe('on-failure');
    expect(subject.find(TargetConfigSelectInputField).prop('value')).toBe('on-failure');
  });

  it('should display a TargetConfigGroup when type is object', () => {
    let subject = mount(<TargetConfigPart type="object" schemas={{
      image: { type: 'string' },
      command: { type: 'string' },
    }} value={{image: 'ubuntu', command: 'ls'}}/>);

    expect(subject.find(TargetConfigGroup).length).toBe(1);
    expect(subject.find(TargetConfigGroup).at(0).prop('schemas')).toBeDefined();
    expect(subject.find(TargetConfigGroup).at(0).prop('value')).toBeDefined();
  });

  it('should display a TargetConfigList when type is array', () => {
    let values = ["coucou"];
    let subject = mount(<TargetConfigPart type="array" items={{type: "string"}} default="" value={values}/>);

    expect(subject.find(TargetConfigList).length).toBe(1);
    expect(subject.find(TargetConfigList).at(0).prop('items')).toEqual({type: 'string'});
    expect(subject.find(TargetConfigList).at(0).prop('default')).toBe("");
    expect(subject.find(TargetConfigList).at(0).prop('values')).toBe(values);
  });

  it('should display a TargetConfigTextInputField when type is string', () => {
    let subject = mount(<TargetConfigPart type="string" value="my value"/>);

    expect(subject.find(TargetConfigTextInputField).length).toBe(1);
    expect(subject.find(TargetConfigTextInputField).prop('value')).toBe('my value');
  });

  it('should display a TargetConfigCheckBoxInputField when type is boolean', () => {
    let subject = mount(<TargetConfigPart type="boolean" value={true}/>);

    expect(subject.find(TargetConfigCheckboxInputField).length).toBe(1);
    expect(subject.find(TargetConfigCheckboxInputField).prop('value')).toBe(true);
  });

  it('should display a TargetConfigNumberInputField when type is number', () => {
    let subject = mount(<TargetConfigPart type="number" value={3}/>)

    expect(subject.find(TargetConfigNumberInputField).length).toBe(1);
    expect(subject.find(TargetConfigNumberInputField).at(0).prop('value')).toBe(3);
  });

  it('should display a TargetConfigConditionalGroup when type is conditional', () => {
    let spy = jest.fn();
    let subject = mount(
      <TargetConfigPart
        type="conditional"
        value={{expressionValue: 'ubuntu', caseValue: 14}}
        expression={{
          type: 'string',
          default: 'ubuntu',
          description: 'distribution'
        }}
        cases={{
          ubuntu: {
            type: 'number',
            default: '16'
          },
          fedora: {
            type: 'number',
            default: '24'
          }
        }}
        onChange={spy}
      />
    );

    subject.find(TargetConfigConditionalGroup).at(0).prop('onChange')({expressionValue: 'fedora', caseValue: 23});

    expect(subject.find(TargetConfigConditionalGroup).length).toBe(1);
    expect(subject.find(TargetConfigConditionalGroup).at(0).prop('value')).toEqual({expressionValue: 'ubuntu', caseValue: 14});
    expect(spy).toBeCalledWith({expressionValue: 'fedora', caseValue: 23});
  });
});
