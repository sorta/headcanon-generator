import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import NotFound from './NotFound';

// Tests for component
describe("NotFound with no subject or descriptor", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <NotFound />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has an h2 element', () => {
    const component = shallow(<NotFound />);
    expect(component.find('h2').exists()).toBe(true);
    expect(component.find('h2').text()).toBe('Not Found!');
  });
});
