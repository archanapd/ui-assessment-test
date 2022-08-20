import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import InputTextField from 'components/InputTextField/InputTextField';

import './FillInTheBlanks.scss';

export default function FillInTheBlanks(this: any, props: any) {
  const formatLabel = (question: any) => {
    let queryString: any = question.content;
    question.answerGroupRef.forEach((id: any, i: number) => {
      queryString = queryString.replace('[' + id + ']', addInput(id + question.ref, i));
    });
    return queryString;
  };
  const addInput = (key: any, i: number) => {
    return '<button key=' + key + ' id=' + i + '>Take the shot!</button>';
  };

  const htmlParserTransform = (node: any) => {
    if (node.type == 'tag' && node.name == 'button') {
      // a tag named a
      let id = node.attribs.id;
      let key = node.attribs.key;

      return (
        <InputTextField
          key={props.options.answerGroupRef[id]}
          options={props.options}
          index={id}
          itemId={key}
          content="Type the answers"
        />
      );
    }
  };

  useEffect(() => {
    const question = props.options;
    question.answerGroupRef.map((answerGroup: any) => {
      if (question.answerGroups.length < question.answerGroupRef.length) {
        question.answerGroups.push({
          groupId: answerGroup,
          answers: [
            {
              content: '',
              groupId: answerGroup
            }
          ]
        });
      }
    });
    updateAnswers(props.options);
  }, [props]);

  const updateAnswers = (question: any) => {
    question.answerGroups.map((item: any, i: number) => {
      const value =
        item.answers[0].content.content && item.answers[0].content.content.length >= 1
          ? item.answers[0].content.content
          : item.answers[0].content;
      const element = document.getElementById(item.groupId + question.ref) as HTMLInputElement;
      console.log(value);
      element.value = value;
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="lg"
        className={props.disabled ? 'is-content-disabled fillbox' : 'fillbox'}
      >
        {ReactHtmlParser(formatLabel(props.options), {
          transform: htmlParserTransform
        })}
      </Container>
    </React.Fragment>
  );
}
