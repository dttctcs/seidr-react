import React, { useEffect } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';

import { Box, Button, Chip, Divider, IconButton, Popover, Stack } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import FormDataGridField from '../FormDataGridField';
import FormFilterField from './FormFilterField';
import FormOperatorField from './FormOperatorField';

const schema = yup.object({
  filters: yup.array().of(
    yup.object({
      col: yup.string().required('Column is required'),
      opr: yup.string().required('Operation is required'),
      value: yup.mixed().required('Value is required'),
    }),
  ),
});

function FilterMenu({ onClose, filters, activeFilters, onFiltersChange, anchorElement }) {
  const profileOpen = Boolean(anchorElement);
  const { handleSubmit, control, setValue, reset, watch } = useForm({
    mode: 'onTouched',
    defaultValues: {
      filters: [],
    },
    resolver: yupResolver(schema),
  });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'filters' });
  const watchFieldArray = watch('filters');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  useEffect(() => {
    if (activeFilters.length) {
      setValue('filters', JSON.parse(JSON.stringify(activeFilters)));
    }
  }, [activeFilters, setValue]);

  const onSubmit = (data) => {
    onFiltersChange(JSON.parse(JSON.stringify(data.filters)));
    onClose();
  };

  return (
    <Popover
      sx={{ color: 'grey.500' }}
      anchorEl={anchorElement}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={profileOpen}
      onClose={onClose}
      PaperProps={{ sx: { p: 2 } }}
      TransitionProps={{
        onExited: () => {
          setValue('filters', JSON.parse(JSON.stringify(activeFilters)));
        },
      }}
    >
      {controlledFields.length ? (
        controlledFields.map((field, index) => {
          return (
            <React.Fragment key={field.id}>
              <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                <Box sx={{ width: '192px' }}>
                  <FormFilterField
                    name={`filters.${index}.col`}
                    control={control}
                    variant="outlined"
                    TextFieldProps={{ placeholder: 'Column' }}
                    items={Object.keys(filters)}
                    onChange={(newValue) => {
                      update(index, { col: newValue, value: '', opr: '' });
                    }}
                    fullWidth
                  />
                </Box>

                <Box sx={{ width: '192px' }}>
                  {field.col ? (
                    <FormOperatorField
                      name={`filters.${index}.opr`}
                      control={control}
                      variant="outlined"
                      TextFieldProps={{ placeholder: 'Operation' }}
                      items={filters[field.col].filters.map((value) => ({
                        label: value.name,
                        value: value.operator,
                      }))}
                      fullWidth
                    />
                  ) : null}
                </Box>
                <Box sx={{ width: '192px' }}>
                  {field.col ? (
                    <FormDataGridField
                      name={`filters.${index}.value`}
                      control={control}
                      schema={filters[field.col].schema}
                    />
                  ) : null}
                </Box>
                <IconButton
                  disableRipple
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Stack>
              {controlledFields.length > 1 && index < controlledFields.length - 1 ? (
                <Divider>
                  <Chip
                    sx={{ color: 'common.white', bgcolor: 'secondary.main', p: 0.5 }}
                    label="AND"
                    color="primary"
                    size="small"
                  />
                </Divider>
              ) : null}
            </React.Fragment>
          );
        })
      ) : (
        <Box
          sx={{
            boxSizing: 'content-box',
            display: 'flex',
            alignItems: 'center',
            width: '634px',
            minHeight: '34px',
            p: 2,
            verticalAlign: 'middle',

            color: 'grey.500',
            fontStyle: 'italic',
          }}
        >
          No filters selected...
        </Box>
      )}
      <Divider sx={{ bgcolor: 'divider', my: 2, mx: -2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
        <Button
          sx={{ mr: 4 }}
          startIcon={<Add />}
          onClick={() => {
            append({ col: '', opr: '', value: '' });
          }}
        >
          Add Filter
        </Button>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Apply
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
}

export default FilterMenu;
