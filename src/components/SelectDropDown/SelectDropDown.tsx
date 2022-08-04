import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './SelectDropDown.scss';

export default function SelectDropDown(props: any) {
  const [age, setAge] = React.useState('');

  console.log(props.values.answers);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div className="select-wrapper">
    <Box sx={{ minWidth: 120 }} className="select-wrapper--box">
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Your answer</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Your answer"
          onChange={handleChange}
          IconComponent = {KeyboardArrowDownIcon}
          style={{ width: '150px', color: '#98C93C', borderColor: '#98C93C'}}
          className="simple-select-dropdown"
        >
        {props.values.answers.map((option: any, index: any) => {
           return <MenuItem value={option.content} key={index} id={option.id}>{option.content}</MenuItem>
        })}
        </Select>
      </FormControl>
    </Box>
    </div>
  );
}
