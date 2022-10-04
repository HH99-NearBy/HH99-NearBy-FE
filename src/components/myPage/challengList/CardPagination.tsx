import React from 'react'
import styled from 'styled-components'

function CardPagination({totalCard,paginate,page}:{totalCard:any;paginate:any;page:any;}) {

  const pageNumbers= [];

  for(let i=1; i <= page; i++) {
    pageNumbers.push(i)
  }
  

  return (
    <div>
      <StUl >
        {pageNumbers.map(number => (
          <StLi key = {number} onClick = {() => paginate(number)}>
            <StSpan >
              {number}
            </StSpan>
          </StLi>
        ))}
      </StUl>
    </div>
  )
}

export default CardPagination

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
    font-size: medium;
   
 
`
const StSpan =styled.a`
  color: black;
  &:active{
    color: black;
  }
  &:hover{
      color: #6627F5;
  }
`