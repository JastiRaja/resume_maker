import { Routes, Route } from 'react-router-dom';
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
        <Route path="/cover-letter" element={<CoverLetterBuilder />} />
        <Route path="/:pageId" element={<StaticPage />} />
      </Routes>
    </div>
  );
}

export default App;