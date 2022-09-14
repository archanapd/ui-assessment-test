import { Draggable } from 'react-beautiful-dnd';
import { Container } from '@mui/material';

import './DragAndDrop.scss';

export default function Draggables(props: any) {
  const { answerContent, id, index } = props;

  return (
    <Container className="draggables-wrapper">
      <Draggable draggableId={`drag` + id} index={Number(index)}>
        {(provided) => (
          <div
            className="list"
            id={id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {answerContent}
          </div>
        )}
      </Draggable>
    </Container>
  );
}
