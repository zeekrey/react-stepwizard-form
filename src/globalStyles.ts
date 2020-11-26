import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  h1 {
    text-align:center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }
`;

export { GlobalStyles };
