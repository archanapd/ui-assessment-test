import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import './CheckBoxGroup.scss';
import ReactHtmlParser from 'react-html-parser';

export default function CheckBoxGroup(props: any) {
  const [selection, setSelection] = useState<string[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    ind: number
  ) => {
    const index = selection.indexOf(event.target.value);
    if (index === -1) {
      setSelection([...selection, event.target.value]);
    } else {
      setSelection(selection.filter((check) => check !== event.target.value));
    }
    updateQuestionsArray(index, ind);
  };

  const updateQuestionsArray = (index: number, ind: number) => {
    props.options.answerGroups[0].answers[ind].selected =
      index === -1 ? true : false;
  };

  const setAnswers = () => {
    props.options.answerGroups[0].answers.map((item: any, ind: number) => {
      if (item.selected === true) {
        setSelection((selection) => [...selection, item.content]);
      }
    });
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

  useEffect(() => {
    setAnswers();
  }, [props]);
  return (
    <FormControl className={getWrapperClass()}>
      <Grid>{ReactHtmlParser(props.options.content)}</Grid>
      {props.options.answerGroups[0].answers.map((item: any, indx: number) => {
        return (
          <FormControlLabel
            className={props.disabled ? 'is-content-disabled' : ''}
            label={ReactHtmlParser(item.content)}
            value={item.content}
            control={
              <Checkbox
                onChange={(event) => handleChange(event, indx)}
                checked={selection.includes(item.content)}
              />
            }
            key={item.id}
          />
        );
      })}
    </FormControl>
  );
}
