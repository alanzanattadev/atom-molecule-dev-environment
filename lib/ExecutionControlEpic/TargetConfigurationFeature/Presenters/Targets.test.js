import React from 'react';
import {shallow, mount} from 'enzyme';
import Target from "./Target";
import Targets from "./Targets";
import PinButton from "./PinButton";
import type {TargetConfig} from "../Types/types.js.flow";
import {StyleRoot} from 'radium';

describe('Targets', () => {
  let targets: Array<TargetConfig> = [{
    name: 'build',
    tool: {
      id: 'gulp',
      name: 'gulp',
      iconUri: 'atom://molecule-gulp/icon.png'
    },
    config: "build",
    pinned: false,
    state: 'running'
  }, {
    name: 'watch',
    tool: {
      id: 'gulp',
      name: 'gulp',
      iconUri: 'atom://molecule-gulp/icon.png'
    },
    config: "watch",
    pinned: false
  }, {
    name: 'clean',
    tool: {
      id: 'gulp',
      name: 'gulp',
      iconUri: 'atom://molecule-gulp/icon.png'
    },
    config: "clean",
    pinned: false
  }];
  it('should display the targets', () => {
    let subject = mount(<StyleRoot><Targets targets={targets}/></StyleRoot>);

    expect(subject.find(Target).length).toBe(3);
    expect(subject.find(Target).at(0).prop('iconUri')).toBe('atom://molecule-gulp/icon.png');
    expect(subject.find(Target).at(0).prop('name')).toBe('build');
    expect(subject.find(Target).at(0).prop('state')).toBe('running');
  });

  it('should call onTargetClick with the right target on target click', () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Targets targets={targets} onTargetClick={spy}/></StyleRoot>);

    subject.find(Target).at(1).simulate('click');

    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0]).toEqual(targets[1]);
  });

  it('should pass pinnable props to every targets', () => {
    let subject = mount(<StyleRoot><Targets targets={targets} pinnable/></StyleRoot>);

    expect(subject.find(Target).at(0).prop('pinnable')).toBe(true);
  });

  it('should call onTargetPin with the right target on target pin click', () => {
    let spy = jest.fn();
    let subject = mount(<StyleRoot><Targets targets={targets} pinnable onTargetPin={spy}/></StyleRoot>);

    subject.find(PinButton).at(1).simulate('click');

    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0]).toEqual(targets[1]);
  });
});
