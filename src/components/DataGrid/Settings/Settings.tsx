import React, { useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import SettingsMenu from './SettingsMenu';
import { Settings as SettingsIcon } from '@mui/icons-material';

function Settings({ onSettingsChange, settings }) {
  const [anchorElement, setAnchorElement] = useState(null);

  const onClickSettings = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <Tooltip title="Settings">
        <IconButton onClick={onClickSettings}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <SettingsMenu
        anchorElement={anchorElement}
        onClose={handleClose}
        onSettingsChange={onSettingsChange}
        currentSettings={settings}
      />
    </>
  );
}

export default Settings;
