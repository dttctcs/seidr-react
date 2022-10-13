import React from 'react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Box, Button, Paper } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSeidrAuth, SeidrApiProvider, DataGrid, UserMenu } from '..';

function Permissions() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path="permissions/">
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function PermissionView() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path="permissionview/">
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function Roles() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path="roles/">
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function Users() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path="users/">
        <DataGrid />
      </SeidrApiProvider>
    </Paper>
  );
}

function ViewsMenus() {
  return (
    <Paper sx={{ flex: 1 }}>
      <SeidrApiProvider path="viewsmenus/">
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
          <Route path="/" element={<Frame />}>
            <Route path="/security/permissions" element={<Permissions />} />
            <Route path="/security/permissionviews" element={<PermissionView />} />
            <Route path="/security/roles" element={<Roles />} />
            <Route path="/security/users" element={<Users />} />
            <Route path="/security/viewsmenus" element={<ViewsMenus />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </>
  );
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/UserMenu',
  component: Wrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Wrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Wrapper> = () => <Wrapper />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
