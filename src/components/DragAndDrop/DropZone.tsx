import ReactHtmlParser from 'react-html-parser';
import { Container } from '@mui/material';
import DropZoneItem from './DropZoneItem';
import { Droppable } from 'react-beautiful-dnd';

import './DragAndDrop.scss';
import DraggableAnswers from './DraggableAnswers';

export default function DropZone(props: any) {
  const { mainQuestion, answerArray, questionArray, droppedValueArray } = props.data;

  const htmlParserTransform = (node: any) => {
    if (node.type === 'tag' && node.name === 'span') {
      let id = node.attribs.id;
      return (
        <DropZoneItem
          key={questionArray[id]}
          index={id}
          answerArray={answerArray}
          groupId={questionArray[id]}
          droppedValueArray={droppedValueArray}
        ></DropZoneItem>
      );
    }
  };

  const formatLabel = (mainQuestion: any) => {
    let queryString: any = mainQuestion.content;

    mainQuestion.answerGroupRef.forEach((id: any, i: number) => {
      queryString = queryString.replace('[' + id + ']', addSpan(id, i));
    });
    return queryString;
  };

  const addSpan = (key: any, i: number) => {
    return '<span key=' + i + ' id=' + i + '></span>';
  };

  return (
    <Container>
      <div className="drag-quest-list">
        {ReactHtmlParser(formatLabel(mainQuestion), {
          transform: htmlParserTransform
        })}
      </div>

      <div className="drop-zone">
        <Droppable droppableId="answerLists" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="drag-wrapper">
              {answerArray.map((item: any, i: number) => {
                if (answerArray[i])
                  return (
                    <DraggableAnswers
                      key={i}
                      answerArray={answerArray}
                      answerContent={item.content}
                      id={item.id}
                      index={i}
                    />
                  );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </Container>
  );
}
