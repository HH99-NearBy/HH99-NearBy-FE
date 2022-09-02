import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosTrophy } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";
import { IconContext } from "react-icons";

function CategoryList() {
  const categorylist = useRef(["랭킹", "이용방법"]);
  const [activateIdx, setActivateIdx] = useState<number>(0);
  const handleClickCategory = (e: React.MouseEvent<HTMLLIElement>): void => {
    console.log(e.currentTarget);
    const targetIdx = categorylist.current.indexOf(e.currentTarget.innerText);
    setActivateIdx(targetIdx);
    console.log(targetIdx);
  };
  return (
    <StListContainer>
      {categorylist.current.map((category, idx) => {
        return (
          <li
            key={`${idx}.${category}`}
            className={idx === activateIdx ? "selected" : undefined}
            onClick={handleClickCategory}
          >
            {category}
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
  );
}

const StListContainer = styled.ul`
  width: 30rem;
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
    svg {
      width: 3rem;
      height: 3rem;
    }
    :hover {
      color: var(--purple-color);
    }
  }
`;

export default CategoryList;
