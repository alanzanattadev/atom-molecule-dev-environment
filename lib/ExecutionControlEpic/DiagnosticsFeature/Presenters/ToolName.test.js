import React from 'react';
import { shallow, mount } from 'enzyme';
import ToolName from "./ToolName";

describe('ToolName', () => {
  it('should display tool name', () => {
    let subject = shallow(<ToolName>Gulp</ToolName>);

    expect(subject.text()).toBe('Gulp');
  });
});
