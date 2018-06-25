import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Subjects from './Subjects';
import AddSubjectForm from './AddSubjectForm';
import SubjectList from './SubjectList';

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
  fandomAvailability: {},
  fandom: {},
  addSubject: jest.fn(),
};

// Tests for no fandom selected
describe("Subjects with no fandom selected", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <Subjects { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('is null when no fandom is selected', () => {
    const component = shallow(<Subjects { ...props } />);
    expect(component.getElement()).toBe(null);
  });
});

// Tests for fandom selected
const sProps = { ...props };
sProps.fandom = { name: 'Fandom 1' };
describe("Subjects", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <Subjects { ...sProps } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a title element', () => {
    const component = shallow(<Subjects { ...sProps } />);
    expect(component.find('div.Subjects').exists()).toBe(true);
    expect(component.find('h2.Subject-fandom-title').exists()).toBe(true);
  });

  it('has an AddSubjectForm component', () => {
    const component = shallow(<Subjects { ...sProps } />);
    expect(component.find(AddSubjectForm).exists()).toBe(true);
  });

  it('has a SubjectList component', () => {
    const component = shallow(<Subjects { ...sProps } />);
    expect(component.find(SubjectList).exists()).toBe(true);
  });
});
