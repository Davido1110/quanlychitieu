import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import ChatInterface from './components/ChatInterface';
import ExpenseReport from './components/ExpenseReport';
import Navigation from './components/Navigation';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="sm">
          <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            py: 4,
            pb: 8 // Add padding bottom for navigation
          }}>
            <Routes>
              <Route path="/" element={<ChatInterface />} />
              <Route path="/report" element={<ExpenseReport />} />
            </Routes>
          </Box>
          <Navigation />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
