import React from "react";
import GlobalStyle from "./global/GlobalStyle";
import Routers from "./routers/Routers";
import RegisterForm from "./components/registerPage/RegisterForm";
import LoginForm from "./components/loginPage/LoginForm";


function App() {
  return (
    <>
      <Routers/>
      <GlobalStyle />
      <RegisterForm/>
      {/* <LoginForm/> */}

    </>
  );
}

export default App;
