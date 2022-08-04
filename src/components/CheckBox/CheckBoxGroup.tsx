import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ReactHtmlParser from 'react-html-parser';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';

import './CheckBoxGroup.scss';

export default function CheckBoxGroup(props: any) {
  const [selection, setSelection] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, ind: number) => {
    const index = selection.indexOf(event.target.value);
    if (index === -1) {
      setSelection([...selection, event.target.value]);
    } else {
      setSelection(selection.filter((check) => check !== event.target.value));
    }
    updateQuestionsArray(index, ind);
  };

  const updateQuestionsArray = (index: number, ind: number) => {
    props.options.answerGroups[0].answers[ind].selected = index === -1 ? true : false;
  };

  const setAnswers = () => {
    props.options.answerGroups[0].answers.map((item: any, ind: number) => {
      if (item.selected === true) {
        setSelection((selection) => [...selection, item.content]);
      }
    });
  };

  const htmlParserTransform = (node: any) => {
    if (node.type == 'tag' && node.name == 'video') {
      const nodeVal = <VideoPlayer key={1} url={node.children[0].attribs.src} />;
      return nodeVal;
    }
  };

  const getLabel = (item: any) => {
    return ReactHtmlParser(item.content, {
      transform: htmlParserTransform
    });
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

  const getLabelClass = (content: any) => {
    if (content.includes('audio')) {
      return 'audio-label-class';
    }
    if (props.disabled) {
      return 'is-content-disabled';
    }
  };

  useEffect(() => {
    setAnswers();
  }, [props]);
  return (
    <FormControl className={getWrapperClass()}>
      {ReactHtmlParser(props.options.content, {
        transform: htmlParserTransform
      })}
      {props.options.answerGroups[0].answers.map((item: any, indx: number) => {
        return (
          <FormControlLabel
            className={getLabelClass(item.content) + ' chk-opt-item'}
            label={getLabel(item)}
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
