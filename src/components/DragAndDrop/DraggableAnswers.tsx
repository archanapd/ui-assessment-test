import { Draggable } from 'react-beautiful-dnd';

import './DragAndDrop.scss';

export default function DraggableAnswers(props: any) {
  const { answerContent, id, index } = props;

  return (
    <Draggable draggableId={`draggable` + id} index={Number(index)}>
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
  );
}
