import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import SubjectList from './SubjectList';
import SubjectListItem from './SubjectListItem';

const props = {
  subjects: {
    s_test_1: { name: 'Test 1' },
    s_test_2: { name: 'Test 2' },
    s_test_3: { name: 'Test 3' },
  },
  subjectAvailability: {},
  updateSubject: jest.fn(),
  deleteSubject: jest.fn(),
  setAvailability: jest.fn(),
  isManaging: () => false,
  subjectKeys: [
    's_test_1',
    's_test_2',
    's_test_3',
  ],
  fandomAvailability: {},
};

// Tests for regular mode
describe("SubjectList", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <SubjectList { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a SubjectList ul element', () => {
    const component = shallow(<SubjectList { ...props } />);
    expect(component.find('ul.SubjectList.options-list').exists()).toBe(true);
  });

  it('has right number of SubjectListItems', () => {
    const component = shallow(<SubjectList { ...props } />);
    expect(component.find(SubjectListItem)).toHaveLength(props.subjectKeys.length);
  });
});
