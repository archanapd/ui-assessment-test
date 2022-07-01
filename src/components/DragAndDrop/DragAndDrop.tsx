import React, { useEffect, useState } from 'react';
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
    if (item.answers[0].selected) {
      // droppedValueArray.push(item.answers[0]);
      droppedValueArray[i] = item.answers[0];
    } else {
      answerArray.push(item.answers[0]);
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
      const removed = tempAnswerArray[startIndex];
      const endIndex = Number(destination.droppableId);
      question.answerGroups[endIndex].answers[0] = { ...removed };
      question.answerGroups[endIndex].answers[0].selected = true;

      // when dropping the answers on the right field selected field should not be switched again.
      if (removed.groupId !== question.answerGroups[endIndex].groupId) {
        removed.selected = false;
      }

      tempDropArray[endIndex] = removed;
      delete tempAnswerArray[startIndex];

      setData({
        ...data,
        answerArray: tempAnswerArray,
        droppedValueArray: tempDropArray
      });
      updateAnswers(tempDropArray);
    }
    if (destination.droppableId === 'answerLists') {
      const removed = tempDropArray[startIndex];

      question.answerGroups[startIndex].answers[0] = { ...removed };
      question.answerGroups[startIndex].answers[0].selected = false;

      removed.selected = false;
      tempAnswerArray.splice(startIndex, 0, removed);
      delete tempDropArray[startIndex];
      setData({
        ...data,
        answerArray: tempAnswerArray,
        droppedValueArray: tempDropArray
      });
      updateAnswers(tempDropArray);
    }
    if (
      source.droppableId !== 'answerLists' &&
      destination.droppableId !== 'answerLists'
    ) {
      // const [removed] = tempDropArray.splice(startIndex, 1);
      const removed = tempDropArray[startIndex];
      delete tempDropArray[startIndex];
      tempDropArray[destination.droppableId] = removed;

      question.answerGroups[destination.droppableId].answers[0] = {
        ...removed
      };
      question.answerGroups[destination.droppableId].answers[0].selected = true;

      setData({ ...data, droppedValueArray: tempDropArray });
      updateAnswers(tempDropArray);
    }
  };

  useEffect(() => {
    // const question = props.options;
    // let tempDropArray: any[] = [];
    // question.answerGroups.map((answerGroup: any) => {
    //   if (answerGroup.answers[0].selected) {
    //     tempDropArray.push(answerGroup.answers[0]);
    //   }
    // });
    // console.log(tempDropArray);
    // setData({
    //   ...data,
    //   droppedValueArray: tempDropArray
    // });
    // question.answerGroups.map((answerGroup: any) => {
    //   answerGroup.answers[0].selected = false;
    // });
  }, [props]);

  const updateAnswers = (tempDropArray: any) => {
    // tempDropArray.map((item: any) => {
    //   if (item) {
    //     let answersGroup = question.answerGroups.find(
    //       (obj: any) => obj.groupId === item.groupId
    //     );
    //     answersGroup.answers[0].selected = item.selected;
    //   }
    // });
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
