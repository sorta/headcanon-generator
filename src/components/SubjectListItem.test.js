import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import SubjectListItem from './SubjectListItem';

const props = {
  subject: { name: 'Test 1', fandomKey: 'f_test_1' },
  subjectAvailability: {},
  updateSubject: jest.fn(),
  deleteSubject: jest.fn(),
  setAvailability: jest.fn(),
  isManaging: () => false,
  index: 's_test_1',
  fandomAvailability: {},
};

// Tests for regular mode
describe("SubjectListItem", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <SubjectListItem { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a SubjectListItem li element', () => {
    const component = shallow(<SubjectListItem { ...props } />);
    expect(component.find('li.SubjectListItem.list-item').exists()).toBe(true);
  });

  it('has a checkbox and label', () => {
    const component = shallow(<SubjectListItem { ...props } />);
    expect(component.find(`input[type="checkbox"][name="isAvailable"]#isAvailable_subj_${props.index}`).exists()).toBe(true);
    expect(component.find(`label[htmlFor="isAvailable_subj_${props.index}"]`).exists()).toBe(true);
  });

  it('clicking checkbox calls setAvailability', () => {
    const component = mount(<SubjectListItem { ...props } />);
    component.find('input[type="checkbox"][name="isAvailable"]').simulate('change', { target: { checked: false } });
    expect(props.setAvailability.mock.calls.length).toEqual(1);
  });

  it('does not have edit elements', () => {
    const component = shallow(<SubjectListItem { ...props } />);
    expect(component.find('input[name="name"]').exists()).toBe(false);
    expect(component.find('button.SubjectListItem-delete').exists()).toBe(false);
  });
});

// Tests for managing mode
const mProps = { ...props };
mProps.isManaging = () => true;
describe("SubjectListItem in managing mode", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <SubjectListItem { ...mProps } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a SubjectListItem li element', () => {
    const component = shallow(<SubjectListItem { ...mProps } />);
    expect(component.find('li.SubjectListItem.list-item').exists()).toBe(true);
  });

  it('has a checkbox and label', () => {
    const component = shallow(<SubjectListItem { ...mProps } />);
    expect(component.find(`input[type="checkbox"][name="isAvailable"]#isAvailable_subj_${mProps.index}`).exists()).toBe(true);
    expect(component.find(`label[htmlFor="isAvailable_subj_${mProps.index}"]`).exists()).toBe(true);
  });

  it('clicking checkbox calls setAvailability', () => {
    const component = mount(<SubjectListItem { ...mProps } />);
    component.find('input[type="checkbox"][name="isAvailable"]').simulate('change', { target: { checked: false } });
    expect(mProps.setAvailability.mock.calls.length).toEqual(2);
  });

  it('has edit elements', () => {
    const component = shallow(<SubjectListItem { ...mProps } />);
    expect(component.find('input[name="name"]').exists()).toBe(true);
    expect(component.find('button.SubjectListItem-delete').exists()).toBe(true);
  });

  it('clicking delete button calls deleteSubject', () => {
    const component = shallow(<SubjectListItem { ...mProps } />);
    component.find('button.SubjectListItem-delete').simulate('click');
    expect(mProps.deleteSubject.mock.calls.length).toEqual(1);
  });

  it('changing name value calls updateSubject', () => {
    const component = mount(<SubjectListItem { ...mProps } />);
    component.find('input[name="name"]').simulate('change', { target: { value: 'TEST' } });
    expect(mProps.updateSubject.mock.calls.length).toEqual(1);
  });
});
