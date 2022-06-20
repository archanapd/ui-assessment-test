import ReactHtmlParser from 'react-html-parser';
import { Container } from '@mui/material';
import DropZoneItem from './DropZoneItem';
import Draggables from './Draggables';
import { Droppable } from 'react-beautiful-dnd';

import './DragAndDrop.scss';

const formatLabel = (question: any) => {
  let queryString: any = question.content;
  question.answerGroupRef.forEach((id: any, i: number) => {
    queryString = queryString.replace('[' + id + ']', addDiv(id));
  });
  return queryString;
};

const addDiv = (key: any) => {
  return '<span key=' + key + ' id=' + key + '></span>';
};

export default function DropZone(props: any) {
  const { question, data } = props;
  const htmlParserTransform = (node: any) => {
    if (node.type === 'tag' && node.name === 'span') {
      let id = node.attribs.id;
      return <DropZoneItem dropId={id} key={id}></DropZoneItem>;
    }
  };

  return (
    <Container>
      {ReactHtmlParser(formatLabel(question), {
        transform: htmlParserTransform
      })}
      <Droppable droppableId="answerLists">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="drag-options"
          >
            {question.answerGroups.map((item: any, i: number) => {
              return (
                <Draggables
                  key={i}
                  content={item.answers[0].content}
                  groupId={item.answers[0].groupId}
                  ind={i}
                  products={data.products[i]}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
}
