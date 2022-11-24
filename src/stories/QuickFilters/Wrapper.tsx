import { SeidrApiProvider } from '../../components/SeidrApiProvider';
import { DataGrid } from '../../components/DataGrid';
import React from 'react';
import { ComponentStory } from '@storybook/react';

export function Wrapper({ Component, ...args }) {
  return (
    <SeidrApiProvider path='/assets'>
      <Component name='asset_name' {...args} />
      <DataGrid />
    </SeidrApiProvider>
  );
}

export const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper  {...args} Component={args.Component} />;
