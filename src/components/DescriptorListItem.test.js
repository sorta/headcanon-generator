import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DescriptorListItem from './DescriptorListItem';

const props = {
  descriptor: { name: 'Test 1' },
  descriptorAvailability: {},
  updateDescriptor: jest.fn(),
  deleteDescriptor: jest.fn(),
  setAvailability: jest.fn(),
  isManaging: () => false,
  index: 'd_test_1',
};

// Tests for regular mode
describe("DescriptorListItem", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <DescriptorListItem { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a DescriptorListItem li element', () => {
    const component = shallow(<DescriptorListItem { ...props } />);
    expect(component.find('li.DescriptorListItem.list-item').exists()).toBe(true);
  });

  it('has a checkbox and label', () => {
    const component = shallow(<DescriptorListItem { ...props } />);
    expect(component.find(`input[type="checkbox"][name="isAvailable"]#isAvailable_desc_${props.index}`).exists()).toBe(true);
    expect(component.find(`label[htmlFor="isAvailable_desc_${props.index}"]`).exists()).toBe(true);
  });
});
