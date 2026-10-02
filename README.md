Yoga Flow App


사용자의 현재 컨디션과 운동 목적에 맞춰 요가 자세를 조합해 하나의 플로우를 만들어 주는 웹앱 프로젝트입니다.
현재는 `alexcumplido/yoga-api`의 요가 자세 데이터를 로컬 API 서버에서 불러오고 있으며, 자세 갤러리와 상세페이지를 기반으로 메인 플로우 생성 기능을 확장하는 단계입니다.

1. 프로젝트 컨셉
기존의 단순한 아사나 목록 페이지를 넘어, 사용자가 자신의 상태를 입력하면 조건에 맞는 요가 자세를 골라 순서대로 보여주는 앱을 목표로 합니다.
```text
HOME
│
├─ 오늘의 Yoga Flow 만들기
│    ├─ 현재 컨디션
│    ├─ 운동 목적
│    ├─ 난이도
│    ├─ 운동 시간
│    └─ \[FLOW 만들기]
│              ↓
│        추천 Flow 결과
│        자세 1 → 자세 2 → 자세 3...
│
├─ POSES
│    ├─ 전체 자세
│    ├─ 필터 / 검색
│    └─ 자세 상세페이지
│
└─ ABOUT
     └─ 앱 소개 / 데이터 출처
```

2. 주요 기능
HOME — Yoga Flow 생성
사용자가 다음 조건을 선택합니다.
현재 컨디션
운동 목적
난이도
운동 시간
선택한 조건을 기준으로 적절한 자세를 골라 하나의 Yoga Flow를 구성합니다.
초기 버전에서는 AI 추천이 아니라 JavaScript의 조건문, 배열, `filter()` 등을 이용한 규칙 기반 방식으로 구현합니다.
POSES — 아사나 갤러리
Yoga API에서 불러온 자세 데이터를 카드 형태로 보여줍니다.
각 카드에는 다음 정보를 표시합니다.
```text
한국어 자세명
한글 산스크리트명
로마자 표기
영문 표기
```
예:
```text
나무 자세
브릭샤사나
Vṛkṣāsana
Tree Pose
```
카드를 클릭하면 자세 상세페이지로 이동합니다.

3. 자세 명칭 표기 규칙
앱 전체에서 다음 순서로 명칭을 통일합니다.
한국어 자세명
한글 산스크리트명
산스크리트 로마자 표기
영문 표기
API 원본 데이터의 이름을 그대로 사용자 화면에 노출하지 않고, 별도의 명칭 매핑 데이터를 사용합니다.

4. 데이터 구조
현재 로컬 Yoga API에서 자세 데이터를 가져옵니다.
```text
http://localhost:8000/v1/poses
```
주요 필드:
필드	의미	사용
`id`	자세 식별 번호	상세페이지 이동
`english\_name`	API 기준 영문명	데이터 매칭
`sanskrit\_name\_adapted`	단순화된 산스크리트명	원본 데이터 참고
`sanskrit\_name`	산스크리트 로마자 표기	명칭 검토 참고
`pose\_description`	자세 설명	상세페이지
`pose\_benefits`	자세 효과 설명	추후 활용 예정
`url\_png`	PNG 이미지 주소	카드 이미지
`url\_svg`	SVG 이미지 주소	이미지 대체
`translation\_name`	명칭의 뜻	추후 활용 가능

5. 데이터 분류
Yoga API 데이터에는 다음 카테고리가 있습니다.
Standing Yoga
Seated Yoga
Strengthening Yoga
Core Yoga
Balancing Yoga
Backbend Yoga
Forward Bend Yoga
Hip Opening Yoga
Chest Opening Yoga
Arm Balance Yoga
Inversion Yoga
Restorative Yoga
난이도는 다음 세 단계입니다.
Beginner
Intermediate
Expert

