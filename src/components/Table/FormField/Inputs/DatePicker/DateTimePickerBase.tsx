import React from 'react';
import { CloseButton, Input, Popover } from '@mantine/core';

export function DateTimePickerBase({
  opened,
  setOpened,

  required,
  label,
  error,
  description,
  placeholder,

  children,
  inputLabel,

  clearable = true,
  onClear,

  onChange,
}) {
  return (
    <Input.Wrapper sx={{ cursor: 'pointer' }} required={required} label={label} error={error} description={description}>
      <Popover opened={opened} onClose={() => setOpened(false)} position="bottom-start">
        <Popover.Target>
          <Input
            onClick={() => setOpened(true)}
            rightSection={clearable ? <CloseButton variant="transparent" onClick={onClear} /> : null}
            placeholder={placeholder}
            value={inputLabel}
            required={required}
            invalid={!!error}
            readOnly={true}
            onChange={onChange}
            autoComplete="off"
          />
        </Popover.Target>

        <Popover.Dropdown>{children}</Popover.Dropdown>
      </Popover>
    </Input.Wrapper>
  );
}
