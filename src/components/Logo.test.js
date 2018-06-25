import React from 'react';
import { shallow } from 'enzyme';

import Logo from './Logo';

const props = {
  className: 'logo-test'
};

// Tests for logo
describe("Logo", () => {
  it('has an svg element', () => {
    const component = shallow(<Logo { ...props } />);
    expect(component.find(`svg.${props.className}`).exists()).toBe(true);
  });
});
