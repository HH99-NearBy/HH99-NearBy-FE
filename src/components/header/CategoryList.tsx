import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosTrophy } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function CategoryList() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const categorylist = useRef(["쓱관왕", "이용방법"]);

  const [activateIdx, setActivateIdx] = useState<number>(-1);
  const handleClickCategory = (e: React.MouseEvent<HTMLLIElement>): void => {
    const targetIdx = categorylist.current.indexOf(e.currentTarget.innerText);
    setActivateIdx(targetIdx);
    if (targetIdx === 0) {
      navigate("/ranking");
    }else if (targetIdx === 1){
      navigate("/info")
    }
  };
  useEffect(() => {
    if (pathname !== "/ranking" && pathname !== "/info") {
      setActivateIdx(-1);
    }
  }, [pathname]);
  return (
    <>
      <StListContainer>
        {categorylist.current.map((category, idx) => {
          return (
            <li
              key={`${idx}.${category}`}
              className={idx === activateIdx ? "selected" : undefined}
              onClick={handleClickCategory}
            >
              <span>{category}</span>

              {idx === 0 ? (
                idx === activateIdx ? (
                  <IoIosTrophy className="selected_icon" />
                ) : (
                  <IoIosTrophy />
                )
              ) : (
                <RiErrorWarningFill />
              )}
            </li>
          );
        })}
      </StListContainer>
      {}
    </>
  );
}

const StListContainer = styled.ul`
  width: 33rem;
  height: 10rem;
  /* background-color: green; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 0.2rem;
  margin-left: 5rem;
  li {
    height: 100%;
    flex-grow: 1;
    margin: 0 2rem;
    font-size: 2.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 0.5rem solid #fff;
    span {
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: baseline;
    }
    svg {
      margin-left: 0.5rem;
      width: 3rem;
      height: 3rem;
    }
    :hover {
      color: var(--purple-color);
    }
  }
`;

export default CategoryList;
