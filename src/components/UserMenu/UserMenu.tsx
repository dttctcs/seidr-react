import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeidrAuth } from '../SeidrProvider';

import { Group, Menu, Text, UnstyledButton, createStyles } from '@mantine/core';
import { AppWindow, IdBadge2, Lock, Logout, Users, ChevronDown } from 'tabler-icons-react';

interface UserMenuProps {
  basePath?: string;
  Target?: ReactNode;
  children?: ReactNode;
}

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
  },
}));

export function UserMenu({ basePath = '/security', Target, children }: UserMenuProps) {
  const navigate = useNavigate();
  const { user, signout } = useSeidrAuth();
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const securityRoutes = [
    { path: basePath + '/users', label: 'Users', name: 'UsersApi', Icon: Users },
    { path: basePath + '/roles', label: 'Roles', name: 'RolesApi', Icon: IdBadge2 },
    { path: basePath + '/permissions', label: 'Base Permissions', name: 'PermissionsApi', Icon: Lock },
    { path: basePath + '/permissionviews', label: 'Permission on Views', name: 'PermissionViewApi', Icon: Lock },
    { path: basePath + '/viewsmenus', label: 'Views/Menus', name: 'ViewsMenusApi', Icon: AppWindow },
  ];

  const availableRoutes = securityRoutes.filter((route) => user.permissions.includes(route.name));

  return (
    <Menu
      width={260}
      position="bottom-end"
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        {Target || (
          <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
            <Group sx={{ flexWrap: 'nowrap' }} spacing={7}>
              <Text weight={500} size="sm" sx={{ lineHeight: 1, whiteSpace: 'nowrap' }} mr={3}>
                {`${user.first_name} ${user.last_name}`}
              </Text>
              <ChevronDown size={12} />
            </Group>
          </UnstyledButton>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {availableRoutes.length ? (
          <>
            <Menu.Label>Security</Menu.Label>
            {availableRoutes.map((route, index) => {
              return (
                <Menu.Item key={index} icon={<route.Icon size={16} />} onClick={() => navigate(route.path)}>
                  {route.label}
                </Menu.Item>
              );
            })}

            <Menu.Divider />
          </>
        ) : null}
        {children}
        <Menu.Item icon={<Logout size={14} />} onClick={signout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
