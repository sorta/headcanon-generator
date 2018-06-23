import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import AddDescriptorForm from './AddDescriptorForm';

const props = {
  addDescriptor: jest.fn(),
  isManaging: () => false,
};

// Tests for regular mode
describe("AddDescriptorForm", () => {
  const component = shallow(<AddDescriptorForm addDescriptor={props.addDescriptor} isManaging={props.isManaging} />);

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <AddDescriptorForm addDescriptor={props.addDescriptor} isManaging={props.isManaging} />
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
describe("AddDescriptorForm in managing mode", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <AddDescriptorForm addDescriptor={props.addDescriptor} isManaging={props.isManaging} />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a name input field', () => {
    const component = shallow(<AddDescriptorForm addDescriptor={props.addDescriptor} isManaging={props.isManaging} />);
    expect(component.find('input[name="name"]').exists()).toBe(true);
  });

  it('should have a submit button', () => {
    const component = shallow(<AddDescriptorForm addDescriptor={props.addDescriptor} isManaging={props.isManaging} />);
    expect(component.find('button[type="submit"]').exists()).toBe(true);
  });

  it('form submit should call addDescriptor', () => {
    const component = mount(<AddDescriptorForm addDescriptor={props.addDescriptor} isManaging={props.isManaging} />);
    component.find('input[name="name"]').instance().value = 'TESTING';
    component.find('button[type="submit"]').simulate('submit');
    expect(props.addDescriptor.mock.calls.length).toEqual(1);
  });
});
