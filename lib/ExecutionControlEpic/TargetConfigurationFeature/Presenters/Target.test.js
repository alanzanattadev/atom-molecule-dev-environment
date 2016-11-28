import React from 'react';
import {shallow, mount} from 'enzyme';
import Target from "./Target";
import PinButton from './PinButton';
import {StyleRoot} from 'radium';

describe('Target', () => {
  it('should display the target name', () => {
    let subject = mount(<StyleRoot><Target name="build"/></StyleRoot>);

    expect(subject.findWhere(comp => comp.type() == "span" && comp.text() == "build").length).toBe(1);
  });

  it('should display a pin button when pinnable props is passed', () => {
    let subject = mount(<StyleRoot><Target pinnable/></StyleRoot>);

    expect(subject.find(PinButton).length).toBe(1);
  });

  it('should display the tool icon', () => {
    let subject = mount(<StyleRoot><Target iconUri="atom://myplugin/icon.png"/></StyleRoot>);

    expect(subject.find('img').at(0).prop('src')).toBe('atom://myplugin/icon.png');
  });

  it('should call onPin when pin button is clicked', () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Target pinnable onPin={spy}/></StyleRoot>);

    subject.find(PinButton).at(0).simulate('click');

    expect(spy).toBeCalled();
  });
});
