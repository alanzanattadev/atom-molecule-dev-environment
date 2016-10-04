import React from 'react';
import {shallow} from 'enzyme';
import Target from "./Target";
import PinButton from './PinButton';

describe('Target', () => {
  it('should display the target name', () => {
    let subject = shallow(<Target name="build"/>);

    expect(subject.find('span').at(0).text()).toBe('build');
  });

  it('should display a pin button when pinnable props is passed', () => {
    let subject = shallow(<Target pinnable/>);

    expect(subject.find(PinButton).length).toBe(1);
  });

  it('should display the tool icon', () => {
    let subject = shallow(<Target iconUri="atom://myplugin/icon.png"/>);

    expect(subject.find('img').at(0).prop('src')).toBe('atom://myplugin/icon.png');
  });

  it('should call onPin when pin button is clicked', () => {
    let spy = jest.fn();
    let subject = shallow(<Target pinnable onPin={spy}/>);

    subject.find(PinButton).at(0).simulate('click');

    expect(spy).toBeCalled();
  });
});
