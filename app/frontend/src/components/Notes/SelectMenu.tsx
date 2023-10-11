import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const colors = [
  '#fbfbde', // light yellow
  '#faedd7', // light orange
  '#f5d6dc', // light red
  '#fbe3e6', //light pink
  '#ebd6e7', // light pink
  '#ddd9e6', // light purple
  '#d0ecea', // light green
  '#d6f8ff', // light blue
]

export default function SelectMenu({ name, options, defaultValue, onChange }){
  const [option, setOption] = React.useState(defaultValue);

  const handleChange = (e) => {
    setOption(e.target.value);
    onChange(e.target.value);
  };

  function createPaletteOptions(){
    return (
      colors.map((color, i) => 
        <Typography key={i} textAlign='center' sx={{ backgroundColor: color, border: 1, borderColor: 'lightgrey', height: 25, width: 1 }}>Sample Text</Typography>
      )
    )
  }

  return (
    <Box sx={{ width: 1, my: 1 }}>
      {/* {createPaletteOptions()} */}
      <FormControl fullWidth>
        <InputLabel>{name}</InputLabel>
        <Select
          value={option}
          label={name}
          onChange={handleChange}
          required
          sx={{ backgroundColor: colors[option] }}
        >
          {options.map((option, i) => {
            return (
              <MenuItem key={option} value={i} sx={{ backgroundColor: colors[option], border: 1, borderColor: 'lightgrey', height: 25, width: 1 }}>Sample Text</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}