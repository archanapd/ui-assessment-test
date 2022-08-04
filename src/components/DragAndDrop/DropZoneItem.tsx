import { Droppable } from 'react-beautiful-dnd';
import './DragAndDrop.scss';
import Draggables from './Draggables';

export default function DropZoneItem(props: any) {
  const { groupId, answerArray, droppedValueArray, index } = props;

  return (
    <span className="drop-options-wrapper" id={groupId}>
      <Droppable
        droppableId={index}
        direction="horizontal"
        isDropDisabled={droppedValueArray[index] !== undefined}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {droppedValueArray[index] && (
              <div>
                <Draggables
                  key={index}
                  answerArray={answerArray}
                  answerContent={droppedValueArray[index].content}
                  groupId={droppedValueArray[index].groupId}
                  index={index}
                />
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </span>
  );
}
