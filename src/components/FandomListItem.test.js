import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import FandomListItem from './FandomListItem';

const props = {
  fandom: { name: 'Test 1' },
  fandomAvailability: {},
  updateFandom: jest.fn(),
  deleteFandom: jest.fn(),
  setAvailability: jest.fn(),
  isManaging: () => false,
  index: 'f_test_1',
  selectFandom: jest.fn(),
  selectedFandomKey: '',
};

// Tests for regular mode
describe("FandomListItem", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <FandomListItem { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a FandomListItem li element', () => {
    const component = shallow(<FandomListItem { ...props } />);
    expect(component.find('li.FandomListItem.list-item').exists()).toBe(true);
  });

  it('has a checkbox and label', () => {
    const component = shallow(<FandomListItem { ...props } />);
    expect(component.find(`input[type="checkbox"][name="isAvailable"]#isAvailable_fand_${props.index}`).exists()).toBe(true);
    expect(component.find(`label[htmlFor="isAvailable_fand_${props.index}"]`).exists()).toBe(true);
  });

  it('clicking checkbox calls setAvailability', () => {
    const component = mount(<FandomListItem { ...props } />);
    component.find('input[type="checkbox"][name="isAvailable"]').simulate('change', { target: { checked: false } });
    expect(props.setAvailability.mock.calls.length).toEqual(1);
  });

  it('does not have edit elements', () => {
    const component = shallow(<FandomListItem { ...props } />);
    expect(component.find('input[name="name"]').exists()).toBe(false);
    expect(component.find('button.FandomListItem-delete').exists()).toBe(false);
  });

  it('clicking select button calls selectFandom', () => {
    const component = mount(<FandomListItem { ...props } />);
    component.find('button.FandomListItem-select').simulate('click');
    expect(props.selectFandom.mock.calls.length).toEqual(1);
  });
});

// Tests for managing mode
const mProps = { ...props };
mProps.isManaging = () => true;
describe("FandomListItem in managing mode", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <FandomListItem { ...mProps } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a FandomListItem li element', () => {
    const component = shallow(<FandomListItem { ...mProps } />);
    expect(component.find('li.FandomListItem.list-item').exists()).toBe(true);
  });

  it('has a checkbox and label', () => {
    const component = shallow(<FandomListItem { ...mProps } />);
    expect(component.find(`input[type="checkbox"][name="isAvailable"]#isAvailable_fand_${mProps.index}`).exists()).toBe(true);
    expect(component.find(`label[htmlFor="isAvailable_fand_${mProps.index}"]`).exists()).toBe(true);
  });

  it('clicking checkbox calls setAvailability', () => {
    const component = mount(<FandomListItem { ...mProps } />);
    component.find('input[type="checkbox"][name="isAvailable"]').simulate('change', { target: { checked: false } });
    expect(mProps.setAvailability.mock.calls.length).toEqual(2);
  });

  it('has edit elements', () => {
    const component = shallow(<FandomListItem { ...mProps } />);
    expect(component.find('input[name="name"]').exists()).toBe(true);
    expect(component.find('button.FandomListItem-delete').exists()).toBe(true);
  });

  it('clicking delete button calls deleteFandom', () => {
    const component = shallow(<FandomListItem { ...mProps } />);
    component.find('button.FandomListItem-delete').simulate('click');
    expect(mProps.deleteFandom.mock.calls.length).toEqual(1);
  });

  it('changing name value calls updateFandom', () => {
    const component = mount(<FandomListItem { ...mProps } />);
    component.find('input[name="name"]').simulate('change', { target: { value: 'TEST' } });
    expect(mProps.updateFandom.mock.calls.length).toEqual(1);
  });

  it('clicking select button calls selectFandom', () => {
    const component = mount(<FandomListItem { ...mProps } />);
    component.find('button.FandomListItem-select').simulate('click');
    expect(props.selectFandom.mock.calls.length).toEqual(2);
  });
});
