import React from 'react';
import { shallow } from 'enzyme';

import Login from './Login';

const props = {
  authenticate: () => {},
  logout: () => {},
  uid: '',
};

// Tests for logo
describe("Login", () => {
  it('has an App-login element', () => {
    const component = shallow(<Login { ...props } />);
    expect(component.find('.App-login').exists()).toBe(true);
  });

  it('has a login button', () => {
    const component = shallow(<Login { ...props } />);
    expect(component.find('.btn-login')).toHaveLength(1);
  });

  it('does not have a logout button', () => {
    const component = shallow(<Login { ...props } />);
    expect(component.find('.btn-logout')).toHaveLength(0);
  });
});

const lProps = { ...props, uid: '12345' };
describe("Logout", () => {
  it('has an App-login element', () => {
    const component = shallow(<Login { ...lProps } />);
    expect(component.find('.App-login').exists()).toBe(true);
  });

  it('does not have a login button', () => {
    const component = shallow(<Login { ...lProps } />);
    expect(component.find('.btn-login')).toHaveLength(0);
  });

  it('has a logout button', () => {
    const component = shallow(<Login { ...lProps } />);
    expect(component.find('.btn-logout')).toHaveLength(1);
  });
});
