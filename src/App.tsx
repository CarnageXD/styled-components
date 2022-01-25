import React from 'react';
import { Box, styled, ThemeProvider } from '@mui/material';
import theme from './theme';
import { grey } from '@mui/material/colors';
import ShoppingCart from './components/ShoppingCart';

const Background = styled(Box)(() => ({
  backgroundColor: grey[100],
  paddingTop: 100,
  height: 'calc(100vh-118px)',
}));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Background>
        <ShoppingCart />
      </Background>
    </ThemeProvider>
  );
};

export default App;
