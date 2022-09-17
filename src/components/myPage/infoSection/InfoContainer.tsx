import React from 'react'
import styled from 'styled-components'
import {BsPersonFill} from 'react-icons/bs'
import {BsFillTrophyFill} from 'react-icons/bs'
import {BsCameraVideoFill} from 'react-icons/bs'
import {BsFillMicFill} from 'react-icons/bs'
import {FaMedal} from 'react-icons/fa'

function InfoContainer() {
  return (
    <InfomationContainer>
        <TitleBox>
        이용방법
        <div> ! </div>
        </TitleBox>
        <ContentBox>
            <div className='Title_Box2'>
                안녕하세요 쓱- 만드는 습관, <strong>쓱-관</strong> 입니다!
            </div>
            <div>
                쓱-관은 실시간 화상 시스템을 기반으로 한 합동 챌린징 프로그램으로 짧은시간 스프린트식으로 달리는 챌린지 위주 구성(~2/3일 이내)으로 함께 주어진<br/>
                챌린지 목표를 향해 달려나가는 방식입니다. 화상시스템 기반으로 참여도를 확인하는 동시에 서로의 지식을 공유하여 협동할 수 있다는 점이 장점이며,<br/>
                순위 제도를 운영하여 유저들의 적극적인 챌린지 참여를 유도하고 있습니다. <br/>
            </div>
        </ContentBox>
        <DetailBox>
            <div className='login'>
                <div className='login_number'>
                    1
                </div>
                <hr className='hr1'/>
                <div className='person'>
                <BsPersonFill/>
                </div>
                <div className='login_advice'>
                    로그인 해주세요!
                </div>
                <hr className='hr2'/>
                <div className='login_explan'>
                    챌린지를 만드시거나 참여하시려면 로그인을 하셔야합니다!
                </div>
            </div>
            <div className='rules'>
                <div className='rules_number'>
                    2
                </div>
                <hr className='hr3'/>
                <div className='trophy'>
                    <BsFillTrophyFill/>
                </div>
                <div className='rules_advice'>
                    챌린지 규칙!
                </div>
                <hr className='hr4'/>
                <div className='rules_explan'>
                    챌린지는 가능한 웹캠<BsCameraVideoFill/> 
                    과 마이크<BsFillMicFill/>
                    가 필요한 주제로 정해주세요 :) (선택사항)
                </div>
            </div>
            <div className='level'>
                <div className='level_number'>
                    3
                </div>
                <hr className='hr5'/>
                <div className='medal'>
                    <FaMedal/>
                </div>
                <div className='level_advice'>
                    레벨 업!
                </div>
                <hr className='hr6'/>
                <div className='level_explan'>
                    1분당 점수는 10점, 10분당 점수 100점, 총 700점이 누적되면 1Lv씩 레벨 업!
                </div>
            </div>
        </DetailBox>
    </InfomationContainer>
  )
}

export default InfoContainer

const InfomationContainer = styled.div`
    width: 130rem;
    margin: 0 auto;
`

const TitleBox = styled.div`
    width: 20rem;
    font-size: xx-large;
    font-weight: bold;
    margin: 4rem 0;
    flex-direction: row;
    display: flex;
    div {
        color: white;
        width: 4rem;
        justify-content: center;
        display: flex;
        border-radius: 2rem;
        margin: 0 1rem;
    }
`

const ContentBox = styled.div`
    .Title_Box2 {
        border: 1px solid whitesmoke;
        font-size: large;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        width: 35rem;
        margin: 2rem 0;
        strong {
            color: #6627F5 ;
        }
    }
    div {
        font-size: initial;
    }
`
const DetailBox = styled.div`
    .login{
        margin: 4rem 0;
        display: flex;
        flex-direction: row;
        .login_number{
            border: 1px solid #6627F5;
            width: 5rem;
            height: 5rem;
            background-color: #6627F5;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: large;
            border-radius: 3rem;
            position: relative;
            top: 7rem;
            
        }
        .hr1 {
            border:none;
            border-top: 2px dotted #6627F5;
            color: #fff;
            background-color: #fff;
            height: 1px;
            width: 7rem;
            position: relative;
            top: 9.5rem;
        }
        .person {
            border: 2px solid black;
            width: 20rem;
            height: 19rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            svg{
                width: 20rem;
                height: 9rem;
            }
        }
        .login_advice {
            background-color: #6627F5;
            color: white;
            font-size: initial;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1rem 1rem 1rem 0;
            height: 3rem;
            width: 17rem;
            position: relative;
            top: 2rem;
            right: 6rem;
        }
        .hr2 {
            border:none;
            border-top: 2px dotted #6627F5;
            color: #fff;
            background-color: #fff;
            height: 1px;
            width: 15rem;
            position: relative;
            top: 9.5rem;
            right: 17rem;
        }
        .login_explan {
            border: 2px solid whitesmoke;
            width: 66rem;
            position: relative;
            right: 17rem;
            font-size: large;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }
    .rules{
        margin: 4rem 0;
        display: flex;
        flex-direction: row;
        .rules_number {
            border: 1px solid #6627F5;
            width: 5rem;
            height: 5rem;
            background-color: #6627F5;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: large;
            border-radius: 3rem;
            position: relative;
            top: 7rem;
        }
        .hr3 {
            border:none;
            border-top: 2px dotted #6627F5;
            color: #fff;
            background-color: #fff;
            height: 1px;
            width: 7rem;
            position: relative;
            top: 9.5rem;
        }
        .trophy {
            border: 2px solid black;
            width: 20rem;
            height: 19rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            svg{
                width: 20rem;
                height: 9rem;
            }
        }
        .rules_advice{
            background-color: #6627F5;
            color: white;
            font-size: initial;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1rem 0 1rem 1rem;
            height: 3rem;
            width: 17rem;
            position: relative;
            top: 15rem;
            right: 30rem;
        }
        .hr4 {
            border:none;
            border-top: 2px dotted #6627F5;
            color: #fff;
            background-color: #fff;
            height: 1px;
            width: 15rem;
            position: relative;
            top: 9.5rem;
            right: 17rem;
        }
        .rules_explan {
            border: 2px solid whitesmoke;
            width: 66rem;
            position: relative;
            right: 17rem;
            font-size: large;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            svg {
                margin: 0 5px;
            }
        }
    }
    .level {
        margin: 4rem 0;
        display: flex;
        flex-direction: row;
        .level_number {
            border: 1px solid #6627F5;
            width: 5rem;
            height: 5rem;
            background-color: #6627F5;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: large;
            border-radius: 3rem;
            position: relative;
            top: 7rem;
        }
        .hr5{
            border:none;
            border-top: 2px dotted #6627F5;
            color: #fff;
            background-color: #fff;
            height: 1px;
            width: 7rem;
            position: relative;
            top: 9.5rem;
        }
        .medal{
            border: 2px solid black;
            width: 20rem;
            height: 19rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            svg{
                width: 20rem;
                height: 9rem;
            }
        }
        .level_advice {
            background-color: #6627F5;
            color: white;
            font-size: initial;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1rem 1rem 1rem 0;
            height: 3rem;
            width: 11rem;
            position: relative;
            top: 1rem;
            right: 5rem;
        }
        .hr6 {
            border:none;
            border-top: 2px dotted #6627F5;
            color: #fff;
            background-color: #fff;
            height: 1px;
            width: 15rem;
            position: relative;
            top: 9.5rem;
            right: 11rem;
        }
        .level_explan{
            border: 2px solid whitesmoke;
            width: 66rem;
            position: relative;
            right: 11rem;
            font-size: large;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
    }
`