import React from "react";
import { BrowserRouter,Router, Route } from "react-router-dom";
import LoginForm from "../components/loginPage/LoginForm";

function Routers() {
  return (
   <BrowserRouter> 
    {/* <Router>
        <Route path="/" element ={<LoginForm/>} />
    </Router> */}
  </BrowserRouter> 
  )
}

export default Routers;
