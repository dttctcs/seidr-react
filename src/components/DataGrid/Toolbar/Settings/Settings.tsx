import React, { useState } from 'react';

import { ActionIcon, Tooltip, Menu, Switch } from '@mantine/core';
import { Settings as SettingsIcon, BorderRight, Resize, TextDirectionRtl, Contrast2 } from 'tabler-icons-react';
import SettingsMenu from './SettingsMenu';

export function Settings({ onSettingsChange, settings }) {
  const [tooltip, setTooltip] = useState(null);

  return (
    <Menu
      control={
        <Tooltip opened={tooltip ? null : tooltip} label="Settings">
          <ActionIcon>
            <SettingsIcon />
          </ActionIcon>
        </Tooltip>
      }
      onOpen={() => setTooltip(false)}
      onClose={() => setTooltip(null)}
      closeOnItemClick={false}
    >
      <Menu.Label>Theme</Menu.Label>
      <Menu.Item
        icon={<Contrast2 size={16} />}
        rightSection={
          <Switch
            size="xs"
            checked={settings.striped}
            onChange={(event) => onSettingsChange({ ...settings, striped: !settings.striped })}
          />
        }
      >
        Striped
      </Menu.Item>
      <Menu.Item
        // color={map === 'sattelite' ? 'cyan' : null}
        icon={<BorderRight size={16} />}
        rightSection={
          <Switch
            size="xs"
            checked={settings.rightBorder}
            onChange={(event) => onSettingsChange({ ...settings, rightBorder: !settings.rightBorder })}
          />
        }
      >
        Right Border
      </Menu.Item>
      <Menu.Label>Layout</Menu.Label>
      <Menu.Item
        // color={map === 'topography' ? 'cyan' : null}
        icon={<Resize size={16} />}
        rightSection={
          <Switch
            size="xs"
            checked={settings.dense}
            onChange={(event) => onSettingsChange({ ...settings, dense: !settings.dense })}
          />
        }
      >
        Dense
      </Menu.Item>
      <Menu.Item
        // color={map === 'topography' ? 'cyan' : null}
        icon={<BorderRight size={16} />}
        rightSection={
          <Switch
            size="xs"
            checked={settings.rtl}
            onChange={(event) => onSettingsChange({ ...settings, rtl: !settings.rtl })}
          />
        }
      >
        RTL
      </Menu.Item>
    </Menu>
  );
}
