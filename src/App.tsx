import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Toggler } from './wizard';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles';

interface AppProps {}

const theme: DefaultTheme = {
  colors: {
    dark: '#000000',
    light: '#FFFFFF',
    primary: '#AFDBD2',
    secondary: '#36313D',
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  background: linear-gradient(90deg, #ff6e7f 0%, #bfe9ff 100%);
  place-content: center;
`;

function App({}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Toggler />
      </Container>
    </ThemeProvider>
  );
}

export default App;
