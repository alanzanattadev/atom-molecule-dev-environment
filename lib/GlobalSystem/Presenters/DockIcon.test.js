import React from 'react';
import { shallow, mount } from 'enzyme';
import DockIcon from './DockIcon';

describe('DockIcon', () => {
  it('should display an icon', () => {
    let subject = mount(<DockIcon iconUri="devtool-icon-docker.png"/>);

    expect(subject.find('img').length).toBe(1);
    expect(subject.find('img').at(0).prop('src')).toBe('devtool-icon-docker.png');
  });

  it('should call onClick on click', () => {
    let spy = jest.fn();
    let subject = mount(<DockIcon iconUri="devtool-icon-docker.png" onClick={spy}/>);

    subject.find('div').at(0).simulate('click',);

    expect(spy).toBeCalled();
  });

  it('should show the name on hover', () => {
    let subject = mount(<DockIcon iconUri="devtool-icon-docker.png" name="docker"/>);

    // expect(subject.findWhere(comp => comp.type() == 'span' && comp.text() == 'docker').length).toBe(0);

    subject.find('div').at(0).simulate('mouseenter');

    expect(subject.findWhere(comp => comp.type() == 'span' && comp.text() == 'docker').length).toBe(1);

    subject.find('div').at(0).simulate('mouseleave');

    // expect(subject.findWhere(comp => comp.type() == 'span' && comp.text() == 'docker').length).toBe(0);
  });
});
