import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  body {
    background: ${(props) => props.theme["app-bg"]};
    color: ${(props) => props.theme["gray-300"]};
    -webkit-font-smoothing: antialiased;

  }

  body, input, textarea, button {
    font-family: 'Roboto';
    font-size: 1rem;
    font-weight: 400;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #868686;
    border-radius: 4px;
  }
`;
