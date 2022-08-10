import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import ReactHtmlParser from 'react-html-parser';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Container, Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

import './RadioButtonsGroup.scss';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';

export default function RadioButtonsGroup(props: any) {
  let [selection, setSelection] = useState<any>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, item: any, ind: number) => {
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
    let classValue: string = arr.some(
      (item: any) =>
        item.content.includes('img') ||
        item.content.includes('video') ||
        item.content.includes('audio')
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

  const htmlParserTransform = (node: any) => {
    if (node.type == 'tag' && node.name == 'video') {
      const randomKey = Math.floor(Math.random() * 1000 + 1);
      const nodeVal = <VideoPlayer key={randomKey} url={node.children[0].attribs.src} />;
      return nodeVal;
    }
  };

  const getLabel = (item: any) => {
    return ReactHtmlParser(item.content, {
      transform: htmlParserTransform
    });
  };

  const getLabelClass = (content: any) => {
    if (content.includes('audio')) {
      return 'audio-label-class';
    }
    if (props.disabled) {
      return 'is-content-disabled';
    }
  };

  useEffect(() => {
    setAnswers('fill');
  }, [props]);
  return (
    <Container>
      <Box sx={{ bgcolor: 'white' }} className="radio-wrapper">
        <FormControl className={getWrapperClass()}>
          {ReactHtmlParser(props.options.content, {
            transform: htmlParserTransform
          })}
          {props.options.answerGroups[0].answers.map((item: any, ind: number) => {
            return (
              <RadioGroup
                className={getLabelClass(item.content)}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                key={item.id}
                value={selection}
                onChange={(event) => handleChange(event, item, ind)}
              >
                <FormControlLabel control={<Radio />} value={item.content} label={getLabel(item)} />
              </RadioGroup>
            );
          })}
        </FormControl>
      </Box>
    </Container>
  );
}
