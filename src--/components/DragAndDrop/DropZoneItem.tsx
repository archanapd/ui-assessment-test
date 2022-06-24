import { Container } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import './DragAndDrop.scss';

export default function DropZoneItem(props: any) {
  const { dropId } = props;

  return (
    <Container className="drop-options-wrapper">
      <Droppable droppableId={dropId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}></div>
        )}
      </Droppable>
    </Container>
  );
}
