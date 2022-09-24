import Home from 'components/Home/Home';
import QuestionWrapper from 'components/shared/QuestionWrapper';
import SubmitWrapper from 'components/shared/SubmitWrapper';
import PreviewWrapper from 'components/shared/PreviewWrapper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from 'components/shared/PageNotFound';
import PdfViewer from 'components/shared/PdfViewer';
import ResultsPage from 'components/shared/ResultsPage';
import Register from 'components/shared/Register';
import StudentDashboard from 'components/shared/StudentDashboard';

const AppRouter = (props: any) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/ui-cakap-student" element={<Home />} />
        <Route path="/questions/:questionId" element={<QuestionWrapper />} />
        <Route path="/submit" element={<SubmitWrapper />} />
        <Route path="/preview/:questionId" element={<PreviewWrapper />} />
        <Route path="/pdf" element={<PdfViewer />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
