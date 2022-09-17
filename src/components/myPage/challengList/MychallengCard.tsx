import React from 'react'
import styled from 'styled-components'
import {BsFillPersonFill} from 'react-icons/bs'
import { BiCalendarCheck } from "react-icons/bi";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";

interface CardProps {
  id : string;
  title : string;
  day : string;
  date : string;
  time : string;
  people: string;
  image : string;
}

function MychallengCard({challeng,loading}:{challeng:Array<CardProps>;loading:boolean}) {



  if (loading) {
    return <h2>Loading</h2>
  }

  return (
    <>
      {challeng && challeng.map((challeng:any) => {
        return (
          <CardContianer key = {challeng.id}>
            <img src={challeng.image} alt="쓱-챌린지 썸네일 이미지"/>
            <CardContents>
              <div className='card_body'>
                <div className='header_info'>
                  <BsFillPersonFill/>"모집중 {challeng.people}/30"
                </div>
                <div className='body_info'>{challeng.title}</div>
                <div className='footer_info'>
                  <span className='start_date'>
                      <BiCalendarCheck/>
                      {challeng.day}
                  </span>
                  <span className='start_time'>
                      <IoMdAlarm/>
                      {challeng.date}
                  </span>
                  <span className='running_time'>
                      <MdOutlineTimer/>
                      {challeng.time}
                  </span>
                </div>
              </div>
              <button
              className='modal_open_btn'>
                입장하기
              </button>
            </CardContents>
        </CardContianer>
        )
      })}
    </>
  )
}

export default MychallengCard

const CardContianer = styled.div`
         width: 61.1rem;
          height: 21.1rem;
          flex-direction: row;
          display: flex;
          margin: 2rem 1rem;
         box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          img {
            width: 21.1rem;
            height: 21.1rem;
            background-color: red;
          }
          .modal_open_btn {
            background-color: #ffa115;
          }
        `;

const CardContents= styled.div`
   width: 40rem;
  height: 21.1rem;
  background-color: #fff;
  .card_body {
    display: flex;
    flex-direction: column;
    width: 40rem;
    height: 16.1rem;
    padding: 0 1rem;
    .header_info {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      height: 3.5rem;
      color: #323232;
      svg {
        margin-right: 0.5rem;
      }
    }
    .body_info {
      flex-grow: 1;
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: 0.2rem;
    }
    .footer_info {
      display: flex;
      font-size: 1.6rem;
      height: 3rem;
      color: #323232;
      span {
        display: flex;
        align-items: center;
        padding-right: 1.5rem;
        svg {
          margin-right: 0.5rem;
        }
      }
    }
  }
  button {
    width: 40rem;
    height: 5rem;
    background-color: var(--purple-color);
    color: #fff;
    border: none;
    font-size: 2rem;
    letter-spacing: 0.1rem;
    cursor: pointer;
  }
`