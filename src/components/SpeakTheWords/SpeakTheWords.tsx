import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './SpeakTheWords.scss';
import VideoImg from 'assets/recording-img.gif';
import ReactHtmlParser from 'react-html-parser';

const SpeakTheWords = (props: any) => {
  const commands = [
    {
      command: 'reset',
      callback: () => resetTranscript()
    }
  ];
  let { transcript, interimTranscript, finalTranscript, resetTranscript, listening } =
    useSpeechRecognition({ commands });

  useEffect(() => {}, [interimTranscript, finalTranscript]);

  useEffect(() => {
    const question = props.options;
    question.answerGroupRef.map((answerGroup: any) => {
      if (question.answerGroups.length < question.answerGroupRef.length) {
        question.answerGroups.push({
          groupId: answerGroup,
          answers: [
            {
              content: '',
              groupId: answerGroup
            }
          ]
        });
      }
    });
    updateAnswers(props.options);
  }, [props]);

  const updateAnswers = (question: any) => {
    question.answerGroups.map((item: any) => {
      (document.getElementById('SPEECH_BASIC') as HTMLInputElement).innerHTML =
        item.answers[0].content;
      finalTranscript = item.answers[0].content;
    });
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      'Your browser does not support speech recognition software! Try Chrome desktop, maybe?'
    );
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB'
    });
  };

  const reset = () => {
    resetTranscript();
    (document.getElementById('SPEECH_BASIC') as HTMLInputElement).innerHTML = '';
  };
  return (
    <div>
      <div>
        <span>
          <strong>{ReactHtmlParser(props.options.content)}</strong>
        </span>
        <br></br>
        {props.showFullOptions && (
          <p>
            Click <strong>Record Now</strong> button and Speak Loud & Clear :)
          </p>
        )}
        <div className={props.showFullOptions ? 'rcd-block' : 'rcd-block-less-height'}>
          {listening ? (
            <div className="rcd-block--img">
              <img alt="" src={VideoImg} />
              <p>{transcript}</p>
            </div>
          ) : (
            <div>
              <p id="SPEECH_BASIC" className="final-transcript">
                {finalTranscript}
              </p>
            </div>
          )}
        </div>

        <div className="record-btn-block">
          <span className={listening ? 'ico-green-record' : 'off-record'}>
            {' '}
            <FiberManualRecordIcon />
            {listening ? 'Recording...' : 'off'}
          </span>

          {!listening && props.showFullOptions && (
            <button className="btn btn-primary btn-lg" type="button" onClick={listenContinuously}>
              Record Now
            </button>
          )}

          {listening && props.showFullOptions && (
            <button
              className="btn btn-outline-primary btn-outlined btn-lg"
              type="button"
              onClick={SpeechRecognition.stopListening}
            >
              Stop
            </button>
          )}

          {!listening && props.showFullOptions && (
            <button className="btn btn-primary btn-lg" type="button" onClick={reset}>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakTheWords;
