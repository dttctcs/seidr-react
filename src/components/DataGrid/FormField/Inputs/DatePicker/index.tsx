import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';

import { DateTimePickerBase } from './DateTimePickerBase';
import { Anchor, Button, Group, useMantineTheme } from '@mantine/core';
import { Calendar, TimeInput } from '@mantine/dates';
import { upperFirst } from '@mantine/hooks';

import { IconClock } from '@tabler/icons-react';

interface DateTimePickerProps {
  value: any;
  onChange: any;
  defaultValue: any;
  classNames: string[];
  styles: any;
  shadow: string;
  locale: string;
  inputFormat: string;
  transitionDuration: number;
  // transitionTimingFunction,
  // nextMonthLabel,
  // previousMonthLabel,
  // closeCalendarOnChange = false,
  // labelFormat = 'MMMM YYYY',
  // dayClassName,
  // dayStyle,
  // disableOutsideEvents,
  // minDate,
  // maxDate,
  // initialMonth,
  // initiallyOpened = false,
  // name = 'date',
  // size = 'sm',
  // dropdownType = 'popover',
  // clearable = true,
  // disabled = false,
  // clearButtonLabel,
  // fixOnBlur = true,
  // withinPortal = true,
  // dateParser,
  // firstDayOfWeek = 'monday',
  // onFocus,
  // onBlur,
  // amountOfMonths,
  // allowLevelChange,
  // initialLevel,
  // ...others
}

export function DateTimePicker({
                                 value,
                                 onChange,
                                 inputFormat,

                                 closeCalendarOnChange = false,
                                 labelFormat = 'MMMM YYYY',

                                 name = 'date',
                                 clearable = true,
                                 disabled = false,

                                 ...others
                               }) {
  const theme = useMantineTheme();
  const locale = theme.datesLocale;
  const dateFormat = inputFormat || theme.other.dateTimeFormat;

  const [opened, setOpened] = useState(false);
  const inputRef = useRef();
  const [_value, setValue] = useState(value);

  const [inputState, setInputState] = useState(
    _value instanceof Date ? upperFirst(dayjs(_value).locale(locale).format(dateFormat)) : '',
  );

  const handleValueChange = (date) => {
    if (_value) {
      date.setHours(_value.getHours());
      date.setMinutes(_value.getMinutes());
    } else {
      const now = new Date(Date.now());
      date.setHours(now.getHours());
      date.setMinutes(now.getMinutes());
    }
    setValue(date);
    closeCalendarOnChange && setInputState(upperFirst(dayjs(date).locale(locale).format(dateFormat)));
    closeCalendarOnChange && setOpened(false);
  };

  const handleClear = () => {
    setValue(null);
    setInputState('');

    onChange(null);
  };

  const parseDate = (date) => dayjs(date, dateFormat, locale).toDate();

  const handleChange = (e) => {
    setOpened(true);

    const date = parseDate(e.target.value);
    if (dayjs(date).isValid()) {
      setValue(date);
      closeCalendarOnChange && setInputState(e.target.value);
    } else {
      closeCalendarOnChange && setInputState(e.target.value);
    }
  };

  const handleTimeChange = (date) => {
    setValue(date);
    closeCalendarOnChange && setInputState(upperFirst(dayjs(date).locale(locale).format(dateFormat)));
    closeCalendarOnChange && setOpened(false);
  };

  const handleNow = () => {
    const now = new Date(Date.now());
    setValue(now);
    setInputState(upperFirst(dayjs(now).locale(locale).format(dateFormat)));
    setOpened(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
    onChange(now);
  };

  const handleSubmit = () => {
    setInputState(upperFirst(dayjs(_value).locale(locale).format(dateFormat)));
    setOpened(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
    onChange(_value);
  };

  return (
    <DateTimePickerBase
      opened={opened}
      setOpened={setOpened}
      onChange={handleChange}
      inputLabel={inputState}
      clearable={clearable && !!_value && !disabled}
      onClear={handleClear}
      {...others}
    >
      <Calendar
        locale={locale}
        initialMonth={_value instanceof Date ? _value : new Date()}
        value={_value instanceof Date ? _value : dayjs(_value).toDate()}
        onChange={handleValueChange}
        labelFormat={labelFormat}
        preventFocus={false}
        mb='sm'
      />

      <Group align='center'>
        <Anchor ml='xs' component='button' color='blue' onClick={handleNow}>
          Now
        </Anchor>
        <TimeInput
          sx={{ flexGrow: 1 }}
          icon={<IconClock />}
          styles={{ controls: { justifyContent: 'center', marginLeft: -20 } }}
          disabled={!_value}
          value={_value}
          onChange={handleTimeChange}
        />
        {!closeCalendarOnChange && (
          <Button mr='xs' disabled={!_value} onClick={handleSubmit}>
            OK
          </Button>
        )}
      </Group>
    </DateTimePickerBase>
  );
}
