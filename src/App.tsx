import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const App = () => {
  return <ThemeProvider theme={theme}>111</ThemeProvider>;
};

export default App;
