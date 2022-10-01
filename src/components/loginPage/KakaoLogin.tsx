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
  console.log(code);

  useEffect(() => {
    const login = async () => {
      const res: any | undefined = await apis.kakaoLogin(code);
      console.log(res);
      const aar: boolean | undefined = res.data?.logincheck;
      console.log(res);
      if (aar === true) {
        setIsLogin(true);
        const { data, headers } = res;
        console.log(res);
        console.log(data);
        console.log(data.data);
        sessionStorage.setItem("accessToken", headers.authorization);
        sessionStorage?.setItem("userName", data.data.nickname);
        sessionStorage?.setItem("userLevel", data.data.level);
        sessionStorage?.setItem("userProfile", data.data.profileImg);
        sessionStorage.setItem("userTime", data.data.totalTime);
        navigate("/");
      }
      if (aar === false) {
        setIsLogin(false);
        console.log(res);
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
        <div>loading..</div>
      ) : (
        <KakaoForm kakaoId={kakaoId} profileImg={profileImg} />
      )}
    </div>
  );
}

export default KakaoLogin;
