import React,{useState, useCallback,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import AWS from 'aws-sdk'
import imageCompression from 'browser-image-compression'
import MAINLOGO from "../../static/main_logo.png";
import apis from '../../api/api'
import {useNavigate} from 'react-router-dom'
function EditContainer() {

    const navigate = useNavigate()
    const  Config = {
        bucketName : "ssggwan",
        region : "ap-northeast-2",
        accessKeyId : "AKIA5ZVQVLLYCZKG6U5P",
        secretAccessKey : "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"
      }
    
    
      const regin ="ap-northeast-2";
      const bucket ="ssggwan";
    
      AWS.config.update({
        region:regin,
        accessKeyId : "AKIA5ZVQVLLYCZKG6U5P",
        secretAccessKey : process.env.REACT_APP_AWS_KEY
      })

     
  const handleImageChange = async(e :React.ChangeEvent<HTMLInputElement>) => {

    const fileList = e.target.files
    if(fileList && fileList[0]) {
      const options:any = {
        maxSizeMb : 1,
        maxWidthOrHeight :300,
        useWebWorker: true,
      }
      const reImg = await imageCompression(fileList[0],options)
      setUpload(reImg)


        
    const upload = new AWS.S3.ManagedUpload({
      params : {
          Bucket : bucket,
          Key : reImg.name,
          Body :reImg
      }
    })

      const promise = upload.promise()

    promise.then(
      function(data) {
        alert("이미지 업로드에 성공했습니다.")
        setProfileImg(data.Location)
        setIsimg(true)
      },
      function (err) {
        return alert (err) 
      }
    )
    }
    
    
    }
   

    //닉네임,비밀번호,비밀번호 확인,이미지 url
    
    
    
    const [nickname, setNickname] = useState<string>('');
    const [profileImg,setProfileImg] = useState<string>('')
    const [upload,setUpload] = useState<File>()

    //오류메세지 상태저장
    const [NicknameMessage, setNicknameMessage] = useState<string>('');

    //유효성 검사
    const [isNickname, setIsNick] =  useState<boolean>(false)
    const [isImg, setIsimg] = useState<boolean>(false)
      
    //중복확인
    const [nickCheck,setNickCheck] = useState<boolean>(false)
    const [realCheck, setRealCheck] = useState<boolean>(false)
    


    //닉네임
    const onChangeNick = useCallback ((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setNickname(e.target.value)
          setNickCheck(false)
          if(e.target.value.length < 2 || e.target.value.length > 5){
            setNicknameMessage('2글자 이상 5글자 미만으로 입력해주세요.')
            setIsNick(false)
          }else{
            setNicknameMessage('올바른 닉네임 형식입니다.')
          setIsNick(true) 
        }
      },[])

      const NicknameCheck = useCallback(
        async (e : React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          if(nickname === sessionStorage.getItem("userName")){
            setNickCheck(true)
            setIsNick(true)
            setRealCheck(true)
              alert('가입 가능한 닉네임입니다.') 
              return
                }
          try {
            const response:any =await apis.userNicknameValidationCheck(nickname);
           
            if(response === undefined) {
              setNickCheck(false)
              setRealCheck(false)
             alert('중복된 닉네임 입니다.')  
            }else{
              setNickCheck(true)
              setIsNick(true)
              setRealCheck(true)
              alert('가입 가능한 닉네임 입니다.')
            }
            
          }catch (err) {
           

          }
        },[nickname])

        const onSubmit = useCallback(
            async (e:React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              try {
                const response = await apis.modifyMyInfo({nickname,profileImg})
                console.log(response)
                const {data, headers} = response;
                sessionStorage.setItem("accessToken", headers.authorization);
                  alert('프로필 수정 완료')
                  navigate('/mypage')
                
              }catch (err) {
                console.error(err)
              }
              console.log(profileImg)
            },[,nickname,profileImg])

            useEffect(() => {
              const userName = sessionStorage.getItem("userName")
              const userProfile = sessionStorage.getItem("userProfile")
              if(userName !== null)
              setNickname(userName)
              if(userProfile !== null)
              setProfileImg(userProfile)
            },[])

  return (
    <SignupContainer>
          <LogoBox>
            <img src={MAINLOGO}/>
          </LogoBox>
          <FormBox onSubmit={onSubmit}>
          <SignupBox>
          <ImgBox>
          <TitleBox>프로필 수정</TitleBox>
            <FileBox>
              <img src = {profileImg} />
              <label htmlFor = "input-file" >사진 등록하기</label>
             <input type="file" id="input-file" placeholder = "사진추가"  accept='image/*' onChange={handleImageChange}/> 
            </FileBox>
          </ImgBox>
          <TetxBox> 
            <TextP>닉네임</TextP>
          </TetxBox>
          <SignBox2> 
          <CheckBox>
              <div className='check_pr'>
                중복확인을 꼭 눌러주세요~
              </div>
              <div>
              <InputSt type="text" placeholder = '닉네임을 입력하세요' value={nickname} onChange={onChangeNick}/>
              <CheckBtn onClick={NicknameCheck}>중복확인</CheckBtn>
              {nickname?.length > 0 && <p className={`message ${isNickname ? 'success' : 'error'}`}>{NicknameMessage}</p>}
              </div>
          </CheckBox>
          </SignBox2>
          </SignupBox>
          <SubmitBtn>
          <input type ="submit"  value= "확인" disabled={!(isNickname  && nickCheck && realCheck)}/>
          </SubmitBtn>
        </FormBox>
    </SignupContainer>
  )
}

export default EditContainer

const SignupContainer = styled.div`
  width: 167rem;
    padding-top: 15rem;
    padding-right: 0rem;
    padding-bottom: 14rem;
    padding-left: 28rem;
    margin: 8rem auto;
  display: flex;
`
const TitleBox = styled.div`
  width: 160px;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;

`
const ImgBox = styled.div`
    float: left;
    width: 44rem;
    padding: 5rem;
    margin: 0 -5rem;
`

const FileBox = styled.div`
    display: inline-block;
    height: 30rem;
    width: 45rem;
    vertical-align: middle;
    border: 1px solid white;
    img {
      width: 36rem;
    }
    label {
      background-color: #6627F5;
      color: white;
      padding: 1rem 12.5rem;
      position: relative;
      font-size: large;
      font-weight: bold;
      cursor: pointer;
    }
    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      margin: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
`

const CheckBox = styled.div`
    position: relative;
    right: 10rem;
  p{
    font-size: small;
    margin: -10px auto;
    position: relative;
    bottom: 14rem;
    &.success {
      color: green;
    }
    &.error {
      color : red;
    }
  }
  .check_pr {
    font-size: large;
    position: relative;
    top: 14rem;
  }
`

const InputSt = styled.input`
    width: 50rem;
    height: 6rem;
    margin: 15.5rem -10rem;
    background-color: #F5F5F5;
    border: solid white;
    font-size: medium;
    outline: none;
`

const CheckBtn = styled.button`
  position: absolute;
  width: 12rem;
    height: 6rem;
    margin: 15.5rem 0;
  background-color: #777777;
  border: solid white;
  color: white;
  font-size: medium;
  font-weight: 500;
  cursor: pointer;
    &:hover{
      background-color: #6627F5;
      transition: 0.5s ease-out;
    }
    div{
        margin: 0rem -18rem;
    }
`

const TetxBox = styled.div`
     width: 12rem;
     margin: 0rem 8rem;
`

const TextP =styled.p`
  font-size: large;
  font-weight: bold;
  margin: 25.5rem 0;
`


const LogoBox =styled.div`
   width: 20rem;
    height: 10rem;
    position: relative;
    top: -13rem;
    left: 48rem;
    text-align: center;
`
const SubmitBtn = styled.div`
    margin: 1rem 37rem;
    position: relative;
      left: 4rem;
  input[type="submit"] {
     width: 45rem;
      height: 4rem;
      background-color:#6627F5 ;
      border: 1px solid white;
      color: white;
      font-size: xx-large;
      font-weight: bold;
      
      &:disabled {
        background-color: gray;
      }
      cursor: pointer;
    }
`
const FormBox = styled.form`
    position: relative;
    right: 21rem;
   
`
const SignupBox =styled.div`
  width: 150rem;
  height: 49rem;
  margin: auto 2rem;
  display: flex;
`

const SignBox2 = styled.div`
  width: 74rem;
  padding: 5rem;
  float: right;
  margin: auto;
  flex-direction: row;
  align-items: center;
`
