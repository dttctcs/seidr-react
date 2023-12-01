import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeidrAuth } from '../SeidrProvider';
import classes from './user.module.css';
import { Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { IconAppWindow, IconIdBadge2, IconLock, IconLogout, IconUsers, IconChevronDown } from '@tabler/icons-react';


export function UserMenu({ basePath = '/security', Target, children }) {
  const navigate = useNavigate();
  const { user, signout } = useSeidrAuth();
  const [opened, setOpened] = useState(false);

  const securityRoutes = [
    { path: basePath + '/users', label: 'Users', name: 'UsersApi', Icon: IconUsers },
    { path: basePath + '/roles', label: 'Roles', name: 'RolesApi', Icon: IconIdBadge2 },
    { path: basePath + '/permissions', label: 'Base Permissions', name: 'PermissionsApi', Icon: IconLock },
    { path: basePath + '/permissionviews', label: 'Permission on Views', name: 'PermissionViewApi', Icon: IconLock },
    { path: basePath + '/viewsmenus', label: 'Views/Menus', name: 'ViewsMenusApi', Icon: IconAppWindow },
  ];

  const availableRoutes = securityRoutes.filter((route) => user.permissions.includes(route.name));

  return (
    <Menu
      width={260}
      position='bottom-end'
      transition='pop-top-right'
      withinPortal
      opened={opened}
      onClose={() => setOpened(false)}
      onOpen={() => setOpened(true)}
    >
      <Menu.Target>
        {/* Fix me, I only work with forwardRefs */}
        {Target || (
          <UnstyledButton>
            <Group style={{ flexWrap: 'nowrap' }} spacing={7}>
              <Text weight={500} size='sm' style={{ lineHeight: 1, whiteSpace: 'nowrap' }} mr={3}>
                {`${user.first_name} ${user.last_name}`}
              </Text>
              <IconChevronDown size={12} />
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
                <Menu.Item p={12} key={index} leftSection={<route.Icon className={classes.iconSmall} />} onClick={() => navigate(route.path)}>
                  {route.label}
                </Menu.Item>
              );
            })}

            <Menu.Divider />
          </>
        ) : null}
        {children}
        <Menu.Item leftSection={<IconLogout p={12} className={classes.iconSmall}  />} onClick={signout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
