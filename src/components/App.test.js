import React from 'react';
import { mount, shallow } from 'enzyme';

import App from './App';

const props = {
  uid: null,
  oid: null,
};

// Tests for App
describe("App", () => {
  it('renders successfully', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find('div.App-main').exists()).toBe(true);
  });
});
