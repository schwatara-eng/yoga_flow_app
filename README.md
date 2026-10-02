Yoga Flow App

사용자의 현재 컨디션과 운동 목적에 맞춰 요가 자세를 조합해 하나의 플로우를 만들어 주는 웹앱 프로젝트입니다.
현재는 `alexcumplido/yoga-api`의 SQLite 요가 자세 데이터 48개를 MySQL의 `yoga_db`로 이전했으며, Node.js / Express 서버가 MySQL을 조회해 제공하는 자체 API를 통해 자세 데이터를 불러오고 있습니다. 자세 갤러리와 상세페이지를 기반으로 메인 플로우 생성 기능을 확장하는 단계입니다.


1. 프로젝트 컨셉
기존의 단순한 아사나 목록 페이지를 넘어, 사용자가 자신의 상태를 입력하면 조건에 맞는 요가 자세를 골라 순서대로 보여주는 앱을 목표로 합니다.

```
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
```
한국어 자세명
한글 산스크리트명
로마자 표기
영문 표기
```
예:
```
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
원본 `alexcumplido/yoga-api`의 SQLite `database.db`에 저장된 `poses` 데이터 48개를 MySQL로 이전했습니다.

현재 데이터베이스:
```
MySQL
└─ yoga_db
   └─ poses (48개)
```
웹앱에서는 Node.js / Express 서버가 MySQL의 `poses` 테이블을 조회하고, 자체 API를 통해 JSON 데이터를 제공합니다.
```
http://localhost:3000/api/poses
```

데이터 흐름:
```
MySQL yoga_db
     ↓ SELECT
Node.js / Express
     ↓ JSON API
/api/poses
     ↓ fetch()
Yoga Flow App
```

주요 필드:
필드	의미	사용
`id`	자세 식별 번호	상세페이지 이동
`english_name`	API 기준 영문명	데이터 매칭
`sanskrit_name_adapted`	단순화된 산스크리트명	원본 데이터 참고
`sanskrit_name`	산스크리트 로마자 표기	명칭 검토 참고
`translation_name`	명칭의 뜻	추후 활용 가능
`pose_description`	자세 설명	상세페이지
`pose_benefits`	자세 효과 설명	추후 활용 예정
`url_png`	PNG 이미지 주소	카드 이미지
`url_svg`	SVG 이미지 주소	이미지 대체
`url_svg_alt`	대체 SVG 이미지 주소	이미지 대체
MySQL `poses` 테이블은 `id`를 Primary Key로 사용합니다.

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
```
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
```
warmup      준비
main        본동작
transition  연결
cooldown    마무리
```

목표는 단순 랜덤이 아니라 다음과 같은 흐름입니다.
```
준비 → 본동작 → 연결 → 마무리
```

7. 현재 파일 구조
```
yoga_flow_app
│
├─ images/
├─ sql/
│  └─ yoga_db_setup.sql
├─ index.html
├─ detail.html
├─ script.js
├─ media.js
├─ style.css
├─ server.js
├─ .env
├─ .gitignore
├─ package.json
├─ package-lock.json
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
`server.js`
Node.js / Express 서버
MySQL `yoga_db` 연결
`SELECT * FROM poses` 조회
`/api/poses` JSON API 제공
`sql/yoga_db_setup.sql`
MySQL 데이터베이스 및 `poses` 테이블 생성 SQL 기록
`.env`
MySQL 접속 정보 관리
`.gitignore`
`.env`, `node_modules` 등 Git 제외 설정


8. 실행 방법
MySQL 실행
MySQL에서 `yoga_db`와 `poses` 테이블이 준비되어 있어야 합니다.
현재 `poses` 테이블에는 원본 SQLite에서 이전한 48개의 아사나 데이터가 저장되어 있습니다.
Node.js 서버 실행
`yoga_flow_app` 폴더를 VSCode에서 열고 터미널에서 실행합니다.
```
node server.js
```
정상 실행 시:
```
http://localhost:3000
```
API 확인:
```
http://localhost:3000/api/poses
```
Yoga Flow App 실행
`yoga_flow_app` 폴더에서 `index.html`을 Live Server로 실행합니다.

예:
```
http://127.0.0.1:5500/index.html
```
구조:
```
MySQL yoga_db
     ↓
Node.js / Express
     ↓
JSON API (/api/poses)
     ↓ fetch()
yoga_flow_app
     ↓
브라우저 화면
```

9. 현재까지 구현된 기능
원본 SQLite 요가 데이터 구조 확인
SQLite → MySQL 데이터 이전
MySQL `yoga_db` / `poses` 테이블 구축
48개 아사나 데이터 MySQL 저장 및 조회 확인
Node.js / Express ↔ MySQL 연결
자체 `/api/poses` API 구현
웹앱 ↔ 자체 API 연결
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
Node.js
Express
MySQL
mysql2
dotenv
cors
이 프로젝트는 HTML·CSS·JavaScript의 기본 개념과 API 활용을 실제 웹앱 형태로 연결하는 학습 프로젝트이자 포트폴리오 프로젝트입니다.

12. 데이터 출처
Yoga pose data:
`alexcumplido/yoga-api`
GitHub repository:
https://github.com/alexcumplido/yoga-api
원본 데이터는 `alexcumplido/yoga-api`의 SQLite 데이터베이스를 기반으로 하며, 현재 프로젝트에서는 48개 자세 데이터를 MySQL로 이전하여 자체 Node.js / Express API를 통해 사용합니다.

13. 주의
Yoga Flow 추천 기능은 현재 학습용 프로토타입입니다.
사용자의 건강 상태를 진단하거나 치료를 목적으로 하지 않으며, 자세 분류와 추천 규칙은 웹앱 기능 구현을 위한 데이터 구조로 사용합니다.
추후 실제 서비스 수준으로 확장할 경우 자세 효과, 안전성, 금기사항, 신체 상태별 추천 기준을 별도 검증할 예정입니다.