import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FileSystemComparison from './components/FileSystemComparison';
import JournalingAnalysis from './components/JournalingAnalysis';
import ReadOnlyAnalysis from './components/ReadOnlyAnalysis';
import ForensicsPanel from './components/ForensicsPanel';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/comparison" element={<FileSystemComparison />} />
        <Route path="/journaling" element={<JournalingAnalysis />} />
        <Route path="/readonly" element={<ReadOnlyAnalysis />} />
        <Route path="/forensics" element={<ForensicsPanel />} />
      </Routes>
    </Router>
  );
};

export default App;