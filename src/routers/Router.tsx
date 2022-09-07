import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RankingPage from "../pages/RankingPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/ranking" element={<RankingPage />} />
    </Routes>
  );
}

export default Router;
