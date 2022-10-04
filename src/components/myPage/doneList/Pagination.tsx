import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Pagination({
  done,
  paginate,
  page,
}: {
  done: any;
  paginate: any;
  page: any;
}) {
  const pageNumbers = [];

  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <StUl>
        {pageNumbers.map((number, i) => (
          <StLi key={i} onClick={() => paginate(number)}>
            <span>{number}</span>
          </StLi>
        ))}
      </StUl>
    </div>
  );
}

export default Pagination;

const StUl = styled.ul`
  display: flex;
  justify-content: center;
  padding: 5rem 0;
`;

const StLi = styled.li`
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  display: block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: medium;
  &:hover {
    color: #6627f5;
  }
  .span {
    color: gray;
  }
  .span:focus {
    color: black;
  }
`;
