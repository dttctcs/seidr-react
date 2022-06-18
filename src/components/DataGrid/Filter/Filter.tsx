import React, { useState } from "react";

import { Badge, IconButton, Tooltip } from "@mui/material";
import FilterMenu from "./FilterMenu";
import { FilterList as FilterListIcon } from "@mui/icons-material";

function Filter({ filters, activeFilters, onFiltersChange }) {
  const [anchorElement, setAnchorElement] = useState(null);

  const onClickFilter = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <Tooltip title="Filter">
        <IconButton onClick={onClickFilter}>
          <Badge badgeContent={activeFilters.length} color={"secondary"}>
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <FilterMenu
        anchorElement={anchorElement}
        filters={filters}
        activeFilters={activeFilters}
        onFiltersChange={onFiltersChange}
        onClose={handleClose}
      />
    </>
  );
}

export default Filter;
