import React from 'react';
import { Container, Box, AppBar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import logo from 'assets/logo-rect.svg';

export default function Register(props: any) {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#FFF'
      },
      secondary: {
        main: '#98C93C'
      }
    }
  });
  return (
    <Box>
      <ThemeProvider theme={darkTheme}>
        <AppBar className="headerbar" color="primary">
          {<img className="inner-header" src={logo}></img>}
        </AppBar>
      </ThemeProvider>

      <Container maxWidth="lg">
        <Box
          className="page-register d-flex align-items-center flex-column py-5 justify-content-center"
          sx={{ minHeight: '100vh' }}
        >
          <div className='preview-wrapper-title'>
            <h4 className="mb-3 pt-5">Fill in the following details before starting the test</h4>
            <div className='my-4'>
              <label className='mb-2' htmlFor="">Full name*</label>
              <TextField id="outlined-basic1"  variant="outlined" fullWidth />
            </div>
            <div className='my-4'>
              <label className='mb-2' htmlFor="">Email*</label>
              <TextField id="outlined-basic2" type="email" variant="outlined" fullWidth /></div>
            <div className='my-4'>
              <label className='mb-2' htmlFor="">Mobile phone number*</label>
              <TextField id="outlined-basic3" variant="outlined" fullWidth /></div>
            <div className='text-start'>
              <FormControlLabel control={<Checkbox defaultChecked />} label="I am willing to receive information & promotions about Cakeap" />
            </div>
            <div className='mt-3 btn-block-register'>
              <Button className='btn btn-primary' variant="contained">Start Test</Button>
            </div>
          </div>
        </Box>
      </Container>
    </Box>
  );
}
