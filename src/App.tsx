import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/JobList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
      </Routes>
    </Router>
  );
};

export default App;
