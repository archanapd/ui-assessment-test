import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container, Grid, Box } from '@mui/material';
import { callAPI } from '../../helpers/api';
import { BASE_URL } from '../../config/apiconfig';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Home.scss';
import logo from 'assets/cakap-logo.svg';

function App() {
  let navigate = useNavigate();
  let [initSettings, updateInitSettings] = useState<any[]>([]);

  const startAssessment = () => {
    localStorage.setItem('initSettings', JSON.stringify(initSettings));
    navigate('/questions/' + 1, {});
  };
  // const assessmentData = {
  //   assessmentLink: 'ea5d8ddd-97e1-4267-b68b-27141bfd1a64',
  //   userId: 'U1222'
  // };
  // const getAssessmentSettings = () => {
  //   callAPI({
  //     method: 'post',
  //     data: assessmentData,
  //     resource: BASE_URL + '/start',
  //     success: (data) => {
  //       updateInitSettings([...initSettings, data]);
  //     },
  //     error: (error) => console.log(error)
  //   });
  // };

  React.useEffect(() => {
    //getAssessmentSettings();
  }, []);

  return (
    <div className="App">
      <Container className="block-home" maxWidth="md">
        <Box sx={{}} className="home">
          <img className="home-logo" src={logo} alt="logo" />
          <div className="home-main">
            <h2>Placement Test</h2>
            <p>
              There are 3 sections of this test which include Grammar,
              Listening, and Reading. The test has a total of 30 questions and
              should take 30 minutes to complete.
            </p>
            <div className="cover"></div>
            <Grid className="mt-5">
              <Button
                variant="primary"
                className="mx-2"
                onClick={startAssessment}
              >
                Start Now
              </Button>
            </Grid>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default App;
