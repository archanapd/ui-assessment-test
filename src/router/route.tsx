import Home from 'components/Home/Home';
import QuestionWrapper from 'components/shared/QuestionWrapper';
import SubmitWrapper from 'components/shared/SubmitWrapper';
import PreviewWrapper from 'components/shared/PreviewWrapper';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from 'components/shared/PageNotFound';

const AppRouter = (props: any) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/ui-cakap-student" element={<Home />} />
        <Route path="/questions/:questionId" element={<QuestionWrapper />} />
        <Route path="/submit" element={<SubmitWrapper />} />
        <Route path="/preview/:questionId" element={<PreviewWrapper />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
