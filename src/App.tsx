import React from "react";
import GlobalStyle from "./global/GlobalStyle";
import { QueryClientProvider, QueryClient } from "react-query";
import Router from "./routers/Router";
import Header from "./global/Header";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Header />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
