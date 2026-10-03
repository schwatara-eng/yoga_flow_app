# YOUR FLOW — Yoga Routine Builder

사용자가 원하는 조건을 선택하면 요가 자세 데이터를 바탕으로 하나의 루틴을 구성해 주는 웹앱입니다.

단순한 아사나 목록에서 출발해, 현재는 **요가 자세 검색·필터링 → 자세 상세 정보 → 조건 기반 루틴 생성**까지 연결한 학습·포트폴리오 프로젝트로 확장했습니다.

## Live Demo

**배포된 웹앱:**  
[YOUR FLOW 바로가기](https://yoga-flow-app-sepia.vercel.app/index.html)

> 현재 개발 및 기능 개선이 진행 중인 프로토타입입니다.

## 1. 현재 구현 기능

### Yoga Flow 루틴 만들기

사용자가 다음 조건을 선택해 요가 루틴을 생성할 수 있습니다.

- 난이도: 초급 / 중급 / 고급
- 운동 목적: 유연성 / 가동성 / 근력 / 균형 / 자세 정렬 / 집중 / 이완 / 활력
- 주요 신체 부위
- 운동 강도: 낮음 / 보통 / 높음
- 자세 수: 4 / 6 / 8 / 10 / 12개

루틴은 단순히 자세를 무작위로 나열하는 것이 아니라, 각 자세에 부여한 역할과 조건을 이용해 하나의 흐름을 구성하도록 설계했습니다.

```text
준비 → 본동작 → 연결 → 마무리
```

현재 추천 방식은 AI가 아니라 **JavaScript 기반 규칙형 로직**입니다.

### 아사나 둘러보기

48개의 요가 자세를 카드 형태로 확인할 수 있습니다.

현재 제공하는 검색·필터 조건:

- 이름 검색
- 난이도
- 주요 신체 부위
- 자세 유형
- 운동 목적

각 자세는 다음 표기 체계를 사용합니다.

```text
나무 자세
브릭샤사나
Vṛkṣāsana
Tree Pose
```

### 자세 상세페이지

카드를 선택하면 개별 자세 상세페이지로 이동합니다.

상세페이지에서는 자세 설명과 이미지, 연결된 미디어 등을 표시하도록 구성했습니다.

---

## 2. 데이터 구조

원본 데이터는 `alexcumplido/yoga-api`의 SQLite 데이터베이스에 저장된 요가 자세 데이터입니다.

프로젝트에서는 48개의 자세 데이터를 MySQL로 이전해 사용하고 있습니다.

```text
MySQL
└─ yoga_db
   └─ poses (48개)
```

Node.js / Express 서버가 MySQL을 조회하고 자체 API를 통해 프런트엔드에 JSON 데이터를 제공합니다.

```text
MySQL yoga_db
      ↓ SELECT
Node.js / Express
      ↓ JSON
/api/poses
      ↓ fetch()
YOUR FLOW
```

MySQL `poses` 테이블은 `id`를 Primary Key로 사용합니다.

주요 원본 필드:

| 필드 | 용도 |
|---|---|
| `id` | 자세 식별 번호 |
| `english_name` | 데이터 매칭 기준 영문명 |
| `sanskrit_name_adapted` | 단순화된 산스크리트명 |
| `sanskrit_name` | 산스크리트 로마자 표기 |
| `translation_name` | 명칭의 뜻 |
| `pose_description` | 자세 설명 |
| `pose_benefits` | 자세 효과 정보 |
| `url_png` | PNG 이미지 주소 |
| `url_svg` | SVG 이미지 주소 |
| `url_svg_alt` | 대체 SVG 이미지 주소 |

원본 API에 없는 한국어 명칭과 루틴 추천용 정보는 웹앱에서 별도로 매핑·분류합니다.

---

## 3. 추천을 위한 추가 분류

루틴 생성에는 원본 데이터만으로 부족한 사용자 중심 조건이 필요하기 때문에 별도의 분류 정보를 사용합니다.

```text
운동 목적
주요 신체 부위
운동 강도
자세 유형
Flow 안에서의 역할
```

Flow 역할은 다음과 같은 구조를 기본으로 합니다.

```text
warmup       준비
main         본동작
transition   연결
cooldown     마무리
```

이 데이터를 사용해 사용자가 선택한 조건에 맞는 자세를 찾고 루틴을 구성합니다.

---

## 4. 현재 프로젝트 구조

```text
yoga_flow_app
│
├─ public/
│  ├─ images/
│  ├─ index.html
│  ├─ detail.html
│  ├─ script.js
│  ├─ media.js
│  └─ style.css
│
├─ sql/
│  └─ yoga_db_setup.sql
│
├─ import-data.js
├─ server.js
├─ package.json
├─ package-lock.json
├─ .gitignore
└─ README.md
```

### 주요 파일 역할

**`public/index.html`**  
YOUR FLOW 메인 화면. 루틴 생성 UI와 아사나 검색·필터 영역을 포함합니다.

**`public/detail.html`**  
자세별 상세페이지입니다.

**`public/script.js`**  
API 요청, 자세 데이터 출력, 검색·필터, 카드 생성, 상세페이지 연결, 명칭 매핑, 루틴 생성 로직 등을 담당합니다.

**`public/media.js`**  
자세별 추가 이미지 및 영상 연결 정보를 관리합니다.

**`public/style.css`**  
전체 디자인, 카드 그리드, 상세페이지 및 반응형 레이아웃을 담당합니다.

**`server.js`**  
Node.js / Express 서버를 실행하고 MySQL의 `poses` 데이터를 `/api/poses`로 제공합니다.

**`sql/yoga_db_setup.sql`**  
MySQL 데이터베이스와 `poses` 테이블 구성을 기록합니다.

---

## 5. 실행 구조

서버 실행:

```bash
node server.js
```

로컬 서버:

```text
http://localhost:3000
```

API:

```text
http://localhost:3000/api/poses
```

전체 구조:

```text
MySQL
  ↓
Node.js / Express
  ↓
REST API
  ↓ fetch()
HTML + CSS + JavaScript
  ↓
브라우저
```

---

## 6. 현재까지 구현한 내용

- 외부 Yoga API 저장소 데이터 구조 확인
- SQLite → MySQL 데이터 이전
- MySQL `yoga_db` / `poses` 테이블 구축
- 48개 아사나 데이터 저장 및 조회
- Node.js / Express ↔ MySQL 연결
- 자체 `/api/poses` API 구현
- Fetch API를 이용한 프런트엔드 데이터 연결
- 아사나 카드 갤러리
- 한국어 / 산스크리트 / 영문 자세명 매핑
- 이름 검색
- 난이도·신체 부위·자세 유형·운동 목적 필터
- 자세별 상세페이지
- 추가 이미지·영상 연결 구조
- 조건 기반 Yoga Flow 생성
- 루틴 자세 수 선택 기능
- 반응형 화면 구성
- GitHub 버전 관리
- Vercel 배포

---

## 7. 사용 기술

### Frontend

- HTML
- CSS
- JavaScript
- DOM
- Event
- Fetch API
- JSON
- Array / Object
- `filter()` 등 배열 메서드

### Backend / Data

- Node.js
- Express
- REST API
- MySQL
- mysql2
- dotenv
- cors

### Deployment / Version Control

- Git
- GitHub
- Vercel

---

## 8. 프로젝트에서 학습한 흐름

이 프로젝트는 각각 따로 배운 웹 기술을 하나의 실제 데이터 흐름으로 연결하는 것을 목표로 했습니다.

```text
데이터베이스
→ 서버
→ API
→ fetch()
→ JavaScript 데이터 처리
→ DOM
→ 사용자 화면
```

단순히 코드를 작성하는 것보다, **데이터가 어디에 저장되고 어떤 경로를 거쳐 사용자 화면까지 오는지 이해하는 것**을 주요 학습 목표로 두었습니다.

---

## 9. 현재 보완 중인 부분

- 모바일 화면 반응형 레이아웃 점검
- 루틴 결과 화면의 모바일 표시 방식 개선
- 자세 수가 많아질 때의 루틴 구성 로직 점검
- 자세별 이미지·영상 자료 보강
- 추천 규칙과 Flow 역할 데이터 정교화
- UI 세부 디자인 및 사용성 개선

---

## 10. 데이터 출처

Yoga pose data: `alexcumplido/yoga-api`

원본 저장소:  
https://github.com/alexcumplido/yoga-api

원본 SQLite 데이터를 기반으로 48개 자세 데이터를 MySQL로 이전했으며, 현재 프로젝트에서는 Node.js / Express 자체 API를 통해 사용합니다.

---

## 11. 안내

이 프로젝트는 HTML·CSS·JavaScript, API, Node.js, MySQL, GitHub, 배포 과정을 실제 웹앱 형태로 연결하기 위한 **학습 및 포트폴리오 프로젝트**입니다.

Yoga Flow 추천 기능은 학습용 프로토타입이며 의료적 진단이나 치료를 목적으로 하지 않습니다. 자세 효과, 안전성, 금기사항 및 신체 상태별 추천 기준은 실제 서비스 수준의 검증을 거친 정보가 아닙니다.
