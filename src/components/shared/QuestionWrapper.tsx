import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Box, AppBar } from '@mui/material';
import { callAPI } from '../../helpers/api';
import CssBaseline from '@mui/material/CssBaseline';
import RadioButtonsGroup from 'components/RadioButton/RadioButtonsGroup';
import CheckBoxGroup from 'components/CheckBox/CheckBoxGroup';
import Button from 'react-bootstrap/Button';
import ReactHtmlParser from 'react-html-parser';
import { BASE_URL } from '../../config/apiconfig';
import FillInTheBlanks from '../FillInTheBlanks/FillInTheBlanks';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SpeakTheWords from 'components/SpeakTheWords/SpeakTheWords';
import '../../App.scss';
import logo from 'assets/logo-rect.svg';
import FillInTheSelect from 'components/FillInTheSelect/FillInTheSelect';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';

const QuestionWrapper = () => {
  let navigate = useNavigate();

  const { questionId } = useParams<{ questionId: string }>();
  let [questionIdRef, setQuestionIdRef] = React.useState(Number(questionId));

  const initSettings: any = JSON.parse(
    localStorage.getItem('initSettings') || '[]'
  );
  const userSessionId = 1;
  const numberOfQuestions = 1;

  let [questions, setQuestion] = useState<any[]>([]);
  const [error, setError] = React.useState({});

  const getQuestions = () => {
    // const questionAPI =
    //   BASE_URL + `/session/${userSessionId}/question/${questionIdRef}`;
    // const questionAPI =
    //   'https://api-dev.cakap.com/v3/material/question?ref=62975e33d806a7307dc03143';
    // callAPI({
    //   method: 'get',
    //   resource: questionAPI,
    //   success: (data) => {
    //     const indx = questions.findIndex((obj) => obj.ref === data.ref);
    //     if (indx === -1) {
    //       setQuestion([...questions, data]);
    //     } else {
    //       setQuestion([...questions[indx], data]);
    //     }
    //   },
    //   error: (error) => setError(error)
    // });

    const data = {
      "ref": "62ac7472b6767c5a8d355e2e",
      "questionId": "82164d80-99b7-474b-b76f-ff253fae4e05",
      "version": 1,
      "skillCompetency": [
          "Movie",
          "General"
      ],
      "level": "LOW",
      "type": "MULTIPLE_CHOICE",
      "wrongFeedback": "",
      "correctFeedback": "",
      "content": "<div>Choose the correct answer</div>",
      "studyId": null,
      "categoryId": null,
      "levelId": null,
      "answerGroupRef": [
          "S1"
      ],
      "answerGroups": [
          {
              "groupId": "S1",
              "answers": [
                  {
                      "id": "62ac7472b6767c5a8d355e2f",
                      "content": "<video width=\"150\" controls=\"\"><source src=\"https://s3.ap-southeast-1.amazonaws.com/dev.squline.com/assisment/1654687355815_1071234500.mp4\" type=\"video/mp4\"></video>",
                      "groupId": "S1",
                      "selected": false
                  },
                  {
                      "id": "62ac7472b6767c5a8d355e31",
                      "content": "<div>All of the above</div><div><br></div><div><img src=\"https://s3.ap-southeast-1.amazonaws.com/dev.squline.com/assisment/1654576478779_1078379218.jfif\" alt=\"\" width=\"120\"></div><div><br></div><div><br></div><div><video width=\"150\" controls=\"\"><source src=\"https://s3.ap-southeast-1.amazonaws.com/dev.squline.com/assisment/1654687355815_1071234500.mp4\" type=\"video/mp4\"><br></video></div><div><br></div><div><br></div><div><audio controls=\"\"><source src=\"https://s3.ap-southeast-1.amazonaws.com/dev.squline.com/assisment/1654687975825_1457280728.mp3\" type=\"audio/ogg\"></audio><br></div>",
                      "groupId": "S1",
                      "selected": false
                  },
                  {
                      "id": "62ac7472b6767c5a8d355e30",
                      "content": "<div><audio controls=\"\"><source src=\"https://s3.ap-southeast-1.amazonaws.com/dev.squline.com/assisment/1654687975825_1457280728.mp3\" type=\"audio/ogg\"></audio></div>",
                      "groupId": "S1",
                      "selected": false
                  },
                  {
                      "id": "62ac7472b6767c5a8d355e32",
                      "content": "<div>none of the above</div>",
                      "groupId": "S1",
                      "selected": false
                  }
              ]
          }
      ]
  }
    setQuestion([...questions, data]);
  };
  
  localStorage.setItem('savedQuestions', JSON.stringify(questions));

  const saveAnswers = () => {
    const questionsArray: any = JSON.parse(
      localStorage.getItem('savedQuestions') || '[]'
    );
    questionsArray.map((questionObj: any) => {
      if (questions[questionIdRef - 1].ref === questionObj.ref) {
        let existingAnswers = questionObj.answerGroups;
        let newAnswers = questions[questionIdRef - 1].answerGroups;

        if (!getDifference(existingAnswers, newAnswers)) {
          const saveAPI = BASE_URL + `/session/save`;
          let bodyJson: any = getbodyJson();
          callAPI({
            method: 'post',
            data: bodyJson,
            resource: saveAPI,
            success: () => {},
            error: (error) => console.log(error)
          });
        }
      }
    });
  };

  const getbodyJson = () => {
    let currentQuestion = questions[questionIdRef - 1];
    const bodyJson = {
      userSessionId: userSessionId,
      questionRef: questions[questionIdRef - 1].ref,
      userInputs: [{}],
      answers: [{}]
    };

    if (
      currentQuestion.type === 'FILL_IN_THE_BLANK_BASIC' ||
      currentQuestion.type === 'SPEECH_BASIC'
    ) {
      currentQuestion.answerGroups.map((data: any, i: number) => {
        bodyJson.userInputs.push({
          content: data.answers[i].content,
          groupId: data.groupId
        });
        bodyJson.userInputs.shift();
      });
    } else {
      currentQuestion.answerGroups.map((data: any, i: number) => {
        data.answers.map((item: any) => {
          if (item.selected === true) {
            bodyJson.answers.push({
              answerId: item.id,
              groupId: data.groupId
            });
          }
        });
      });
      bodyJson.answers.shift();
    }
    return bodyJson;
  };

  const getDifference = (array1: any, array2: any) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  const handlePrevClick = () => {
    setAnswersForFillAndSpeech();
    saveAnswers();
    if (questionIdRef > 1) {
      questionIdRef = questionIdRef - 1;
      setQuestionIdRef(questionIdRef);
      getQuestions();
      navigate('/questions/' + questionIdRef);
    }
  };
  const handleNextClick = () => {
    setAnswersForFillAndSpeech();
    saveAnswers();
    if (questionIdRef < numberOfQuestions) {
      questionIdRef = questionIdRef + 1;
      setQuestionIdRef(questionIdRef);
      getQuestions();
      navigate('/questions/' + questionIdRef);
    } else {
      navigate('/submit/', { state: { values: questions } });
    }
  };

  const setAnswersForFillAndSpeech = () => {
    let question: any = questions[questionIdRef - 1];
    if (question.type === 'FILL_IN_THE_BLANK_BASIC') {
      question.answerGroups.map((item: any) => {
        item.answers[0].content = (
          document.getElementById(item.groupId) as HTMLInputElement
        ).value;
      });
    } else if (question.type === 'FILL_IN_THE_BLANK_DROPDOWN') {
      question.answerGroups.map((item: any) => {
        let value = (document.getElementById(item.groupId) as HTMLInputElement)
          .value;
        item.answers.map((answer: any) => {
          answer.selected = answer.id === value;
        });
      });
    } else if (question.type === 'SPEECH_BASIC') {
      question.answerGroups.map((item: any) => {
        item.answers[0].content = (
          document.getElementById('SPEECH_BASIC') as HTMLInputElement
        ).innerHTML;
      });
    }
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

  React.useEffect(() => {
    getQuestions();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar className="headerbar" color="primary">
          {<img className="inner-header" src={logo}></img>}
        </AppBar>
      </ThemeProvider>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'white' }} className="question-wrapper">
          <p className="qst-title">
            <b>Question {questionId}</b>
          </p>
          <Grid className="qst-choice">
            {questions[questionIdRef - 1] &&
              questions[questionIdRef - 1].type === 'SINGLE_CHOICE' && (
                <RadioButtonsGroup
                  options={questions[questionIdRef - 1]}
                  disabled={false}
                />
              )}
            {questions[questionIdRef - 1] &&
              questions[questionIdRef - 1].type === 'SPEECH_BASIC' && (
                <SpeakTheWords
                  options={questions[questionIdRef - 1]}
                  showFullOptions={true}
                />
              )}
            {questions[questionIdRef - 1] &&
              ReactHtmlParser(questions[questionIdRef - 1].content) &&
              questions[questionIdRef - 1].type === 'MULTIPLE_CHOICE' && (
                <CheckBoxGroup
                  options={questions[questionIdRef - 1]}
                  disabled={false}
                />
              )}
            {questions[questionIdRef - 1] &&
              questions[questionIdRef - 1].type ===
                'FILL_IN_THE_BLANK_BASIC' && (
                <FillInTheBlanks
                  options={questions[questionIdRef - 1]}
                  disabled={false}
                />
              )}
            {questions[questionIdRef - 1] &&
              questions[questionIdRef - 1].type ===
                'FILL_IN_THE_BLANK_DROPDOWN' && (
                <FillInTheSelect
                  options={questions[questionIdRef - 1]}
                  disabled={false}
                />
              )}
            {questions[questionIdRef - 1] &&
              questions[questionIdRef - 1].type ===
                'FILL_IN_THE_BLANK_DRAG' && (
                <DragAndDrop
                  options={questions[questionIdRef - 1]}
                  disabled={false}
                />
              )}
          </Grid>
        </Box>
      </Container>
      <footer className="page-footer pt-4 pb-5">
        <Container className="mb-4" maxWidth="sm">
          <Grid className="mx-0 d-flex btn-row justify-content-end">
            {questionIdRef > 1 && (
              <Button
                className="me-auto col btn-lg btn-outline-primary"
                variant="outlined"
                onClick={handlePrevClick}
              >
                {' '}
                Prev
              </Button>
            )}
            <Button
              variant="primary"
              className="mx-2 col btn-lg"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Grid>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default QuestionWrapper;
