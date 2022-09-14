import React, { useReducer } from "react";
import GlobalStyle from "./global/GlobalStyle";
import { QueryClientProvider, QueryClient } from "react-query";
import Router from "./routers/Router";
import Header from "./global/Header";
import { ContextProvider } from "../src/api/context/index";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <GlobalStyle />
        <Header />
        <Router />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
