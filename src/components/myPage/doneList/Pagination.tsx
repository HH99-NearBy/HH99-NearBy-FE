import React, {useState,useEffect} from 'react'
import styled from 'styled-components';



function Pagination({Limit,totalDone,paginate}:{Limit:number;totalDone:number;paginate:any}) {

  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalDone / Limit); i ++) {
    pageNumbers.push(i)
  }


 

  return (    
    <div>
      <StUl>
        {pageNumbers.map(number => (
          <StLi key={number} onClick={() =>  paginate(number) }>
            <span>
              {number}
            </span>
          </StLi>
        ))}
      </StUl>
    </div>
  )
}


export default Pagination

const StUl = styled.ul`
    display: flex;
    margin-top: 50px;
    margin-bottom: 50px;
    justify-content: center;
`

const StLi = styled.li`
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
`