import React from 'react';
import { shallow } from 'enzyme';

import AddDescriptorForm from './AddDescriptorForm';

const props = {
  addDescriptor: jest.fn(),
  isManaging: () => true,
  isNotManaging: () => false,
};
const component = (
  <AddDescriptorForm addDescriptor={props.addDescriptor} isManaging={props.isNotManaging} />
);
const managingComponent = (
  <AddDescriptorForm addDescriptor={props.addDescriptor} isManaging={props.isManaging} />
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(component, div);
});

it('managing mode renders without crashing', () => {
  const div = document.createElement('div');
  shallow(managingComponent, div);
});
