import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Box, Button, Paper } from '@mantine/core';
import { SeidrApiProvider } from '../../components/SeidrApiProvider';
import { DataGrid } from '../../components/DataGrid';
import { UserMenu } from '../../components/UserMenu';
import { useSeidrAuth } from '../../components/SeidrProvider';

function Permissions() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path='permissions/'>
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function PermissionView() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path='permissionview/'>
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function Roles() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path='roles/'>
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function Users() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path='users/'>
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function ViewsMenus() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path='viewsmenus/'>
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function Frame() {
  const { user, loading, signin, signout } = useSeidrAuth();
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={() => {
            if (user) {
              signout();
            } else {
              signin({ username: 'admin', password: 'admin' });
            }
          }}
          loading={loading}
        >
          {user ? 'Sign out' : 'Sign in'}
        </Button>
        {user ? <UserMenu /> : null}
      </Box>
      <Outlet />
    </div>
  );
}

function Wrapper() {
  return (
    <>
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Frame />}>
            <Route path='/security/permissions' element={<Permissions />} />
            <Route path='/security/permissionviews' element={<PermissionView />} />
            <Route path='/security/roles' element={<Roles />} />
            <Route path='/security/users' element={<Users />} />
            <Route path='/security/viewsmenus' element={<ViewsMenus />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </>
  );
}

// TODO: Use Storybook Addon React Router v6
// https://storybook.js.org/addons/storybook-addon-react-router-v6

const meta= {
  title: 'components/UserMenu',
  component: Wrapper,
};

export default meta;

export const Primary = {};
