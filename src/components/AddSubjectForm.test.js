import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import AddSubjectForm from './AddSubjectForm';

const props = {
  addSubject: jest.fn(),
  isManaging: () => false,
  selectedFandomKey: '',
};

// Tests for regular mode
describe("AddSubjectForm", () => {
  const component = shallow(<AddSubjectForm { ...props } />);

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <AddSubjectForm { ...props } />
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
describe("AddSubjectForm in managing mode", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <AddSubjectForm { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a name input field', () => {
    const component = shallow(<AddSubjectForm { ...props } />);
    expect(component.find('input[name="name"]').exists()).toBe(true);
  });

  it('should have a submit button', () => {
    const component = shallow(<AddSubjectForm { ...props } />);
    expect(component.find('button[type="submit"]').exists()).toBe(true);
  });

  it('form submit should call addSubject', () => {
    const component = mount(<AddSubjectForm { ...props } />);
    component.find('input[name="name"]').instance().value = 'TESTING';
    component.find('button[type="submit"]').simulate('submit');
    expect(props.addSubject.mock.calls.length).toEqual(1);
  });
});
