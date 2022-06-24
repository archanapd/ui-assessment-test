import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './DragAndDrop.scss';
import DropZone from './DropZone';

export default function DragAndDrop(props: any) {
  const question = props.options;
  const products: any[] = [];
  const days: any[] = [];
  const dragsOrder: any = [];
  const daysOrder: any[] = [];

  question.answerGroups.map((item: any, i: number) => {
    products.push({ id: item.groupId, content: item.answers[0].content });
    days.push({ id: item.groupId, title: `Drop` + i, productIds: [] });
    dragsOrder.push(`Drop` + i);
    daysOrder.push(item.groupId);
  });

  const initialData: any = {
    products: products,
    productsColumn: {
      answerLists: {
        id: 'products',
        title: 'Products',
        productIds: dragsOrder
      }
    },
    days: days,
    daysOrder: daysOrder
  };

  const [data, setData] = useState(initialData);

  const DragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    console.log(result);

    if (!destination || destination.droppableId === 'answerLists') {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start: any =
      source.droppableId === 'answerLists'
        ? data.productsColumn[source.droppableId]
        : '';
    const finish: any = data.days.filter(
      (item: any) => item.id === destination.droppableId
    );

    const startProductIds = Array.from(
      source.droppableId === 'answerLists' ? start.productIds : start.productIds
    );
    startProductIds.splice(source.index, 1);
    const newStart = { ...start, productIds: startProductIds };
    const newState = {
      ...data,
      days: {
        ...data.days,
        [newStart.id]: newStart
      },
      productsColumn: {
        ...data.productsColumn
      }
    };
    setData(newState);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <DragDropContext onDragEnd={DragEnd}>
          <Grid>
            <DropZone question={question} data={data}></DropZone>
          </Grid>
        </DragDropContext>
      </Container>
    </React.Fragment>
  );
}
