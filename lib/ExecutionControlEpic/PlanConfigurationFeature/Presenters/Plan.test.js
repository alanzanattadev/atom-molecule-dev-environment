import React from 'react';
import {shallow, mount} from 'enzyme';
import Plan from "./Plan";
import PinButton from './PinButton';
import {StyleRoot} from 'radium';

describe('Plan', () => {
  it('should display the plan name', () => {
    let subject = mount(<StyleRoot><Plan name="build"/></StyleRoot>);

    expect(subject.findWhere(comp => comp.type() == "span" && comp.text() == "build").length).toBe(1);
  });

  it('should display a pin button when pinnable props is passed', () => {
    let subject = mount(<StyleRoot><Plan pinnable/></StyleRoot>);

    expect(subject.find(PinButton).length).toBe(1);
  });

  it('should display the tool icon', () => {
    let subject = mount(<StyleRoot><Plan iconUri="atom://myplugin/icon.png"/></StyleRoot>);

    expect(subject.find('img').at(0).prop('src')).toBe('atom://myplugin/icon.png');
  });

  it('should call onPin when pin button is clicked', () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Plan pinnable onPin={spy}/></StyleRoot>);

    subject.find(PinButton).at(0).simulate('click');

    expect(spy).toBeCalled();
  });
});
