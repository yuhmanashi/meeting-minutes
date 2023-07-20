import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface OptionType {
  inputValue?: string;
  title: string;
}

const filter = createFilterOptions<any>();

export default function GenericAutocomplete({options, label, onChange}: any) {
  const [value, setValue] = useState("");

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) filtered.push(`Add to "${inputValue}"`);

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="generic-autocomplete"
      options={options}
      getOptionLabel={(option) => option}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
    />
  );
}