import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Template, Wrapper } from './Wrapper';
import { Select } from '../../components/QuickFilters';

export default {
  title: 'Components/QuickFilters/Select',
  component: Wrapper,
  args: { Component: Select },
} as ComponentMeta<typeof Wrapper>;

export const Default = Template.bind({});
