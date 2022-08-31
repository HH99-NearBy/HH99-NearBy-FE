import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GlobalStyle from "./global/GlobalStyle";
import Router from "./routers/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
