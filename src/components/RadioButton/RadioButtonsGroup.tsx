import React, { useState, useEffect, useRef } from 'react';
import Radio from '@mui/material/Radio';
import ReactHtmlParser from 'react-html-parser';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Container, Box, Grid } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

import './RadioButtonsGroup.scss';

export default function RadioButtonsGroup(props: any) {
  let [selection, setSelection] = useState<any>('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: any,
    ind: number
  ) => {
    selection = event.target.value;
    setSelection(selection);
    updateQuestionsArray(item);
  };

  const updateQuestionsArray = (item: any) => {
    setAnswers('init');
    item.selected = true;
  };

  const getWrapperClass = () => {
    const arr = props.options.answerGroups[0].answers;
    let classValue: string = arr.some((item: any) =>
      item.content.includes('img')
    )
      ? 'img-wrapper'
      : '';
    return classValue;
  };

  const setAnswers = (type: string) => {
    props.options.answerGroups[0].answers.map((item: any, ind: number) => {
      if (type === 'fill') {
        if (item.selected === true) {
          setSelection(item.content);
        }
      } else {
        item.selected = false;
      }
    });
  };

  useEffect(() => {
    setAnswers('fill');
  }, [props]);
  return (
    <Container>
      <Box sx={{ bgcolor: 'white' }} className="radio-wrapper">
        <FormControl className={getWrapperClass()}>
          <Grid>{ReactHtmlParser(props.options.content)}</Grid>
          {props.options.answerGroups[0].answers.map(
            (item: any, ind: number) => {
              return (
                <RadioGroup
                  className={props.disabled ? 'is-content-disabled' : ''}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  key={item.id}
                  value={selection}
                  onChange={(event) => handleChange(event, item, ind)}
                >
                  <FormControlLabel
                    control={<Radio />}
                    value={item.content}
                    label={ReactHtmlParser(item.content)}
                  />
                </RadioGroup>
              );
            }
          )}
        </FormControl>
      </Box>
    </Container>
  );
}
