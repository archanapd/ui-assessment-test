import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import SelectDropDown from 'components/SelectDropDown/SelectDropDown';

import './FillInTheSelect.scss';

export default function FillInTheSelect(props: any) {
  const formatLabel = (question: any) => {
    let queryString: any = question.content;
    question.answerGroupRef.forEach((id: any, i: number) => {
      queryString = queryString.replace('[' + id + ']', addSelect(id, i));
    });
    return queryString;
  };

  const addSelect = (key: any, i: number) => {
    return '<button key=' + key + ' id=' + i + '>Take the shot!</button>';
  };

  useEffect(() => {
    updateAnswers(props.options);
  }, [props]);

  const updateAnswers = (question: any) => {
    question.answerGroups.map((item: any) => {
      item.answers.map((item: any) => {
        if (item.selected) {
          (document.getElementById(item.groupId) as HTMLInputElement).value = item.id;
        }
      });
    });
  };

  const htmlParserTransform = (node: any) => {
    if (node.type == 'tag' && node.name == 'button') {
      // a tag named a
      let id = node.attribs.id;
      let options = props.options.answerGroups[id].answers;
      let newArray = options.slice();
      // newArray.unshift({
      //   id: null,
      //   content: 'Your answer',
      //   groupId: props.options.answerGroups[id].groupId,
      //   selected: false
      // });

      let params = {
        groupId: props.options.answerGroups[id].groupId,
        answers: newArray
      };
      return <SelectDropDown key={props.options.ref} values={params} id={props.options.ref} />;
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={props.disabled ? 'is-content-disabled' : ''}>
        {ReactHtmlParser(formatLabel(props.options), {
          transform: htmlParserTransform
        })}
      </Container>
    </React.Fragment>
  );
}
