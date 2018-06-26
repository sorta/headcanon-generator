import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import App from './App';
// import Login from './Login';
import Router from './Router';

// Tests for logo
describe("Router", () => {
  it('has a landing route', () => {
    const component = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Router />
      </MemoryRouter>
    );
    expect(component.find(App).exists()).toBe(true);
  });
});
