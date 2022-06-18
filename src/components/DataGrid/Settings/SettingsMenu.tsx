import React, { useState } from "react";

import { Box, Divider, Paper, Popover, Stack, Switch } from "@mui/material";

function SettingsMenu({ anchorElement, onClose, onSettingsChange, currentSettings }) {
  const profileOpen = Boolean(anchorElement);

  const [settings, setSettings] = useState(currentSettings);

  return (
    <Popover
      sx={{ color: "grey.500" }}
      anchorEl={anchorElement}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={profileOpen}
      onClose={onClose}
      PaperProps={{ sx: { p: 3, width: 240 } }}
    >
      <Box>Settings</Box>
      <Divider sx={{ bgcolor: "divider", my: 2 }} />

      <Stack spacing={2}>
        <Paper>
          <Box
            sx={{
              display: "flex",
              p: 2.5,

              typography: "h5",
              fontSize: "1rem",
              fontWeight: "600",

              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderColor: (theme) => theme.palette.primary.main + 55,
            }}
          >
            <Box>Theme</Box>
          </Box>
          <Stack spacing={2} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ whiteSpace: "nowrap" }}>Striped</Box>
              <Switch
                size="small"
                checked={settings.striped}
                onChange={(event) => {
                  setSettings({ ...settings, striped: event.target.checked });
                  onSettingsChange({ ...settings, striped: event.target.checked });
                }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ whiteSpace: "nowrap" }}>Cell Right Border</Box>
              <Switch
                size="small"
                checked={settings.cellRightBorder}
                onChange={(event) => {
                  setSettings({ ...settings, cellRightBorder: event.target.checked });
                  onSettingsChange({ ...settings, cellRightBorder: event.target.checked });
                }}
              />
            </Box>
          </Stack>
        </Paper>

        <Paper>
          <Box
            sx={{
              display: "flex",
              p: 2.5,

              typography: "h5",
              fontSize: "1rem",
              fontWeight: "600",

              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderColor: (theme) => theme.palette.primary.main + 55,
            }}
          >
            <Box>Layout</Box>
          </Box>
          <Stack spacing={2} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>Dense</Box>
              <Switch
                size="small"
                checked={settings.dense}
                onChange={(event) => {
                  setSettings({ ...settings, dense: event.target.checked });
                  onSettingsChange({ ...settings, dense: event.target.checked });
                }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>RTL</Box>
              <Switch
                size="small"
                checked={settings.rtl}
                onChange={(event) => {
                  setSettings({ ...settings, rtl: event.target.checked });
                  onSettingsChange({ ...settings, rtl: event.target.checked });
                }}
              />
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Popover>
  );
}

export default SettingsMenu;
