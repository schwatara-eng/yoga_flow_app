# 아사나 갤러리 초안

## 실행
1. 기존 yoga-api-main 터미널에서 npm start를 실행하고 켜둡니다.
2. 이 압축파일을 별도의 asana-gallery 폴더에 풉니다.
3. VSCode에서 asana-gallery 폴더를 엽니다.
4. index.html을 오른쪽 클릭 → Open with Live Server.
5. 카드 클릭 → detail.html?id=자세ID로 이동합니다.

이 초안은 http://localhost:8000/v1/poses에 요청합니다. 현재 컴퓨터에서 사용하는 로컬 실습용이며 외부 배포 전 API 주소를 변경해야 합니다.
CORS 오류가 발생하면 기존 API의 server.js에서 cors 설정을 확인합니다.

## 사진과 영상 추가
media.js의 주석 예시를 참고해 영어 자세 이름을 키로 등록합니다.
images 폴더에 사용 가능한 사진들을 넣고 photos 배열에 경로·대체텍스트·촬영자 이름을 추가합니다.
서로 다른 실제 사진이 없으면 준비 중 안내를 표시합니다. 예시 사진은 포함하지 않았습니다.
브릭샤사나 영상 완성 후 videos/vrikshasana.mp4를 넣고 video 경로를 등록합니다.
등록한 영상은 사진 갤러리 아래에 나타납니다.

## 파일 역할
- index.html: 홈 카드 목록
- detail.html: 자세 상세 페이지, 사진 확대, 영상 영역
- style.css: 색상·크기·반응형 배열
- script.js: fetch·검색·페이지 데이터·사진 확대
- media.js: 자세별 추가 사진과 영상 목록

## 확인 범위
JS 문법과 파일 연결을 확인했습니다. 사용자 컴퓨터의 API 및 외부 이미지 연결은 실행 후 확인해야 합니다.
데이터 출처: https://github.com/alexcumplido/yoga-api
