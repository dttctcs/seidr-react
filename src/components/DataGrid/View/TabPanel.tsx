import React from "react";

import { Box, Paper } from "@mui/material";

function TabPanel({ children, value, index }) {
  return (
    value === index && (
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: 0, overflow: "auto" }}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.primary.main + 55,

            "&:hover": {
              boxShadow: (theme) => theme.shadows[3],
            },
            ...sx,
          }}
          role="tabpanel"
          hidden={value !== index}
          elevation={0}
        >
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>{children}</Box>
        </Paper>
      </Box>
    )
  );
}

export default TabPanel;
