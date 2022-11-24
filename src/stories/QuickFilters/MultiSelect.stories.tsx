import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Template, Wrapper } from './Wrapper';
import { MultiSelect } from '../../components/QuickFilters';

export default {
  title: 'Components/QuickFilters/MultiSelect',
  component: Wrapper,
  args: { Component: MultiSelect },
} as ComponentMeta<typeof Wrapper>;

export const Default = Template.bind({});
