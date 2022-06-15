import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: linear-gradient(180deg, #827397, #A85CF9);
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: white;
  }

  .number {
    color: white;
    font-size: 2rem;
    margin: 0;
  }

  .question, #result {
    color: white;
    font-size: 1.5rem;
    margin: 0;
    padding-top: 9px;
  }

  h1 {
    color: white;
    background-image: linear-gradient(180deg, #A760FF, #5B4B8A);
    background-size: 100%;
    background-clip: text;
    --webkit-background-clip: text;
    --webkit-text-fill-color: transparent;
    --moz-background-clip: text;
    --moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #CA82FF);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  .start, #submit {
    cursor: pointer;
    color: white;
    background: linear-gradient(180deg, #6A67CE, #947EC3);
    border-color: #6A67CE;
  }

  .start {
    padding: 12px;
  }

  #submit {
    margin-left: 5px;
    padding: 6px;
  }

  #text, #submit {
    margin-top: 15px;
  }


`; 