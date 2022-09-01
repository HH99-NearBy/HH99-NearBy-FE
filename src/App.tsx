import React from "react";
import GlobalStyle from "./global/GlobalStyle";
import Router from "./routers/Router";
import Header from "./global/Header";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
    </>
  );
}

export default App;
