import {DataGrid} from '../../components/DataGrid';

const meta = {
  title: 'components/DataGrid',
  component: DataGrid
};
export default meta;

export const Primary = {
  render: () => <><DataGrid settings={{rtl: false}}/></>,
};