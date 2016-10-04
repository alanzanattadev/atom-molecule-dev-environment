import React from 'react';
import {mount} from 'enzyme';
import TargetConfigConditionalGroup from "./TargetConfigConditionalGroup";
import TargetConfigTextInputField from "./TargetConfigTextInputField";
import TargetConfigNumberInputField from "./TargetConfigNumberInputField";
import TargetConfigPart from "./TargetConfigPart";

describe('TargetConfigConditionalGroup', () => {
  it('should display the expression', () => {
    let subject = mount(<TargetConfigConditionalGroup expression={{
      type: 'string',
      default: 'ubuntu',
      description: 'distrib'
    }} cases={{
      ubuntu: {
        type: 'number',
        description: 'version'
      },
      archlinux: null
    }} value={{expressionValue: 'ubuntu', caseValue: 12}}/>);

    expect(subject.find(TargetConfigTextInputField).length).toBe(1);
    expect(subject.find(TargetConfigTextInputField).at(0).prop('value')).toBe('ubuntu');
  });

  it('should display the case that matches with the expression', () => {
    let subject = mount(<TargetConfigConditionalGroup expression={{
      type: 'string',
      default: 'ubuntu',
      description: 'distrib'
    }} value={{expressionValue: "ubuntu", caseValue: 14}} cases={{
      ubuntu: {
        type: 'number',
        description: 'version'
      },
      archlinux: null
    }}/>);

    expect(subject.find(TargetConfigNumberInputField).length).toBe(1);
    expect(subject.find(TargetConfigNumberInputField).at(0).prop('value')).toBe(14);
  });

  it('shouldn\'t display the case if it doesn\'t match with the expression', () => {
    let subject = mount(<TargetConfigConditionalGroup expression={{
      type: 'string',
      default: 'ubuntu',
      description: 'distrib'
    }} value={{expressionValue:"archlinux"}} cases={{
      ubuntu: {
        type: 'number',
        description: 'version'
      },
      archlinux: null
    }}/>);

    expect(subject.find(TargetConfigNumberInputField).length).toBe(0);
  });

  it('shouldn\'t crash if case not found', () => {
    let subject = mount(<TargetConfigConditionalGroup expression={{
      type: 'string',
      default: 'ubuntu',
      description: 'distrib'
    }} value={{expressionValue:"redhat"}} cases={{
      ubuntu: {
        type: 'number',
        description: 'version'
      },
      archlinux: null
    }}/>);
  });

  it('should call onChange when expression change', () => {
    let spy = jest.fn();
    let subject = mount(<TargetConfigConditionalGroup expression={{
      type: 'string',
      default: 'ubuntu',
      description: 'distrib'
    }} value={{expressionValue:"redhat", caseValue: null}} cases={{
      ubuntu: {
        type: 'number',
        description: 'version'
      },
      archlinux: null
    }} onChange={spy}/>);

    subject.find(TargetConfigPart).at(0).prop('onChange')('fedora');

    expect(spy).toBeCalledWith({expressionValue: "fedora", caseValue: null});
  });

  it('should call onChange when matching case change', () => {
    let spy = jest.fn();
    let subject = mount(<TargetConfigConditionalGroup expression={{
      type: 'string',
      default: 'ubuntu',
      description: 'distrib'
    }}  value={{expressionValue:"ubuntu", caseValue: 14}} cases={{
      ubuntu: {
        type: 'number',
        description: 'version'
      },
      archlinux: null
    }} onChange={spy}/>);

    subject.find(TargetConfigPart).at(1).prop('onChange')(16);

    expect(spy).toBeCalledWith({expressionValue: 'ubuntu', caseValue: 16});
  });

  it('should change value with the default case value when another case is used', () => {
    let spy = jest.fn();
    let subject = mount(<TargetConfigConditionalGroup expression={{
      type: 'string',
      default: 'archlinux',
      description: 'distrib'
    }} value={{expressionValue:"archlinux", caseValue: 14}} cases={{
      ubuntu: {
        type: 'number',
        default: 16,
        description: 'version'
      },
      archlinux: null
    }} onChange={spy}/>);;

    subject.find(TargetConfigPart).at(0).prop('onChange')('ubuntu');

    expect(spy).toBeCalledWith({expressionValue: 'ubuntu', caseValue: 16});
  });
});
