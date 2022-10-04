import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import KakaoForm from "./KakaoForm";
import apis from "../../api/api";

const REST_API_KEY = "06bbace6fde025ff72772cc94cc52876";
const REDIRECT_URI = "https://ssggwan.shop/api/kakaologin";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

interface dataProps {
  kakaoId: number;
  profileImg: string;
}

interface KakaoProps {
  logincheck: boolean;
  msg: string;
  data: any;
}

function KakaoLogin() {
  const navigate = useNavigate();

  const [challeng, setChalleng] = useState<any>();
  const [islogin, setIsLogin] = useState<boolean>(true);

  const code: any = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const login = async () => {
      const res: any | undefined = await apis.kakaoLogin(code);

      const aar: boolean | undefined = res.data?.logincheck;

      if (aar === true) {
        setIsLogin(true);
        const { data, headers } = res;
        sessionStorage.setItem("accessToken", headers.authorization);
        sessionStorage?.setItem("userName", data.data.nickname);
        sessionStorage?.setItem("userLevel", data.data.level);
        sessionStorage?.setItem("userProfile", data.data.profileImg);
        sessionStorage.setItem("userTime", data.data.totalTime);
        sessionStorage.setItem("remainTime", data.data.remainingTime);
        navigate("/");
      }
      if (aar === false) {
        setIsLogin(false);
        setChalleng(res);

        // navigate("/kakaoform")
      }
    };
    login();
  }, []);
  const kakaoId = challeng?.data.data.kakaoId;
  const profileImg = challeng?.data.data.profileImg;

  return (
    <div>
      {islogin ? (
        <div></div>
      ) : (
        <KakaoForm kakaoId={kakaoId} profileImg={profileImg} />
      )}
    </div>
  );
}

export default KakaoLogin;
