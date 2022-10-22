import React from 'react';
import { Container, Box, AppBar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../../App.scss';
import bgImg from 'assets/student-logo.svg';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function StudentDashboard(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box className='dashboard-bg'>
        <img alt="" className="dashboard-bg-img" src={bgImg} />
      <Container maxWidth="lg">
        <Box
          className="page-not-found d-flex align-items-center flex-column py-5 justify-content-center"
          sx={{ minHeight: '100vh' }}
        >
           
          <div className='text-center'>
            <h2 className="mb-3 pt-5">Student Dashboard <span></span></h2>
            <p>Placement Test</p>

            
            {/* Emoji Popup starts */}
            <div className='emoji-box'>
              <span className='ico-emoji'>😀</span>
              <ul className='emoji-list'>
                <li>😀</li>
                <li>😁</li>
                <li>😂</li>
                <li>😃</li>
                <li>😄</li>
                <li>😅</li>
                <li>😆</li>
                <li>😇</li>
                <li>😈</li>
                <li>😉</li>
                <li>😊</li>
                <li>😋</li>
              </ul>
            </div>

            {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            <EmojiEmotionsIcon />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <div className='p-2 d-flex flex-wrap emoji-box'>
                <Button variant="text" >😀</Button>
                <Button variant="text" >😁</Button>
                <Button variant="text" >😂</Button>
                <Button variant="text" >😃</Button>
                <Button variant="text" >😄</Button>
                <Button variant="text" >😅</Button>
                <Button variant="text" >😆</Button>
                <Button variant="text" >😇</Button>
                <Button variant="text" >😈</Button>
                <Button variant="text" >😉</Button>
                <Button variant="text" >😊</Button>
                <Button variant="text" >😋</Button>                
              </div>
            </Popover> */}
            {/* Emoji Popup ends */}


          </div>
        </Box>
      </Container>
    </Box>
  );
}
