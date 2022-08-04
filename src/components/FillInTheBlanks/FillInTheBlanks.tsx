import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';

import './FillInTheBlanks.scss';

export default function FillInTheBlanks(this: any, props: any) {
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
    question.answerGroups.map((item: any) => {
      const element = document.getElementById(item.groupId) as HTMLInputElement;
      element.value = item.answers[0].content;
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={props.disabled ? 'is-content-disabled' : ''}>
        {ReactHtmlParser(props.options.content)}
      </Container>
    </React.Fragment>
  );
}
