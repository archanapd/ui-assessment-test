import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './SelectDropDown.scss';

export default function SelectDropDown(props: any) {
  useEffect(() => {
    updateAnswer();
  }, [props]);

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    let selectedValue = event.target.value;
    // setAge(event.target.value as string);
    props.values.answers.map((answer: any) => {
      answer.selected = answer.id === selectedValue;
    });
    setAge(selectedValue);
  };

  const updateAnswer = () => {
    let answerSelected = false;
    props.values.answers.map((answer: any) => {
      if (answer.selected) {
        answerSelected = true;
        setAge(answer.id);
      }
    });
    if (!answerSelected) {
      setAge('Your Answer');
    }
  };

  return (
    <div className="select-wrapper">
      <Box sx={{ minWidth: 120 }} className="select-wrapper--box">
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id={props.values.groupId}
            value={age}
            onChange={handleChange}
            IconComponent={KeyboardArrowDownIcon}
            style={{ width: '150px', color: '#98C93C', borderColor: '#98C93C' }}
            className="simple-select-dropdown"
          >
            <MenuItem value="Your Answer">
              <em>Your Answer</em>
            </MenuItem>
            {props.values.answers.map((option: any, index: any) => {
              return (
                <MenuItem value={option.id} key={index} id={option.id}>
                  {option.content}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
