import { ComponentStory, ComponentMeta } from '@storybook/react';
import { generateBorderStyles } from '../components/SeidrProvider/utils';

import { DataGrid } from '../components/DataGrid';
import { DataGridStyles } from '../components/DataGrid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DataGrid',
  component: DataGrid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {},
} as ComponentMeta<typeof DataGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DataGrid> = (args) => {
  console.log(args);
  return <DataGrid {...args} />;
};

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
  AddComponent: {
    table: {
      disable: true,
    },
  },
  EditComponent: {
    table: {
      disable: true,
    },
  },
  ViewComponent: {
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
  // fitToParent is the property we want to remove from the controls
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

export const SelectableRow = Template.bind({});
SelectableRow.decorators = [(Story) => <Story />];
SelectableRow.args = {
  path: window.location.origin + '/cars/',
  onSelect: (event, entry) => console.log(event, entry),
};
SelectableRow.argTypes = {
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
