import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Template, Wrapper } from './Wrapper';
import { CheckboxGroup } from '../../components/QuickFilters';

export default {
  title: 'Components/QuickFilters/CheckboxGroup',
  component: Wrapper,
  args: { Component: CheckboxGroup },
} as ComponentMeta<typeof Wrapper>;

export const Horizontal = Template.bind({});
export const Vertical = Template.bind({});
Vertical.args = { orientation: 'vertical' };
