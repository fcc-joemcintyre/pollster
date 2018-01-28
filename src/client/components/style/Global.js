import { injectGlobal } from 'styled-components';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 1.2;
    min-width: 304px;
    margin: 0;
    padding: 0 8px 0 8px;
  }

  input, select {
    font-size: 16px;
  }
`;
