import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {
  Container,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { callAPI } from '../../helpers/api';
import { BASE_URL } from '../../config/apiconfig';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Home.scss';
import logo from 'assets/cakap-logo.svg';
import CloseIcon from '@mui/icons-material/Close';
import fileSubmittedImg from '../../assets/green-file-filled.svg';

function App() {
  let navigate = useNavigate();
  let [initSettings, updateInitSettings] = useState<any[]>([]);
  const [timedOut, setTimedOut] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [assessmentLink, setAssessmentLink] = useState(
    localStorage.getItem('assessment-link') ? localStorage.getItem('assessment-link') : ''
  );

  const startAssessment = () => {
    localStorage.setItem('initSettings', JSON.stringify(initSettings));
    navigate('/questions/' + 1, {});
  };
  const assessmentData = {
    assessmentLink: assessmentLink,
    userId: 'user0012'
  };
  const getAssessmentSettings = (newAssessmentLink: string) => {
    assessmentData.assessmentLink = newAssessmentLink ? newAssessmentLink : assessmentLink;
    callAPI({
      method: 'post',
      data: assessmentData,
      resource: BASE_URL + '/assessment/start',
      success: (data) => {
        updateInitSettings([...initSettings, data]);
        if (data.status === 'TIMEOUT') {
          setTimedOut(true);
          setOpenDialog(false);
        }
      },
      error: (error) => console.log(error)
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const createAssessment = () => {
    callAPI({
      method: 'post',
      data: {
        title: 'General Summer Exam',
        sections: [
          {
            numberOfQuestions: 2,
            level: 'LOW'
          },
          {
            numberOfQuestions: 2,
            level: 'MEDIUM'
          },
          {
            numberOfQuestions: 1,
            level: 'HIGH'
          }
        ],
        timeBound: true,
        timeInMinutes: 30,
        levelId: '3',
        studyId: '4',
        materialId: '5',
        categoryId: '5',
        type: 'FIXED_QUESTION',
        fixedQuestion: true,
        autoSubmit: false,
        instructions: [
          "You'll be asked 5 questions to test your knowledge",
          'To pass you need a score of <b>80%</b>',
          "You can always have another go if you don't pass them all on this attempt",
          'Skipping a quesion will result in a failed answer',
          'There is no time limit, however if you are inactive for 15 minutes or more for security you will be logged out of the platform and your progress will be lost'
        ]
      },
      resource: BASE_URL + '/assessment/create',
      success: (data) => {
        setAssessmentLink(data.link);
        localStorage.setItem('assessment-link', data.link);
        setTimedOut(false);
        getAssessmentSettings(data.link);
      },
      error: (error) => console.log(error)
    });
  };

  React.useEffect(() => {
    if (assessmentLink) {
      getAssessmentSettings('');
    } else {
      setTimedOut(true);
    }
  }, []);

  return (
    <div className="App">
      <Container className="block-home" maxWidth="md">
        <Box sx={{}} className="home">
          <img className="home-logo" src={logo} alt="logo" />
          <div className="home-main">
            <h2>Placement Test</h2>
            <p>
              There are 3 sections of this test which include Grammar, Listening, and Reading. The
              test has a total of 30 questions and should take 30 minutes to complete.
            </p>
            <div className="cover"></div>
            {
              <Grid className="mt-5">
                {!timedOut && (
                  <Button variant="primary" className="mx-2" onClick={startAssessment}>
                    Start Now
                  </Button>
                )}
                <Button variant="primary" className="mx-2" onClick={createAssessment}>
                  Create Assessment
                </Button>
              </Grid>
            }
          </div>
        </Box>
        {/* Dialog Submit notify */}
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '#DDDDEA'
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="dialog-content">
            <img src={fileSubmittedImg} alt="" />
            <DialogContentText id="alert-dialog-description">
              Hi, you have submitted this <br /> assessment!
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-btm">
            <Button onClick={handleClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default App;
