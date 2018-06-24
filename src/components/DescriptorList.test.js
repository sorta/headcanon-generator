import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DescriptorList from './DescriptorList';
import DescriptorListItem from './DescriptorListItem';

const props = {
  descriptors: {
    d_test_1: { name: 'Test 1' },
    d_test_2: { name: 'Test 2' },
  },
  descriptorAvailability: {},
  updateDescriptor: jest.fn(),
  deleteDescriptor: jest.fn(),
  setAvailability: jest.fn(),
  isManaging: () => false,
};

// Tests for regular mode
describe("DescriptorList", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <DescriptorList { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a DescriptorList ul element', () => {
    const component = shallow(<DescriptorList { ...props } />);
    expect(component.find('ul.DescriptorList.options-list').exists()).toBe(true);
  });

  it('has right number of DescriptorListItems', () => {
    const component = shallow(<DescriptorList { ...props } />);
    expect(component.find(DescriptorListItem)).toHaveLength(Object.keys(props.descriptors).length);
  });
});
