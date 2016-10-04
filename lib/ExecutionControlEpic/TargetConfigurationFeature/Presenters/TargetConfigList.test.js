import React from 'react';
import { mount } from 'enzyme';
import TargetConfigList from "./TargetConfigList";
import TargetConfigPart from './TargetConfigPart';
import AddButton from "./AddButton";

describe('TargetConfigList', () => {
  let spy = jest.fn();
  let subject = mount(
    <TargetConfigList
      values={[{name: "NODE_TARGET", value: "web"}, {name: "NODE_ENV", value: "dev"}]}
      items={{
        type: 'object',
        schemas: {
          name: {
            type: 'string',
            default: '',
            placeholder: 'name'
          },
          value: {
            type: 'string',
            default: '',
            placeholder: 'value'
          }
        }
      }}
      onChange={spy}
    />
  );
  it('should display the values', () => {
    expect(subject.find(TargetConfigPart).length).toBe(6); // nested parts
    expect(subject.find(TargetConfigPart).at(3).prop('value')).toEqual({name: 'NODE_ENV', value: 'dev'});
    expect(subject.find(TargetConfigPart).at(3).prop('type')).toBe('object');
    expect(subject.find(TargetConfigPart).at(3).prop('schemas')).toEqual({
      name: {
        type: 'string',
        default: '',
        placeholder: 'name'
      },
      value: {
        type: 'string',
        default: '',
        placeholder: 'value'
      }
    });
  });

  it('should display an add button', () => {
    expect(subject.find(AddButton).length).toBe(1);
  });

  it('should add a value when button is clicked', () => {
    subject.find(AddButton).at('0').simulate('click', {});

    expect(spy).toBeCalledWith([{name: "NODE_TARGET", value: "web"}, {name: "NODE_ENV", value: "dev"}, {name: '', value: ''}]);
  });
});
