import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Games from './components/Games';
import Franchises from './components/Franchises';
import VideoFiles from './components/VideoFiles';
import HardDrives from './components/HardDrives';
import Home from './components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FranchisePage from './components/FranchisePage';

const theme = createTheme({
  // your theme options
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/franchises" element={<Franchises />} />
          <Route path="/video-files" element={<VideoFiles />} />
          <Route path="/hard-drives" element={<HardDrives />} />
          <Route path="/data" element={<FranchisePage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </Router>
    </ThemeProvider>
  );
}

export default App;