6. 추가 태그 설계
현재 API에는 다음과 같은 사용자 중심 정보가 직접 들어 있지 않습니다.
현재 컨디션
운동 목적
운동 시간
Flow 안에서의 역할
따라서 앱에서는 별도의 추천 규칙을 추가합니다.
예:
```text
몸이 뻣뻣함
→ Hip Opening
→ Chest Opening
→ Forward Bend

피곤함
→ Restorative
→ Seated
→ Forward Bend

몸을 깨우고 싶음
→ Standing
→ Strengthening

균형감각 강화
→ Balancing
```
Flow 순서를 만들기 위해 각 자세에 다음 역할도 추가할 예정입니다.
```text
warmup      준비
main        본동작
transition  연결
cooldown    마무리
```
목표는 단순 랜덤이 아니라 다음과 같은 흐름입니다.
```text
준비 → 본동작 → 연결 → 마무리
```

7. 현재 파일 구조
```text
yoga\_flow\_app
│
├─ index.html
├─ detail.html
├─ script.js
├─ media.js
├─ style.css
└─ README.md
```
현재 역할:
`index.html`
현재는 아사나 갤러리 화면
추후 HOME의 Yoga Flow 생성 화면으로 개편 예정
`detail.html`
자세별 상세페이지
자세 설명, 이미지, 영상 영역
`script.js`
API 요청
자세 데이터 출력
검색
카드 생성
상세페이지 데이터 연결
한국어/산스크리트/영문 명칭 매핑
`media.js`
자세별 추가 사진 및 영상 연결
`style.css`
전체 화면 디자인
카드 그리드
반응형 레이아웃
상세페이지 스타일

8. 실행 방법

1) Yoga API 실행
`yoga-api-main` 폴더를 VSCode에서 열고 터미널에서 실행합니다.
```bash
npm start
```
정상 실행 시 기본 주소:
```text
http://localhost:8000
```

2) Yoga Flow App 실행
`yoga\_flow\_app` 폴더에서 `index.html`을 Live Server로 실행합니다.
예:
```text
http://127.0.0.1:5500/index.html
```
구조:
```text
yoga-api-main
     ↓
  JSON API
     ↓ fetch()
yoga\_flow\_app
     ↓
 브라우저 화면
```

9. 현재까지 구현된 기능
Yoga API 연결
48개 아사나 데이터 출력
카드 갤러리
자세 검색
자세 상세페이지 이동
API 이미지 표시
별도 이미지/영상 연결 구조
한국어 자세명 매핑
산스크리트명 표기 체계
영문명 병기

10. 다음 작업
아사나 48개 명칭 정리 완료
기존 갤러리를 `POSES` 페이지로 분리
새로운 `HOME` 화면 제작
사용자 입력 UI 제작
현재 컨디션
운동 목적
난이도
운동 시간
기존 카테고리와 추가 태그 연결
Flow 구성 규칙 작성
JavaScript로 자세 필터링
추천 Yoga Flow 화면 출력
ABOUT 페이지 작성
GitHub / Vercel 배포

11. 사용 기술
HTML
CSS
JavaScript
Fetch API
JSON
DOM
Event
Array / Object
`filter()`
REST API
Node.js / Express 기반 Yoga API
이 프로젝트는 HTML·CSS·JavaScript의 기본 개념과 API 활용을 실제 웹앱 형태로 연결하는 학습 프로젝트이자 포트폴리오 프로젝트입니다.

12. 데이터 출처
Yoga pose data:
`alexcumplido/yoga-api`
GitHub repository:
https://github.com/alexcumplido/yoga-api
현재 개발 단계에서는 로컬 API 서버를 사용합니다.

13. 주의
Yoga Flow 추천 기능은 현재 학습용 프로토타입입니다.
사용자의 건강 상태를 진단하거나 치료를 목적으로 하지 않으며, 자세 분류와 추천 규칙은 웹앱 기능 구현을 위한 데이터 구조로 사용합니다.
추후 실제 서비스 수준으로 확장할 경우 자세 효과, 안전성, 금기사항, 신체 상태별 추천 기준을 별도 검증할 예정입니다.