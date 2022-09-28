import React,{useEffect} from "react";
import InfoWrapper from "../components/myPage/infoSection/InfoWrapper";
import DoneListContainer from "../components/myPage/doneList/DoneListContainer";
import MychallengContainer from "../components/myPage/challengList/MychallengContainer";

function MyPage() {
    return (
        <>
        <InfoWrapper/>
        <MychallengContainer/>
        <DoneListContainer/>
        </>
    )
}

export default MyPage;
