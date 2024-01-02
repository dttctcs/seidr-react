import { useEffect, useState } from 'react';

import { Combobox, useCombobox, PillsInput, Pill } from '@mantine/core';

export function FormFilterIn({ form, name, ...props }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });
  
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState('');

  const handleValueSelect = (val) =>{
    if(search!==''){
      if (!value.includes(search)) setValue((current) => [...current, search]);
      setSearch('')
    }
  }
  
  const handleValueRemove = (val) =>
    setValue((current) => current.filter((v) => v !== val));
    
    const values = value.map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
  ));
  
  useEffect(() => {
    if (form.getInputProps(name).value) {
      try {
        const currentItems = JSON.parse(String(form.getInputProps(name).value));
        setValue([...currentItems]);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      form.getInputProps(name).onChange([]);
    }
  }, []);

  useEffect(() => {
    form.getInputProps(name).onChange(JSON.stringify(value));
  }, [value]);
  
  return (
    <Combobox 
      store={combobox} 
      onOptionSubmit={handleValueSelect}
      >
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
