import React, { useState, useRef } from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactPlayer from 'react-player';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

import './VideoPlayer.scss';
import PlayerControls from './PlayerControls';

const useStyles: any = makeStyles({
  playerWrapper: {
    width: '100%',
    position: 'relative'
  },
  vdoPlyBtn: {
    fontSize: '72px',
    background: '#00ADC6',
    borderRadius: '16px',
    cursor: 'pointer'
  }
});

const format = (seconds: any) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export default function VideoPlayer(props: any) {
  const { url } = props;
  const classes = useStyles();

  const playerRef: any = useRef(null);

  const [state, setState] = useState({
    playing: false,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    duration: 0,
    seeking: false
  });
  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const handleVideoStart = () => {
    setState({ ...state, playing: true });
  };

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewdind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleProgress = (changeState: any) => {
    if (!seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e: any, newValue: any) => {
    setState({ ...state, played: Number(newValue / 100) });
  };

  const handleSeekMouseDown = () => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e: any, newValue: any) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(Number(newValue / 100));
  };

  const handleVolumeChange = (e: any, newValue: any) => {
    setState({
      ...state,
      volume: Number(newValue / 100),
      muted: newValue === 0 ? true : false
    });
  };

  const handleVolumeSeekUp = (e: any, newValue: any) => {
    setState({
      ...state,
      volume: Number(newValue / 100),
      muted: newValue === 0 ? true : false
    });
  };

  const handlePlaybackRate = (rate: any) => {
    setState({ ...state, playbackRate: rate });
  };

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);
  return (
    <React.Fragment>
      <Container className='chk-opt-pl-0' style={{ position: 'relative' }}>
        <div className={'cake-vdo-row ' + classes.playerWrapper}>
          {!playing && (
            <div className="vdo-player-wrapper" onClick={handleVideoStart}>
              <PlayCircleFilledRoundedIcon className={classes.vdoPlyBtn} />
            </div>
          )}
          <ReactPlayer
            ref={playerRef}
            width={'100%'}
            height={'100%'}
            url={url}
            muted={muted}
            playing={playing}
            volume={volume}
            playbackRate={playbackRate}
            onProgress={handleProgress}
          ></ReactPlayer>
          <PlayerControls
            onPlayPause={handlePlayPause}
            playing={playing}
            muted={muted}
            onRewind={handleRewdind}
            onForward={handleForward}
            onMute={handleMute}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekUp={handleVolumeSeekUp}
            volume={volume}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
