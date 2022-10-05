import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RankingPage from "../pages/RankingPage";
import ChallengingPage from "../pages/ChallengingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import KakaoForm from "../components/loginPage/KakaoForm";
import MyPage from "../pages/MyPage";
import InformationPage from "../pages/InformationPage";
import EditContainer from "../components/editPage/EditContainer";
import PostingPage from "../pages/PostingPage";
import SearchPage from "../pages/SearchPage";
import PathErrorPage from "../pages/PathErrorPage";
import KakaoLogin from "../components/loginPage/KakaoLogin";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/challenging/:challengeId" element={<ChallengingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/api/kakaologin" element={<KakaoLogin />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/info" element={<InformationPage />} />
      <Route path="/edit" element={<EditContainer />} />
      <Route path="/posting" element={<PostingPage />} />
      <Route path="/modify/:challengeId" element={<PostingPage />} />
      <Route path="/search/:searchParam" element={<SearchPage />} />
      <Route path="/*" element={<PathErrorPage />} />
    </Routes>
  );
}

export default Router;
