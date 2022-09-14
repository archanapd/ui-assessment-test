import React from 'react';
import { Container, Box, AppBar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import logo from 'assets/logo-rect.svg';
import bgImg from 'assets/404.svg';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound(props: any) {
  let navigate = useNavigate();
  const returnHome = () => {
    navigate('/');
  };
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
          {<img alt="" className="inner-header" src={logo}></img>}
        </AppBar>
      </ThemeProvider>
      <Container maxWidth="lg">
        <Box
          className="page-not-found d-flex align-items-center flex-column py-5 justify-content-center"
          sx={{ minHeight: '100vh' }}
        >
          <img alt="" className="page-not-bg" src={bgImg} />
          <div className="text-center">
            <h2 className="mb-3 pt-5">Oops! Page Not Found</h2>
            <p>The Page you are looking for doesn’t exist or an other error occured</p>
            <div
              className="d-grid gap-2 d-md-flex justify-content-center mt-5"
              onClick={returnHome}
            >
              <a href="" className="btn btn-primary btn-lg me-md-2">
                Back
              </a>
            </div>
          </div>
        </Box>
      </Container>
    </Box>
  );
}
