import { Draggable } from 'react-beautiful-dnd';
import { Container, Grid } from '@mui/material';

import './DragAndDrop.scss';

export default function Draggables(props: any) {
  const { groupId, ind, products } = props;
  return (
    <Container>
      <Draggable draggableId={`drag` + groupId} index={ind}>
        {(provided) => (
          <div
            className="list"
            id={`drag` + groupId}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {products.content}
          </div>
        )}
      </Draggable>
    </Container>
  );
}
