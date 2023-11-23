// import { useState } from 'react';

// import { ActionIcon, Tooltip, Menu, Switch } from '@mantine/core';
// import { IconSettings, IconBorderRight, IconResize, IconContrast2 } from '@tabler/icons-react';
// import classes from '../../DataGrid.module.css'

// export function Settings({ onSettingsChange, settings }) {
//   const [opened, setOpened] = useState(false);

//   return (
//     <Menu
//       position='bottom-start'
      
//       onOpen={() => setOpened(true)}
//       onClose={() => setOpened(false)}
//       opened={opened}
//       closeOnItemClick={false}
      
//     >
//       <Menu.Target>
//         <Tooltip opened={opened ? false : undefined} label='Settings'>
//           <ActionIcon className={classes.icon}>
//             <IconSettings />
//           </ActionIcon>
//         </Tooltip>
//       </Menu.Target>
//       <Menu.Dropdown>
//         <Menu.Label>Theme</Menu.Label>
//         <Menu.Item
//           icon={<IconContrast2 size={16} />}
//           rightSection={
//             <Switch
//               styles={{ trackLabel: { minWidth: '12px' } }}
//               size='xs'
//               checked={settings.striped}
//               onChange={(event) => onSettingsChange({ ...settings, striped: !settings.striped })}
//             />
//           }
//         >
//           Striped
//         </Menu.Item>
//         <Menu.Item
//           icon={<IconBorderRight size={16} />}
//           rightSection={
//             <Switch
//               styles={{ trackLabel: { minWidth: '12px' } }}
//               size='xs'
//               checked={settings.rightBorder}
//               onChange={(event) => onSettingsChange({ ...settings, rightBorder: !settings.rightBorder })}
//             />
//           }
//         >
//           Right Border
//         </Menu.Item>
//         <Menu.Label>Layout</Menu.Label>
//         <Menu.Item
//           icon={<IconResize size={16} />}
//           rightSection={
//             <Switch
//               styles={{ trackLabel: { minWidth: '12px' } }}
//               size='xs'
//               checked={settings.dense}
//               onChange={(event) => onSettingsChange({ ...settings, dense: !settings.dense })}
//             />
//           }
//         >
//           Dense
//         </Menu.Item>
//         <Menu.Item
//           icon={<IconBorderRight size={16} />}
//           rightSection={
//             <Switch
//               styles={{ trackLabel: { minWidth: '12px' } }}
//               size='xs'
//               checked={settings.rtl}
//               onChange={(event) => onSettingsChange({ ...settings, rtl: !settings.rtl })}
//             />
//           }
//         >
//           RTL
//         </Menu.Item>
//       </Menu.Dropdown>
//     </Menu>
//   );
// }
