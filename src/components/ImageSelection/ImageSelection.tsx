import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import './ImageSelection.scss';

export default function ImageSelection(props: any) {
  let [singleSelection, setSingleSelection] = useState<string>('');
  const [multiSelection, setMultiSelection] = useState<string[]>([]);

  const imageClicked = (event: any) => {
    if (props.options.mode === 'single') {
      singleSelection = event.target.dataset.src;
      setSingleSelection(singleSelection);
    } else if (props.options.mode === 'multi') {
      const indx = multiSelection.indexOf(event.target.dataset.src);
      setMultiSelection(multiSelection.filter((check) => check !== event.target.dataset.src));
      if (indx === -1) {
        setMultiSelection([...multiSelection, event.target.dataset.src]);
      } else {
        setMultiSelection(multiSelection.filter((check) => check !== event.target.dataset.src));
      }
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <ImageList
          className="image-wrapper"
          sx={{ width: 500, height: 450 }}
          cols={3}
          rowHeight={164}
        >
          {props.options.images.map((item: any, index: number) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                data-src={`${item.img}`}
                className={
                  props.options.mode === 'single'
                    ? singleSelection.includes(item.img)
                      ? 'selected'
                      : ''
                    : multiSelection.includes(item.img)
                    ? 'selected'
                    : ''
                }
                loading="lazy"
                onClick={imageClicked}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </React.Fragment>
  );
}
