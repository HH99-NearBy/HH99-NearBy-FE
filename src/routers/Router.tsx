import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RankingPage from "../pages/RankingPage";
import ChallengingPage from "../pages/ChallengingPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/challenging/:challengeId" element={<ChallengingPage />} />
    </Routes>
  );
}

export default Router;
