import React,{useEffect,useRef,useState} from "react";
import InfoWrapper from "../components/myPage/infoSection/InfoWrapper";
import DoneListContainer from "../components/myPage/doneList/DoneListContainer";
import MychallengContainer from "../components/myPage/challengList/MychallengContainer";

function MyPage() {
const [scroll, setScroll] = useState<boolean>(false)
 


    return (
        <>
        <InfoWrapper/>
        <MychallengContainer/>
        <DoneListContainer/>
        </>
    )
}

export default MyPage;
