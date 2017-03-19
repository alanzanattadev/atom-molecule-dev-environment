import React from 'react';
import { shallow, mount } from 'enzyme';
import Plan from './Plan';
import PinButton from './PinButton';
import { StyleRoot } from 'radium';

describe('Plan', () => {
  it('should display the plan name', () => {
    let subject = mount(<StyleRoot><Plan name="build" /></StyleRoot>);

    expect(
      subject.findWhere(
        comp => comp.type() == 'span' && comp.text() == 'build',
      ).length,
    ).toBe(1);
  });

  // Did not found a way to test it, if you look in console should display ['Pin','Remove']
  it('should display a context menu with Pin and Remove when pinnable is passed', () => {
    let subject = mount(<StyleRoot><Plan pinnable /></StyleRoot>);
    subject.find(Plan).simulate('contextmenu');
  });

  // Did not found a way to test it, if you look in console should display ['Unpin','Remove'] but display ['Pin','Remove','Un-pin','Remove']
  it('should display a context menu with Unpin and Remove when pinnable is not passed', () => {
    let subject = mount(<StyleRoot><Plan /></StyleRoot>);
    subject.find(Plan).simulate('contextmenu');
  });

  it('should display the tool icon', () => {
    let subject = mount(
      <StyleRoot><Plan iconUri="atom://myplugin/icon.png" /></StyleRoot>,
    );

    expect(subject.find('img').at(0).prop('src')).toBe(
      'atom://myplugin/icon.png',
    );
  });

  // Can't click on contextmenu so can't test it.
  it('should call onPin when Pin in context menu is clicked', () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Plan pinnable onPin={spy} /></StyleRoot>);

    subject.simulate('contextmenu');
  });
});
