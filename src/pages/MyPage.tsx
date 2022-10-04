import React,{useEffect,useRef,useState} from "react";
import InfoWrapper from "../components/myPage/infoSection/InfoWrapper";
import DoneListContainer from "../components/myPage/doneList/DoneListContainer";
import MychallengContainer from "../components/myPage/challengList/MychallengContainer";
import styled from "styled-components";

function MyPage() {
const [scroll, setScroll] = useState<boolean>(false)
 


    return (
        <BackDiv>
        <InfoWrapper/>
        <MychallengContainer/>
        <DoneListContainer/>
        </BackDiv>
    )
}

export default MyPage;

const BackDiv = styled.div`
  background-color: rgb(245, 245, 245);
`