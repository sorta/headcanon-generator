import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FandomList from './FandomList';
import FandomListItem from './FandomListItem';

const props = {
  fandoms: {
    f_test_1: { name: 'Test 1' },
    f_test_2: { name: 'Test 2' },
    f_test_3: { name: 'Test 3' },
  },
  fandomAvailability: {},
  updateFandom: jest.fn(),
  deleteFandom: jest.fn(),
  setAvailability: jest.fn(),
  isManaging: () => false,
  selectFandom: jest.fn(),
  selectedFandomKey: '',
};

// Tests for regular mode
describe("FandomList", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <FandomList { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a FandomList ul element', () => {
    const component = shallow(<FandomList { ...props } />);
    expect(component.find('ul.FandomList.options-list').exists()).toBe(true);
  });

  it('has right number of FandomListItems', () => {
    const component = shallow(<FandomList { ...props } />);
    expect(component.find(FandomListItem)).toHaveLength(Object.keys(props.fandoms).length);
  });
});
