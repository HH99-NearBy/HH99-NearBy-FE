import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 // ::: Font Setting
  // :: Basic(400, 500) & English Font(400, 500, 700) import
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500&family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
  // :: Korean Font import
 
    @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    }
  // :: Basic Font import
  :root {
    --bg-color: #F5ECE9;
    --purple-color: #6627f5;
    --focus-color: #343740;
    --text-color: #000000;
    --border-style: 2px solid #000000;
    /* --english-font:'Ubuntu', sans-serif; */
    --basic-font: 'GmarketSansMedium', sans-serif;
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
    overflow-y: hidden;
  }
  .static_scroll {
    scroll-behavior: auto !important;
  }

  .video_container {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
