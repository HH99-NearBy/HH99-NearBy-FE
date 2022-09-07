import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

function CategoryList() {
  const categorylist = useRef(["홈", "랭킹", "이용방법"]);
  const [activateIdx, setActivateIdx] = useState<number>(0);

  const handleClickCategory = (e: React.MouseEvent<HTMLLIElement>): void => {
    const targetIdx = categorylist.current.indexOf(e.currentTarget.innerHTML);
    setActivateIdx(targetIdx);
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
          </li>
        );
      })}
    </StListContainer>
  );
}

const StListContainer = styled.ul`
  width: 40rem;
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
    margin: 0 0.7rem;
    flex-grow: 1;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 1rem;
    border-bottom: 0.5rem solid #fff;
    :hover {
      color: red;
    }
  }
`;

export default CategoryList;
