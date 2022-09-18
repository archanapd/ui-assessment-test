import * as React from 'react';
import { Container, Grid, Box, Button } from '@mui/material';
import '../Home/Home.scss';
import EmailIcon from '@mui/icons-material/Email';
import resultbgOne from 'assets/result-page-bg-1.svg';
import resultbgTwo from 'assets/result-page-bg-2.svg';
import resultbgMobile1 from 'assets/result-page-bg-mobile-1.svg';
import resultbgMobile2 from 'assets/result-page-bg-mobile-2.svg';
import Accordion from 'components/Accordion/Accordion';

export default function ResultsPage() {
  return (
    <div>
      <Box className='cakeapp-result-bg pb-5'>
        <div className='cakeapp-result-bg-box'>
          <img className='cakeapp-result-bg-img' src={resultbgOne} />
          <img className='cakeapp-result-bg-img bottom' src={resultbgTwo} />
          <img className='cakeapp-result-bg-img mobile-bg' src={resultbgMobile1} />
          <img className='cakeapp-result-bg-img mobile-bg bottom' src={resultbgMobile2} />
        </div>
        <Container className='cakeapp-result pt-5 mt-5' maxWidth="lg">
          <span className='cakeapp-result--name'>Hai, [Student Name]!</span>
          <h2 className='cakeapp-result--subtitle mt-3'>Selamat, kamu telah menyelesaikan <br />[Custom_Assessment]!</h2>
          <div className='row mt-5'>
            <aside className='col-lg-3 cakeapp-result--aside'>
              <div className='cakeapp-result--result d-flex flex-column align-items-center mb-3'>
                <span>Skor Kamu</span>
                <span className='result-value mt-3'>81<small>/100</small></span>
              </div>
              <span className='spn-result-name mb-2'>Hasil Kamu</span>
              <span className='result--aside-status status-intermediate'>Intermediate</span>
              <div className='result-aside-email mt-4 d-flex'>
                <EmailIcon />
                <span className='ps-2'>
                  Hasil tesmu telah dikirim ke
                  <a href="mailto:testemailstudent@gmail.com">[testemailstudent@gmail.com]</a>
                </span>
              </div>
            </aside>
            <div className='col-lg-9'>
              <div className='result-right-box p-4 mb-3'>
                <h3 className='my-4 txt-green'>Penjelasan Tentang Hasilmu</h3>
                <span className='result-right-status mb-1'>Intermediate</span>
                <span className='result-right-score mb-1'>Skor 10-49</span>
                <div className='result-right-improve'>
                  <strong>What You Should Improve :</strong>
                  <ul>
                    <li>You should be able to understand the simplest sentence structures.</li>
                    <li>You also need to be able to comprehend simple written expressions.</li>
                  </ul>
                  <Button className="result-right-score-btn" variant="contained" fullWidth>Cek Paketnya Sekarang</Button>
                </div>
              </div>
              <div className='result-right-box p-4 mb-3'>
                <h3 className='my-4'>Kategori Hasil Lainnya</h3>
                <div className='result-right-accordion'>
                  <Accordion />
                  {/* <details>
                    <summary>Beginner</summary>
                    <p>Skor 0-9</p>
                  </details>
                  <details>
                    <summary>Intermediate</summary>
                    <p>Skor 10-49</p>
                  </details>
                  <details>
                    <summary>Advance</summary>
                    <p>Skor 50-100</p>
                  </details> */}
                </div>

              </div>
            </div>
          </div>
        </Container>
      </Box>
    </div>
  );
}

