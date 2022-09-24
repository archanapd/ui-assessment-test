import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate(props: any) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress sx={{ color: '#98C93C' }} />
      {/* <CircularProgress sx={{ color: '#0069B1' }} /> */}
    </Box>
  );
}