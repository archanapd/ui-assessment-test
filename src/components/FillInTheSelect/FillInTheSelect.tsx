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

  const htmlParserTransform = (node: any) => {
    if (node.type == 'tag' && node.name == 'button') {
      // a tag named a
      let id = node.attribs.id;
      let options = props.options.answerGroups[id].answers;
      let newArray = options.slice();
      let params = {
        groupId: props.options.answerGroups[id].groupId,
        answers: newArray
      };
      return <SelectDropDown key={params.groupId} values={params} id={params.groupId} />;
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
