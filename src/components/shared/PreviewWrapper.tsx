import React, { useState } from 'react';
import { Container, Grid, Box, AppBar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { callAPI } from '../../helpers/api';
import { BASE_URL } from '../../config/apiconfig';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '../../App.scss';
import '../Home/Home.scss';
import RadioButtonsGroup from 'components/RadioButton/RadioButtonsGroup';
import CheckBoxGroup from 'components/CheckBox/CheckBoxGroup';
import FillInTheBlanks from 'components/FillInTheBlanks/FillInTheBlanks';
import FillInTheSelect from 'components/FillInTheSelect/FillInTheSelect';
import SpeakTheWords from 'components/SpeakTheWords/SpeakTheWords';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';

const PreviewWrapper = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [questions, setQuestion] = useState<any[]>([]);

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
    callAPI({
      method: 'get',
      resource: questionAPI,
      success: (data) => {
        setQuestion([...questions, data]);
      },
      error: (error) => console.log(error)
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
        <Box
          sx={{ bgcolor: 'white' }}
          className="submit-wrapper preview-wrapper"
        >
          <Grid className="submit-wrapper-title pt-5 mt-5">
            <h4>Preview your question here</h4>
          </Grid>
          <Container className="answer-value-container p-0">
            {questions &&
              questions.map((question: any, ind: number) => {
                return (
                  <Grid
                    key={ind}
                    className="answer-values p-0"
                    id={'img-questions-' + (ind + 1)}
                  >
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
                        <SpeakTheWords
                          options={question}
                          showFullOptions={true}
                        />
                      </Grid>
                    )}
                  </Grid>
                );
              })}
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default PreviewWrapper;
