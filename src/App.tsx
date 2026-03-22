import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import ResumeBuilder from './components/ResumeBuilder';
import CoverLetterBuilder from './components/CoverLetterBuilder';
import LandingPage from './components/LandingPage';
import StaticPage from './components/StaticPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/resume/edit" element={<ResumeBuilder />} />
        <Route path="/resume/preview" element={<ResumeBuilder />} />
        <Route path="/cover-letter" element={<CoverLetterBuilder />} />
        <Route path="/cover-letter/edit" element={<CoverLetterBuilder />} />
        <Route path="/cover-letter/preview" element={<CoverLetterBuilder />} />
        <Route path="/:pageId" element={<StaticPage />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;