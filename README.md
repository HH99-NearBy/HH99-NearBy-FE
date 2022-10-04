#WHO

💻 Front-end developer :::
🏆 강태훈 [FE리더]
메인페이지 네비게이션, 메인 이미지 기능 구현, 상세페이지 게시글 Read, 댓글 CRUD, 무한스크롤
🏆 나유진
게시글 Add, 이미지 미리보기, 이미지 리사이징, 메소리니 레이아웃, createPotal

##WHEN

2022.08.12 ~ 2022.08.18

###WHAT

Web Service '쓱관
:::좋은습관 개발을 위한 챌린지를 수행할 수 있는 공간을 제공하는 플랫폼 서비스

###주요기능

💻 Infinite Scroll
💻 CreatePotal
💻 Image Upload
💻 Image Resizing(Compression)
💻 LogIn & SignIn
💻 Post CRUD
💻 WebSocket Live Chatting
💻 WebRTC Live Camera Share

###Trouble Shooting

이미지 프리뷰 업로드 및 리사이징, 서버 전송

게시글 이미지(AWS S3) 전송 후 게시글 컨텐츠 전송

모달창 구현으로 상세 게시글 불러올 때 랜더링 안되는 현상

무한 스크롤 게시글 중복 현상

자동 스크롤 시 내역이 중복되어 렌더링 되는 현상/ 레이아웃이 깨지면서 스크롤 자체가 동작하지 않는 현상

자동 스크롤이 브라우저마다 동작이 다르거나 아예 동작하지 않는 현상

###패키지

스타일 적용 : styled-components
s3 연결 : aws-sdk
axios(통신) 설치 : yarn add axios
image resizing : yarn add browser-image-compression
openvidu를 이용한 webRTC 제어 : openvidu-broswer
websocket을 이용한 리얼타임 채팅 : webstomp-client
websocket을 지원하지 않는 브라우저를 위한 크로스 브라우징 : sockJs
react 상의 페이징 처리 : react-router-dom
챌린지 페이지에서 전체화면 제어 : react-full-screenf


###git commit rules

파일 생성 ✨add : ~~~ 생성에 대한 커밋
파일 수정 ✂modify : ~~~ 수정에 대한 커밋
파일 삭제 🗑delete : ~~~ 삭제에 대한 커밋
