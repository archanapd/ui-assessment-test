import { Draggable } from 'react-beautiful-dnd';

import './DragAndDrop.scss';

export default function DraggableAnswers(props: any) {
  const { answerContent, groupId, index } = props;

  return (
    <Draggable draggableId={`draggable` + groupId} index={Number(index)}>
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
  );
}
