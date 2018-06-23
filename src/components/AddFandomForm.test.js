import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import AddFandomForm from './AddFandomForm';

const props = {
  addFandom: jest.fn(),
  isManaging: () => false,
};

// Tests for regular mode
describe("AddFandomForm", () => {
  const component = shallow(<AddFandomForm { ...props } />);

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <AddFandomForm { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be null when not managing', () => {
    expect(component.getElement()).toBe(null);
  });
});


// Tests for managing mode
props.isManaging = () => true;
describe("AddFandomForm in managing mode", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <AddFandomForm { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a name input field', () => {
    const component = shallow(<AddFandomForm { ...props } />);
    expect(component.find('input[name="name"]').exists()).toBe(true);
  });

  it('should have a submit button', () => {
    const component = shallow(<AddFandomForm { ...props } />);
    expect(component.find('button[type="submit"]').exists()).toBe(true);
  });

  it('form submit should call addFandom', () => {
    const component = mount(<AddFandomForm { ...props } />);
    component.find('input[name="name"]').instance().value = 'TESTING';
    component.find('button[type="submit"]').simulate('submit');
    expect(props.addFandom.mock.calls.length).toEqual(1);
  });
});
