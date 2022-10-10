import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 // ::: Font Setting
  // :: Basic(400, 500) & English Font(400, 500, 700) import
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
  // :: Korean Font import
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  // :: English Font import
 
  :root {
    --bg-color: #F5ECE9;
    --purple-color: #6627f5;
    --focus-color: #343740;
    --text-color: #000000;
    --border-style: 2px solid #000000;
    --english-font: 'Roboto', sans-serif;
    --basic-font: 'Noto Sans KR', sans-serif;
  }
  
  * {
    font-family: var(--basic-font);
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    
  }
  
  // :: 로고 폰트 기본 세팅
  /* h1 {
    font-family: var(--english-font);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
  }
  // :: 제목 폰트 기본 세팅 : 한글 기준
  h2, h3, h4, h5 {
    font-family: var(--basic-font);
    font-weight: 700;
    font-size: 0.8rem;
  } */
  
  ul li, ol li {
    list-style: none;
  }
  .hidden {
    display: none !important;
  }

  .selected {
    color: #6627f5;
   border-bottom: 0.5rem solid #6627f5 !important;
  }
  .selected_icon {
    color: #6627f5 !important;
  }
  .selected_option {
    background-color: #6627f5;
    color: white;
  }
  .block_scroll {
    overflow-y: hidden !important;
  }
  .static_scroll {
    scroll-behavior: auto !important;
  }
  .toast_alert {
    font-size: 1.6rem;
  }
  @keyframes error {
        0% {
          border-color: transparent;
        }

        50% {
         border-color: red;
        }

        100% {
           border-color: transparent;
        }
      }
  .error_focus {
    border: 0.2rem solid red;
    animation: error 0.6s 2;
  }
  .Toastify__toast-container--top-right {
  top: 10rem;
  right: 1em;
}
  /* .video_container {
    width: 100%;
    height: 100%;
  } */

  #is_not_long {
    width: 128rem !important;
    position: relative !important;
  }
  .challengeCard {
    @keyframes mount {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
   animation: mount 500ms 1;
  }
`;

export default GlobalStyle;
