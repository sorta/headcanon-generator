import React from 'react';
import {
  mount,
  shallow,
} from 'enzyme';

import App from './App';

import AddFandomForm from './AddFandomForm';
import FandomList from './FandomList';
import AddDescriptorForm from './AddDescriptorForm';
import DescriptorList from './DescriptorList';
import Subjects from './Subjects';
import HeadCanon from './HeadCanon';
import Logo from './Logo';

const props = {
  uid: null,
  oid: null,
};

const mApp = mount( <App { ...props } /> );
mApp.setState({
  fandoms: {
    f_test_1: { name: 'Fandom 1', subjects: ['s_test_1', 's_test_2', 's_test_3'] },
    f_test_2: { name: 'Fandom 2', subjects: ['s_test_4', 's_test_5', 's_test_6'] },
    f_test_3: { name: 'Fandom 3', subjects: ['s_test_7', 's_test_8', 's_test_9'] },
  },
  subjects: {
    s_test_1: { name: 'Subject 1', fandomKey: 'f_test_1' },
    s_test_2: { name: 'Subject 2', fandomKey: 'f_test_1' },
    s_test_3: { name: 'Subject 3', fandomKey: 'f_test_1' },
    s_test_4: { name: 'Subject 4', fandomKey: 'f_test_2' },
    s_test_5: { name: 'Subject 5', fandomKey: 'f_test_2' },
    s_test_6: { name: 'Subject 6', fandomKey: 'f_test_2' },
    s_test_7: { name: 'Subject 7', fandomKey: 'f_test_3' },
    s_test_8: { name: 'Subject 8', fandomKey: 'f_test_3' },
    s_test_9: { name: 'Subject 9', fandomKey: 'f_test_3' },
  },
  descriptors: {
    d_test_1: { name: 'Descriptor 1' },
    d_test_2: { name: 'Descriptor 2' },
    d_test_3: { name: 'Descriptor 3' },
  },
  selectedFandomKey: 'f_test_1',
  optionsOpen: true,
  // generated: {}
});
// const eventMock = {
//   preventDefault: jest.fn(),
//   currentTarget: { reset: jest.fn() }
// };

// Tests for App in regular mode
describe("App in managing mode", () => {
  it('renders successfully', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find('div.App-main').exists()).toBe(true);
  });

  it('has an AddFandomForm component', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find(AddFandomForm).exists()).toBe(true);
  });

  it('has an FandomList component', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find(FandomList).exists()).toBe(true);
  });

  it('has an AddDescriptorForm component', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find(AddDescriptorForm).exists()).toBe(true);
  });

  it('has an DescriptorList component', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find(DescriptorList).exists()).toBe(true);
  });

  it('has an Subjects component', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find(Subjects).exists()).toBe(true);
  });

  it('has an HeadCanon component', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find(HeadCanon).exists()).toBe(true);
  });

  it('has an Logo component', () => {
    const component = shallow( <App { ...props } /> );
    expect(component.find(Logo).exists()).toBe(true);
  });

  // Mounted App tests
  it('can generate a headcanon', () => {
    mApp.find('.btn-go').simulate('click');
    const generated = mApp.state('generated');
    expect(generated).toHaveProperty('subject');
    expect(generated).toHaveProperty('descriptor');
  });
});
