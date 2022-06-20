import { ComponentStory, ComponentMeta } from '@storybook/react';
import { generateBorderStyles } from '../components/SeidrProvider/utils';

import { DataGrid } from '../components/DataGrid';
import { DataGridStyles } from '../components/DataGrid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DataGrid',
  component: DataGrid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DataGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DataGrid> = (args) => <DataGrid {...args} />;

const defaultArgTypes = {
  queryParams: {
    table: {
      disable: true,
    },
  },
  rowsPerPageProps: {
    table: {
      disable: true,
    },
  },
  relation: {
    table: {
      disable: true,
    },
  },
  AddEntryComponent: {
    table: {
      disable: true,
    },
  },
  EditEntryComponent: {
    table: {
      disable: true,
    },
  },
  ViewEntryComponent: {
    table: {
      disable: true,
    },
  },
  onError: {
    table: {
      disable: true,
    },
  },
  onSelectEntry: {
    table: {
      disable: true,
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  path: window.location.origin + '/cars/',
};

Default.argTypes = {
  // foo is the property we want to remove from the UI
  fitToParent: {
    table: {
      disable: true,
    },
  },
};

export const FitToParent = Template.bind({});
FitToParent.decorators = [
  (Story) => (
    <div style={{ height: '300px', padding: '40px', margin: '3em' }}>
      <Story />
    </div>
  ),
];
FitToParent.args = {
  path: window.location.origin + '/cars/',
};
FitToParent.argTypes = {
  ...defaultArgTypes,
};

export const StylesAPI = Template.bind({});
StylesAPI.decorators = [
  (Story, ctx) => {
    return (
      <div style={{ height: '300px', padding: '40px', margin: '3em' }}>
        <Story />
      </div>
    );
  },
];
StylesAPI.args = {
  path: window.location.origin + '/cars/',
  styles: generateBorderStyles(DataGridStyles),
};
StylesAPI.argTypes = {
  ...defaultArgTypes,
};
