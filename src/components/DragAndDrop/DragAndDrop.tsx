import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './DragAndDrop.scss';
import DropZone from './DropZone';

export default function DragAndDrop(props: any) {
  const question = props.options;
  let answerArray: any[] = [];
  const questionArray: any = [];
  let droppedValueArray: any = [];

  const [data, setData] = useState<any | []>([]);

  question.answerGroups.map((itemGroup: any, i: number) => {
    if (itemGroup.answers.length === 1) {
      if (itemGroup.answers[0].selected === true) {
        let groupId = itemGroup.answers[0].selectedGroupId
          ? itemGroup.answers[0].selectedGroupId
          : itemGroup.groupId;
        let index = question.answerGroupRef.indexOf(groupId);
        droppedValueArray[index] = itemGroup.answers[0];
      } else {
        answerArray.push(itemGroup.answers[0]);
      }
    } else {
      itemGroup.answers.forEach((item: any, i: number) => {
        if (item.selected === true) {
          let idd = item.selectedGroupId;
          let index = question.answerGroupRef.indexOf(idd);
          droppedValueArray[index] = item
        } else {
          answerArray.push(item);
        }
      })
    }
  });

  question.answerGroupRef.map((item: any) => {
    questionArray.push(item);
  });

  const initialData: any = {
    mainQuestion: question,
    questionArray: questionArray,
    answerArray: answerArray,
    droppedValueArray: droppedValueArray
  };
  
  useEffect(() => {
    setData({ ...initialData });
  }, [props]);

  const DragEnd = (result: DropResult) => {
    const { source, destination } = result;

    const startIndex = source.index;
    let tempAnswerArray: any = Array.from(data.answerArray);
    let tempDropArray: any = Array.from(data.droppedValueArray);

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    if (source.droppableId === 'answerLists' && destination.droppableId !== 'answerLists') {
      const removed = tempAnswerArray[startIndex];
      const endIndex = Number(destination.droppableId);
      let index = question.answerGroupRef.indexOf(removed.groupId);
      question.answerGroups[index].answers[0].selected = true;
      question.answerGroups[index].answers[0].selectedGroupId = question.answerGroupRef[endIndex];

      tempDropArray[endIndex] = removed;
      delete tempAnswerArray[startIndex];

      setData({
        ...data,
        answerArray: tempAnswerArray,
        droppedValueArray: tempDropArray
      });
    }
    if (destination.droppableId === 'answerLists') {
      const removed = tempDropArray[startIndex];
      let index = question.answerGroupRef.indexOf(removed.groupId ? removed.groupId : removed.selectedGroupId);
      question.answerGroups[index].answers[0].selected = false;
      question.answerGroups[index].answers[0].selectedGroupId = null;

      removed.selected = false;
      tempAnswerArray.splice(startIndex, 0, removed);
      delete tempDropArray[startIndex];

      setData({
        ...data,
        answerArray: tempAnswerArray,
        droppedValueArray: tempDropArray
      });
    }
    if (source.droppableId !== 'answerLists' && destination.droppableId !== 'answerLists') {
      const removed = tempDropArray[startIndex];
      delete tempDropArray[startIndex];
      tempDropArray[destination.droppableId] = removed;
      let index = question.answerGroupRef.indexOf(removed.groupId ? removed.groupId : removed.selectedGroupId);
      question.answerGroups[index].answers[0].selected = true;
      question.answerGroups[index].answers[0].selectedGroupId =
        question.answerGroupRef[destination.droppableId];

      setData({ ...data, droppedValueArray: tempDropArray });
    }

    console.log(droppedValueArray)
    console.log(answerArray)
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <DragDropContext onDragEnd={DragEnd}>
          <Grid>
            {data.mainQuestion && <DropZone data={data}></DropZone>}
          </Grid>
        </DragDropContext>
      </Container>
    </React.Fragment>
  );
}
