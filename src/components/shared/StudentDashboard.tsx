import React from 'react';
import { Container, Box, AppBar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../../App.scss';
import bgImg from 'assets/student-logo.svg';

export default function StudentDashboard(props: any) {
  return (
    <Box className='dashboard-bg'>
        <img alt="" className="dashboard-bg-img" src={bgImg} />
      <Container maxWidth="lg">
        <Box
          className="page-not-found d-flex align-items-center flex-column py-5 justify-content-center"
          sx={{ minHeight: '100vh' }}
        >
           
          <div className='text-center'>
            <h2 className="mb-3 pt-5">Student Dashboard</h2>
            <p>Placement Test</p>
          </div>
        </Box>
      </Container>
    </Box>
  );
}
