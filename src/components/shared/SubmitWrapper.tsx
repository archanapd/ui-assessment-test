import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';
import logo from 'assets/logo-rect.svg';
import { callAPI } from '../../helpers/api';
import Button from 'react-bootstrap/Button';
import { BASE_URL } from '../../config/apiconfig';
import CloseIcon from '@mui/icons-material/Close';
import greenSuccess from 'assets/green-success.svg';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '../../App.scss';
import '../Home/Home.scss';
import RadioButtonsGroup from 'components/RadioButton/RadioButtonsGroup';
import CheckBoxGroup from 'components/CheckBox/CheckBoxGroup';
import FillInTheBlanks from 'components/FillInTheBlanks/FillInTheBlanks';
import FillInTheSelect from 'components/FillInTheSelect/FillInTheSelect';
import SpeakTheWords from 'components/SpeakTheWords/SpeakTheWords';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';

const SubmitWrapper = () => {
  const initSettings: any = JSON.parse(localStorage.getItem('initSettings') || '[]');
  const userSessionId = initSettings[0] ? initSettings[0].userSessionId : '';

  let [questions, setQuestions] = useState<any[]>([]);

  const getUserAnswersFromApi = () => {
    if (initSettings) {
      callAPI({
        method: 'get',
        resource: BASE_URL + `/session/${userSessionId}/question`,
        success: (data) => {
          setQuestions(data);
        },
        error: (error) => console.log(error)
      });
    }
  };

  const [open, setOpen] = useState(false);
  const [suOpen, setSuOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSuOpen(false);
    navigate('/');
  };

  const hideModalAndSubmit = () => {
    setOpen(false);
    submitAnswers();
  };

  let navigate = useNavigate();
  const returnHome = () => {
    navigate('/');
  };

  const showSubmitModal = () => {
    setOpen(true);
  };

  const showSucsessModal = () => {
    setSuOpen(true);
  };

  const submitAnswers = () => {
    callAPI({
      method: 'get',
      resource: BASE_URL + `/session/submit/${userSessionId}`,
      success: (data) => {
        showSucsessModal();
      },
      error: (error) => console.log(error)
    });
  };

  const scrollToEachQuestion = (event: any) => {
    const elementId = document.getElementById(
      'questions' + event.target.id.split('-')[1]
    ) as HTMLInputElement;
    window.scrollTo(0, elementId.offsetTop - 60);
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

  useEffect(() => {
    getUserAnswersFromApi();
  }, []);

  return (
    <Box>
      <ThemeProvider theme={darkTheme}>
        <AppBar className="headerbar" color="primary">
          {<img alt="" className="inner-header" src={logo}></img>}
        </AppBar>
      </ThemeProvider>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'white' }} className="submit-wrapper">
          <Grid className="submit-wrapper-title pt-5 mt-5">
            <h4>Summary</h4>
            <p>Please check your answer before submit it!</p>
          </Grid>
          <Grid className="submit-wrapper-result">
            <h5>Total of Question(s): {questions.length}</h5>
            <ul className="result-connector">
              {questions.map((item: any, i: number) => {
                return (
                  <li
                    className="active"
                    id={'connector-' + (i + 1)}
                    onClick={scrollToEachQuestion}
                    key={i + 1}
                  >
                    {i + 1}
                  </li>
                );
              })}
            </ul>
          </Grid>
          <Container className="answer-value-container p-0">
            {questions &&
              questions.map((question: any, ind: number) => {
                return (
                  <Grid key={ind} className="answer-values p-0" id={'img-questions-' + (ind + 1)}>
                    <p className="qst-title" id={'questions' + (ind + 1)}>
                      <b>Question {ind + 1}</b>
                    </p>
                    {question.type === 'SINGLE_CHOICE' && (
                      <Grid>
                        <RadioButtonsGroup options={question} disabled={true} />
                      </Grid>
                    )}

                    {question.type === 'MULTIPLE_CHOICE' && (
                      <Grid>
                        <CheckBoxGroup options={question} disabled={true} />
                      </Grid>
                    )}

                    {question.type === 'FILL_IN_THE_BLANK_BASIC' && (
                      <Grid>
                        <FillInTheBlanks options={question} disabled={true} />
                      </Grid>
                    )}

                    {question.type === 'FILL_IN_THE_BLANK_DROPDOWN' && (
                      <Grid>
                        <FillInTheSelect options={question} disabled={true} />
                      </Grid>
                    )}

                    {question.type === 'FILL_IN_THE_BLANK_DRAG' && (
                      <Grid>
                        <DragAndDrop options={question} disabled={true} />
                      </Grid>
                    )}

                    {question.type === 'SPEECH_BASIC' && (
                      <Grid>
                        <SpeakTheWords options={question} showFullOptions={false} />
                      </Grid>
                    )}
                  </Grid>
                );
              })}
          </Container>
        </Box>
      </Container>
      <footer className="page-footer pt-4 pb-5 footer-submit">
        <Container className="mb-4" maxWidth="sm">
          <Grid className="mx-0 d-flex btn-row">
            <Button
              className="me-auto col btn-lg btn-outline-primary"
              variant="outlined"
              onClick={returnHome}
            >
              {' '}
              Take the Test again
            </Button>
            <Button variant="primary" className="mx-2 col" onClick={showSubmitModal}>
              Submit
            </Button>
            <Dialog
              open={open}
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
                <img src={greenSuccess} alt="" />
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to submit this
                  <br /> test?
                </DialogContentText>
              </DialogContent>
              <DialogActions className="dialog-btm">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={hideModalAndSubmit} autoFocus>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {/* Dialog - Submitted */}
            <Dialog
              open={suOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="dialog-success"
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
                <img src={greenSuccess} alt="" />
                <DialogContentText id="alert-dialog-description">
                  Successfully Submitted!
                </DialogContentText>
              </DialogContent>
              <DialogActions className="dialog-btm">
                <Button onClick={handleClose}>Ok</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Container>
      </footer>
    </Box>
  );
};

export default SubmitWrapper;
