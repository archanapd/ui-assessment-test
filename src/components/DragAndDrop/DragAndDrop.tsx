import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './DragAndDrop.scss';
import DropZone from './DropZone';

export default function DragAndDrop(props: any) {
  const question = props.options;
  const answerArray: any[] = [];
  const questionArray: any = [];
  const droppedValueArray: any = [];

  question.answerGroups.map((item: any, i: number) => {
    answerArray.push(item.answers[0]);
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

  const [data, setData] = useState({ ...initialData });

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

    if (
      source.droppableId === 'answerLists' &&
      destination.droppableId !== 'answerLists'
    ) {
      const [removed] = tempAnswerArray.splice(startIndex, 1);
      const endIndex = Number(destination.droppableId);
      tempDropArray[endIndex] = removed;
      setData({
        ...data,
        answerArray: tempAnswerArray,
        droppedValueArray: tempDropArray
      });
    }
    if (destination.droppableId === 'answerLists') {
      const removed = tempDropArray[startIndex];
      tempAnswerArray.splice(startIndex, 0, removed);
      delete tempDropArray[startIndex];
      setData({
        ...data,
        answerArray: tempAnswerArray,
        droppedValueArray: tempDropArray
      });
    }
    if (
      source.droppableId !== 'answerLists' &&
      destination.droppableId !== 'answerLists'
    ) {
      const [removed] = tempDropArray.splice(startIndex, 1);
      tempDropArray[destination.droppableId] = removed;
      setData({ ...data, droppedValueArray: tempDropArray });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <DragDropContext onDragEnd={DragEnd}>
          <Grid>
            <DropZone data={data}></DropZone>
          </Grid>
        </DragDropContext>
      </Container>
    </React.Fragment>
  );
}
