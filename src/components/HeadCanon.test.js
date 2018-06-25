import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import HeadCanon from './HeadCanon';

const sProps = {
  subject: {},
  descriptor: {},
  fandoms: { f_test_1: { name: 'Test Fandom 1' } },
};

// Tests for no subject or descriptor
describe("HeadCanon with no subject or descriptor", () => {

  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <HeadCanon { ...sProps } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('is null when no fandom is selected', () => {
    const component = shallow(<HeadCanon { ...sProps } />);
    expect(component.getElement()).toBe(null);
  });
});

const props = {
  ...sProps,
  descriptor: { name: 'Descriptor 1' },
  subject: { name: 'Subject 1', fandomKey: 'f_test_1' },
};

// Tests with subject and descriptor
describe("HeadCanon", () => {
  it('renders and matches our snapshot', () => {
    const snapshot = renderer.create(
      <HeadCanon { ...props } />
    );
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a subject section', () => {
    const component = shallow(<HeadCanon { ...props } />);
    expect(component.find('.HeadCanon-Subject').exists()).toBe(true);
  });

  it('has a verb section', () => {
    const component = shallow(<HeadCanon { ...props } />);
    expect(component.find('.HeadCanon-Verb').exists()).toBe(true);
  });

  it('has a descriptor section', () => {
    const component = shallow(<HeadCanon { ...props } />);
    expect(component.find('.HeadCanon-Descriptor').exists()).toBe(true);
  });
});
