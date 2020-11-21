import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Toggler } from './wizard';
import styled from 'styled-components';

interface AppProps {}

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  background-color: #282c34;
  place-content: center;
`;

function App({}: AppProps) {
  return (
    <Container>
      <Toggler />
    </Container>
  );
}

export default App;
