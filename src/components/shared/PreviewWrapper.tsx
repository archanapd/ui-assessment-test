import React, { useState } from 'react';
import { Container, Grid, Box, AppBar } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../config/apiconfig';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import RadioButtonsGroup from 'components/RadioButton/RadioButtonsGroup';
import CheckBoxGroup from 'components/CheckBox/CheckBoxGroup';
import FillInTheBlanks from 'components/FillInTheBlanks/FillInTheBlanks';
import FillInTheSelect from 'components/FillInTheSelect/FillInTheSelect';
import SpeakTheWords from 'components/SpeakTheWords/SpeakTheWords';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';

import '../../App.scss';
import '../Home/Home.scss';
import axios from 'axios';
import BasicAlerts from 'components/BasicAlerts/BasicAlerts';

const PreviewWrapper = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [questions, setQuestion] = useState<any[]>([]);
  const [preview, setPreview] = useState<any[]>([]);
  const [error, setError] = useState<any[]>([]);
  const [alert, showAlert] = useState(false);

  let locale = useLocation();
  const token = locale.search.split('?')[1].split('=')[1];

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

  const getQuestions = () => {
    const questionAPI = BASE_URL + `/question?ref=${questionId}`; 
    axios
      .get(questionAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setQuestion([...questions, response.data]);
        callPreviewAPI(response.data);
        showAlert(false);
      })
      .catch((error) => {
        setError(error.response)
        showAlert(true);
      });
  };

  const callPreviewAPI = (questionRef: any) => {
    const previewAPI = BASE_URL + `/question/preview/${questionId}`;
    axios
      .get(previewAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        showAlert(false);
        let correctAnswerOption: any = response.data.answers.filter(
          (item: any) => item.correct === true
        );

        if (questionRef.type === 'SPEECH_BASIC') {
          questionRef.answerGroups.push({
            answers: correctAnswerOption
          });
        } else if (questionRef.type === 'FILL_IN_THE_BLANK_BASIC') {
          questionRef.answerGroupRef.forEach((value: any) => {
            questionRef.answerGroups.push({
              groupId: value,
              answers: [
                {
                  content: {
                    ...correctAnswerOption.filter((item: any) => item.groupId === value)[0]
                  },
                  groupId: value
                }
              ]
            });
          });
        } else if (questionRef.type === 'FILL_IN_THE_BLANK_DROPDOWN') {
          questionRef.answerGroups.forEach((value: any) => {
            value.answers.forEach((ans: any, j: number) => {
              correctAnswerOption.forEach((correct: any, k: number) => {
                if (ans.id === correct.id) {
                  ans.selected = true;
                }
              });
            });
          });
        } else if (questionRef.type === 'FILL_IN_THE_BLANK_DRAG') {
          questionRef.answerGroups.forEach((value: any) => {
            value.answers.forEach((ans: any, j: number) => {
              correctAnswerOption.forEach((correct: any, k: number) => {
                if (ans.id === correct.id) {
                  ans.selected = true;
                  ans.selectedGroupId = correct.groupId;
                }
              });
            });
          });
        } else {
          questionRef.answerGroups[0].answers.forEach((value: any) => {
            correctAnswerOption.forEach((correct: any, j: number) => {
              if (value.id === correct.id) {
                value.selected = true;
              }
            });
          });
        }
        setPreview([...preview, correctAnswerOption]);
      })
      .catch((error) => {
        setError(error.response)
        showAlert(true);
      });
  };

  React.useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Box>
      <ThemeProvider theme={darkTheme}>
        <AppBar className="headerbar" color="primary"></AppBar>
      </ThemeProvider>
      <Container maxWidth="sm">
        {preview.length > 0 && questions && (
          <Box sx={{ bgcolor: 'white' }} className="preview-wrapper">
            <Grid className="pt-5 mt-5 preview-wrapper-title">
              <h4>Preview your question here</h4>
            </Grid>
            <Container className="answer-value-container p-0">
              {questions.map((question: any, ind: number) => {
                return (
                  <Grid key={ind} className="qst-choice p-0" id={'img-questions-' + (ind + 1)}>
                    <p className="qst-title" id={'questions' + (ind + 1)}>
                      <b>Question</b>
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
                        <SpeakTheWords options={question} showFullOptions={true} />
                      </Grid>
                    )}
                  </Grid>
                );
              })}
            </Container>
          </Box>
        )}

        {alert && (
          <Box>
            <BasicAlerts severity="error" text={error}></BasicAlerts>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PreviewWrapper;
