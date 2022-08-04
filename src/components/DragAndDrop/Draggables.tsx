import { Draggable } from 'react-beautiful-dnd';
import { Container } from '@mui/material';

import './DragAndDrop.scss';

export default function Draggables(props: any) {
  const { answerContent, groupId, index } = props;

  return (
    <Container>
      <Draggable draggableId={`drag` + groupId} index={Number(index)}>
        {(provided) => (
          <div
            className="list"
            id={groupId}
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
