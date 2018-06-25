import React from 'react';
import { shallow, mount } from 'enzyme';
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

  it('clicking checkbox calls setAvailability', () => {
    const component = mount(<DescriptorListItem { ...props } />);
    component.find('input[type="checkbox"][name="isAvailable"]').simulate('change', { target: { checked: false } });
    expect(props.setAvailability.mock.calls.length).toEqual(1);
  });

  it('does not have edit elements', () => {
    const component = shallow(<DescriptorListItem { ...props } />);
    expect(component.find('input[name="name"]').exists()).toBe(false);
    expect(component.find('button.DescriptorListItem-delete').exists()).toBe(false);
  });
});

// Tests for managing mode
const mProps = { ...props };
mProps.isManaging = () => true;
describe("DescriptorListItem in managing mode", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <DescriptorListItem { ...mProps } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a DescriptorListItem li element', () => {
    const component = shallow(<DescriptorListItem { ...mProps } />);
    expect(component.find('li.DescriptorListItem.list-item').exists()).toBe(true);
  });

  it('has a checkbox and label', () => {
    const component = shallow(<DescriptorListItem { ...mProps } />);
    expect(component.find(`input[type="checkbox"][name="isAvailable"]#isAvailable_desc_${mProps.index}`).exists()).toBe(true);
    expect(component.find(`label[htmlFor="isAvailable_desc_${mProps.index}"]`).exists()).toBe(true);
  });

  it('clicking checkbox calls setAvailability', () => {
    const component = mount(<DescriptorListItem { ...mProps } />);
    component.find('input[type="checkbox"][name="isAvailable"]').simulate('change', { target: { checked: false } });
    expect(mProps.setAvailability.mock.calls.length).toEqual(2);
  });

  it('has edit elements', () => {
    const component = shallow(<DescriptorListItem { ...mProps } />);
    expect(component.find('input[name="name"]').exists()).toBe(true);
    expect(component.find('button.DescriptorListItem-delete').exists()).toBe(true);
  });

  it('clicking delete button calls deleteDescriptor', () => {
    const component = shallow(<DescriptorListItem { ...mProps } />);
    component.find('button.DescriptorListItem-delete').simulate('click');
    expect(mProps.deleteDescriptor.mock.calls.length).toEqual(1);
  });

  it('changing name value calls updateDescriptor', () => {
    const component = mount(<DescriptorListItem { ...mProps } />);
    component.find('input[name="name"]').simulate('change', { target: { value: 'TEST' } });
    expect(mProps.updateDescriptor.mock.calls.length).toEqual(1);
  });
});
