import React from 'react';
import { Button, Typography, Grid, IconButton, Slider, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
// import FullScreenIcon from '@material-ui/icons/Fullscreen';

const useStyles: any = makeStyles({
  playerWrapper: {
    width: '100%',
    position: 'relative'
  },
  controlsWrapper: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1
  },
  controlIcons: {
    color: '#000',
    fontSize: 50,
    transform: 'scale(0.9)',
    padding: '0',
    '&:hover': {
      color: '#000'
    }
  },
  bottomIcons: {
    color: '#000',
    '&:hover': {
      color: '#000',
      transform: 'scale(1)'
    }
  },
  volumeSlider: {
    width: 50,
    '@media (min-width: 992px)': {
      width: 100
    }
  }
});

const PrettoSlider = styled(Slider)({
  color: '#00ADC6',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
});

export default function PlayerControls({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  muted,
  onMute,
  onVolumeChange,
  onVolumeSeekUp,
  volume,
  playbackRate,
  onPlaybackRateChange,
  played,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  elapsedTime,
  totalDuration,
  onVideoStart
}: any) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handlePopOver = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'playbackrate-popover' : undefined;

  return (
    <div className={classes.controlsWrapper}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="vdo-box"
      >
        <Grid item xs={12} className="vdo-control-block">
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
            className="cake-vdo-rail"
          ></PrettoSlider>
        </Grid>

        <Grid item>
          <Grid container alignItems="center" direction="row" className="cake-vdo-controls-box">
            <IconButton className={classes.bottomIcons} onClick={onPlayPause}>
              {playing ? <PauseRoundedIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={onRewind} className={classes.controlIcons}>
              <Replay10Icon />
            </IconButton>
            <IconButton onClick={onForward} className={classes.controlIcons}>
              <Forward10Icon />
            </IconButton>
            <IconButton onClick={onMute} className={classes.bottomIcons}>
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            {!muted && (
              <Slider
                min={0}
                max={100}
                value={volume * 100}
                className={classes.volumeSlider}
                onChange={onVolumeChange}
                onChangeCommitted={onVolumeSeekUp}
              />
            )}
            <Button variant="text" style={{ color: 'black' }}>
              <Typography className="vdo-time-txt">
                {elapsedTime} / {totalDuration}
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid item className="vdo-pop-block">
          <Button
            onClick={handlePopOver}
            variant="text"
            style={{ color: 'black' }}
            className={classes.bottomIcons}
          >
            <Typography>{playbackRate}x</Typography>
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
          >
            <Grid container direction="column-reverse">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <Button onClick={() => onPlaybackRateChange(rate)} variant="text" key={rate}>
                  <Typography>{rate}</Typography>
                </Button>
              ))}
            </Grid>
          </Popover>

          {/* <IconButton className={classes.bottomIcons}>
            <FullScreenIcon />
          </IconButton> */}
        </Grid>
      </Grid>
    </div>
  );
}
