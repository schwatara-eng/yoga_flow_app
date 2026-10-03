const API_URL = '/api/poses';

const POSE_NAMES = {
  "Boat": {
    korean: "보트 자세",
    koreanSanskrit: "나바사나",
    roman: "Nāvāsana",
    english: "Boat Pose"
  },
  "Half Boat": {
    korean: "반 보트 자세",
    koreanSanskrit: "아르다 나바사나",
    roman: "Ardha Nāvāsana",
    english: "Half Boat Pose"
  },
  "Bow": {
    korean: "활 자세",
    koreanSanskrit: "다누라사나",
    roman: "Dhanurāsana",
    english: "Bow Pose"
  },
  "Bridge": {
    korean: "브리지 자세",
    koreanSanskrit: "세투 반다사나",
    roman: "Setu Bandhāsana",
    english: "Bridge Pose"
  },
  "Butterfly": {
    korean: "나비 자세",
    koreanSanskrit: "받다 코나사나",
    roman: "Baddha Koṇāsana",
    english: "Butterfly Pose"
  },
  "Camel": {
    korean: "낙타 자세",
    koreanSanskrit: "우스트라사나",
    roman: "Uṣṭrāsana",
    english: "Camel Pose"
  },
  "Cat": {
    korean: "고양이 자세",
    koreanSanskrit: "마르자리아사나",
    roman: "Marjaryāsana",
    english: "Cat Pose"
  },
  "Cow": {
    korean: "소 자세",
    koreanSanskrit: "비틸라사나",
    roman: "Bitilāsana",
    english: "Cow Pose"
  },
  "Chair": {
    korean: "의자 자세",
    koreanSanskrit: "웃카타사나",
    roman: "Utkaṭāsana",
    english: "Chair Pose"
  },
  "Child's Pose": {
    korean: "아기 자세",
    koreanSanskrit: "발라사나",
    roman: "Bālāsana",
    english: "Child's Pose"
  },
  "Corpse": {
    korean: "송장 자세",
    koreanSanskrit: "사바사나",
    roman: "Śavāsana",
    english: "Corpse Pose"
  },
  "Crescent Lunge": {
    korean: "초승달 런지",
    koreanSanskrit: "아슈타 찬드라사나",
    roman: "Ashta Chandrāsana",
    english: "Crescent Lunge"
  },
  "Crow": {
    korean: "까마귀 자세",
    koreanSanskrit: "바카라사나",
    roman: "Bakāsana",
    english: "Crow Pose"
  },
  "Dolphin": {
    korean: "돌고래 자세",
    koreanSanskrit: "아르다 핀차 마유라사나",
    roman: "Ardha Piñcha Mayūrāsana",
    english: "Dolphin Pose"
  },
  "Downward-Facing Dog": {
    korean: "다운독",
    koreanSanskrit: "아도 무카 스바나사나",
    roman: "Adho Mukha Śvānāsana",
    english: "Downward-Facing Dog"
  },
  "Eagle": {
    korean: "독수리 자세",
    koreanSanskrit: "가루다사나",
    roman: "Garuḍāsana",
    english: "Eagle Pose"
  },
  "Extended Hand to Toe": {
    korean: "손으로 엄지발가락 잡기 자세",
    koreanSanskrit: "웃티타 하스타 파당구스타사나",
    roman: "Utthita Hasta Pādāṅguṣṭhāsana",
    english: "Extended Hand-to-Big-Toe Pose"
  },
  "Extended Side Angle": {
    korean: "뻗은 측각 자세",
    koreanSanskrit: "웃티타 파르스바코나사나",
    roman: "Utthita Pārśvakoṇāsana",
    english: "Extended Side Angle Pose"
  },
  "Forearm Stand": {
    korean: "팔뚝서기",
    koreanSanskrit: "핀차 마유라사나",
    roman: "Piñcha Mayūrāsana",
    english: "Forearm Stand"
  },
  "Forward Bend with Shoulder Opener": {
    korean: "어깨 열기 전굴 자세",
    koreanSanskrit: "웃타나사나",
    roman: "Uttānāsana",
    english: "Forward Bend with Shoulder Opener"
  },
  "Half-Moon": {
    korean: "반달 자세",
    koreanSanskrit: "아르다 찬드라사나",
    roman: "Ardha Candrāsana",
    english: "Half Moon Pose"
  },
  "Handstand": {
    korean: "물구나무서기",
    koreanSanskrit: "아도 무카 브릭샤사나",
    roman: "Adho Mukha Vṛkṣāsana",
    english: "Handstand"
  },
  "Low Lunge": {
    korean: "로우 런지",
    koreanSanskrit: "안자네야사나",
    roman: "Añjaneyāsana",
    english: "Low Lunge"
  },
  "Pigeon": {
    korean: "비둘기 자세",
    koreanSanskrit: "숩타 카포타사나",
    roman: "Supta Kapotāsana",
    english: "Pigeon Pose"
  },
  "King Pigeon": {
    korean: "왕비둘기 자세",
    koreanSanskrit: "에카 파다 라자카포타사나",
    roman: "Eka Pāda Rājakapotāsana",
    english: "King Pigeon Pose"
  },
  "Plank": {
    korean: "플랭크 자세",
    koreanSanskrit: "팔라카사나",
    roman: "Phalakāsana",
    english: "Plank Pose"
  },
  "Plow": {
    korean: "쟁기 자세",
    koreanSanskrit: "할라사나",
    roman: "Halāsana",
    english: "Plow Pose"
  },
  "Pyramid": {
    korean: "피라미드 자세",
    koreanSanskrit: "파르스보타나사나",
    roman: "Pārśvottānāsana",
    english: "Pyramid Pose"
  },
  "Reverse Warrior": {
    korean: "리버스 워리어",
    koreanSanskrit: "파르스바 비라바드라사나",
    roman: "Pārśva Vīrabhadrāsana",
    english: "Reverse Warrior"
  },
  "Seated Forward Bend": {
    korean: "앉은 전굴 자세",
    koreanSanskrit: "파스치모타나사나",
    roman: "Paśchimottānāsana",
    english: "Seated Forward Bend"
  },
  "Lotus": {
    korean: "연꽃 자세",
    koreanSanskrit: "파드마사나",
    roman: "Padmāsana",
    english: "Lotus Pose"
  },
  "Half Lord of the Fishes": {
    korean: "반 물고기왕 자세",
    koreanSanskrit: "아르다 마첸드라사나",
    roman: "Ardha Matsyendrāsana",
    english: "Half Lord of the Fishes"
  },
  "Shoulder Stand": {
    korean: "어깨서기",
    koreanSanskrit: "사르방가사나",
    roman: "Sarvāṅgāsana",
    english: "Shoulder Stand"
  },
  "Side Plank": {
    korean: "사이드 플랭크",
    koreanSanskrit: "바시스타사나",
    roman: "Vasiṣṭhāsana",
    english: "Side Plank"
  },
  "Sphinx": {
    korean: "스핑크스 자세",
    koreanSanskrit: "살람바 부장가사나",
    roman: "Sālamba Bhujaṅgāsana",
    english: "Sphinx Pose"
  },
  "Splits": {
    korean: "전후 다리 찢기",
    koreanSanskrit: "하누마나사나",
    roman: "Hanumānāsana",
    english: "Splits"
  },
  "Garland Pose": {
    korean: "화환 자세",
    koreanSanskrit: "말라사나",
    roman: "Mālāsana",
    english: "Garland Pose"
  },
  "Standing Forward Bend": {
    korean: "선 전굴 자세",
    koreanSanskrit: "웃타나사나",
    roman: "Uttānāsana",
    english: "Standing Forward Bend"
  },
  "Crescent Moon": {
    korean: "초승달 자세",
    koreanSanskrit: "아슈타 찬드라사나",
    roman: "Ashta Chandrāsana",
    english: "Crescent Moon Pose"
  },
  "Side Splits": {
    korean: "앉은 다리 벌리기 자세",
    koreanSanskrit: "우파비슈타 코나사나",
    roman: "Upaviṣṭha Koṇāsana",
    english: "Side Splits"
  },
  "Tree": {
    korean: "나무 자세",
    koreanSanskrit: "브릭샤사나",
    roman: "Vṛkṣāsana",
    english: "Tree Pose"
  },
  "Triangle": {
    korean: "삼각 자세",
    koreanSanskrit: "트리코나사나",
    roman: "Trikoṇāsana",
    english: "Triangle Pose"
  },
  "Upward-Facing Dog": {
    korean: "업독",
    koreanSanskrit: "우르드바 무카 스바나사나",
    roman: "Ūrdhva Mukha Śvānāsana",
    english: "Upward-Facing Dog"
  },
  "Warrior One": {
    korean: "전사 자세 1번",
    koreanSanskrit: "비라바드라사나 I",
    roman: "Vīrabhadrāsana I",
    english: "Warrior I"
  },
  "Warrior Two": {
    korean: "전사 자세 2번",
    koreanSanskrit: "비라바드라사나 II",
    roman: "Vīrabhadrāsana II",
    english: "Warrior II"
  },
  "Warrior Three": {
    korean: "전사 자세 3번",
    koreanSanskrit: "비라바드라사나 III",
    roman: "Vīrabhadrāsana III",
    english: "Warrior III"
  },
  "Wheel": {
    korean: "바퀴 자세",
    koreanSanskrit: "우르드바 다누라사나",
    roman: "Ūrdhva Dhanurāsana",
    english: "Wheel Pose"
  },
  "Wild Thing": {
    korean: "와일드 씽",
    koreanSanskrit: "카마트카라사나",
    roman: "Camatkārāsana",
    english: "Wild Thing"
  }
};

const POSE_BODY_AREAS = {
  "Boat": ["코어", "엉덩관절", "허벅지"],
  "Half Boat": ["코어", "엉덩관절", "허벅지"],
  "Bow": ["가슴", "등", "엉덩관절", "허벅지"],
  "Bridge": ["가슴", "등", "둔근", "허벅지"],
  "Butterfly": ["엉덩관절", "허벅지", "무릎"],
  "Camel": ["가슴", "어깨", "등", "엉덩관절"],
  "Cat": ["목", "어깨", "등", "코어"],
  "Cow": ["목", "어깨", "가슴", "등"],
  "Chair": ["코어", "둔근", "허벅지", "발목"],
  "Child's Pose": ["어깨", "등", "엉덩관절"],
  "Corpse": ["목", "어깨", "등"],
  "Crescent Lunge": ["엉덩관절", "둔근", "허벅지", "발목"],
  "Crow": ["어깨", "팔", "손목", "코어"],
  "Dolphin": ["어깨", "팔", "등", "코어"],
  "Downward-Facing Dog": ["어깨", "팔", "손목", "햄스트링", "종아리"],
  "Eagle": ["어깨", "엉덩관절", "허벅지", "발목"],
  "Extended Hand to Toe": ["엉덩관절", "햄스트링", "허벅지", "발목"],
  "Extended Side Angle": ["어깨", "가슴", "엉덩관절", "허벅지"],
  "Forearm Stand": ["어깨", "팔", "코어", "등"],
  "Forward Bend with Shoulder Opener": ["어깨", "등", "햄스트링"],
  "Half-Moon": ["코어", "엉덩관절", "둔근", "발목"],
  "Handstand": ["어깨", "팔", "손목", "코어"],
  "Low Lunge": ["엉덩관절", "둔근", "허벅지", "발목"],
  "Pigeon": ["엉덩관절", "둔근", "허벅지"],
  "King Pigeon": ["가슴", "어깨", "등", "엉덩관절"],
  "Plank": ["어깨", "팔", "손목", "코어"],
  "Plow": ["목", "어깨", "등", "햄스트링"],
  "Pyramid": ["엉덩관절", "햄스트링", "종아리"],
  "Reverse Warrior": ["어깨", "가슴", "엉덩관절", "허벅지"],
  "Seated Forward Bend": ["등", "엉덩관절", "햄스트링"],
  "Lotus": ["엉덩관절", "무릎", "발목"],
  "Half Lord of the Fishes": ["어깨", "등", "코어", "엉덩관절"],
  "Shoulder Stand": ["목", "어깨", "코어"],
  "Side Plank": ["어깨", "팔", "손목", "코어"],
  "Sphinx": ["가슴", "어깨", "등"],
  "Splits": ["엉덩관절", "햄스트링", "허벅지"],
  "Garland Pose": ["엉덩관절", "둔근", "무릎", "발목"],
  "Standing Forward Bend": ["등", "햄스트링", "종아리"],
  "Crescent Moon": ["어깨", "가슴", "코어", "엉덩관절"],
  "Side Splits": ["엉덩관절", "햄스트링", "허벅지"],
  "Tree": ["엉덩관절", "둔근", "허벅지", "발목"],
  "Triangle": ["어깨", "가슴", "엉덩관절", "햄스트링"],
  "Upward-Facing Dog": ["가슴", "어깨", "팔", "등"],
  "Warrior One": ["어깨", "엉덩관절", "둔근", "허벅지"],
  "Warrior Two": ["어깨", "엉덩관절", "둔근", "허벅지"],
  "Warrior Three": ["코어", "둔근", "햄스트링", "발목"],
  "Wheel": ["가슴", "어깨", "팔", "등"],
  "Wild Thing": ["가슴", "어깨", "팔", "등", "둔근"]
};

const POSE_TYPES = {
  "Boat": ["앉기", "균형"],
  "Half Boat": ["앉기", "균형"],
  "Bow": ["엎드리기", "후굴"],
  "Bridge": ["바로 눕기", "후굴"],
  "Butterfly": ["앉기"],
  "Camel": ["무릎 자세", "후굴"],
  "Cat": ["무릎 자세"],
  "Cow": ["무릎 자세", "후굴"],
  "Chair": ["서기"],
  "Child's Pose": ["무릎 자세", "전굴"],
  "Corpse": ["바로 눕기"],
  "Crescent Lunge": ["서기"],
  "Crow": ["균형", "역자세"],
  "Dolphin": ["역자세"],
  "Downward-Facing Dog": ["역자세"],
  "Eagle": ["서기", "균형"],
  "Extended Hand to Toe": ["서기", "균형"],
  "Extended Side Angle": ["서기"],
  "Forearm Stand": ["균형", "역자세"],
  "Forward Bend with Shoulder Opener": ["서기", "전굴"],
  "Half-Moon": ["서기", "균형"],
  "Handstand": ["균형", "역자세"],
  "Low Lunge": ["무릎 자세"],
  "Pigeon": ["앉기", "전굴"],
  "King Pigeon": ["앉기", "후굴"],
  "Plank": ["균형"],
  "Plow": ["바로 눕기", "전굴", "역자세"],
  "Pyramid": ["서기", "전굴"],
  "Reverse Warrior": ["서기", "후굴"],
  "Seated Forward Bend": ["앉기", "전굴"],
  "Lotus": ["앉기"],
  "Half Lord of the Fishes": ["앉기", "비틀기"],
  "Shoulder Stand": ["바로 눕기", "역자세"],
  "Side Plank": ["균형"],
  "Sphinx": ["엎드리기", "후굴"],
  "Splits": ["앉기"],
  "Garland Pose": ["서기"],
  "Standing Forward Bend": ["서기", "전굴"],
  "Crescent Moon": ["서기", "후굴"],
  "Side Splits": ["앉기"],
  "Tree": ["서기", "균형"],
  "Triangle": ["서기"],
  "Upward-Facing Dog": ["엎드리기", "후굴"],
  "Warrior One": ["서기"],
  "Warrior Two": ["서기"],
  "Warrior Three": ["서기", "균형"],
  "Wheel": ["바로 눕기", "후굴"],
  "Wild Thing": ["균형", "후굴"]
};

const POSE_GOALS = {
  "Boat": ["근력", "균형", "집중"],
  "Half Boat": ["근력", "균형", "집중"],
  "Bow": ["유연성", "가동성", "활력"],
  "Bridge": ["가동성", "근력", "자세 정렬"],
  "Butterfly": ["유연성", "가동성", "이완"],
  "Camel": ["유연성", "가동성", "활력"],
  "Cat": ["가동성", "자세 정렬", "이완"],
  "Cow": ["가동성", "자세 정렬", "활력"],
  "Chair": ["근력", "자세 정렬", "활력"],
  "Child's Pose": ["유연성", "이완", "집중"],
  "Corpse": ["이완", "집중"],
  "Crescent Lunge": ["가동성", "근력", "활력"],
  "Crow": ["근력", "균형", "집중"],
  "Dolphin": ["근력", "가동성", "활력"],
  "Downward-Facing Dog": ["유연성", "근력", "자세 정렬"],
  "Eagle": ["균형", "집중", "가동성"],
  "Extended Hand to Toe": ["유연성", "균형", "집중"],
  "Extended Side Angle": ["유연성", "근력", "자세 정렬"],
  "Forearm Stand": ["근력", "균형", "집중"],
  "Forward Bend with Shoulder Opener": ["유연성", "가동성", "이완"],
  "Half-Moon": ["근력", "균형", "집중"],
  "Handstand": ["근력", "균형", "집중"],
  "Low Lunge": ["가동성", "유연성", "자세 정렬"],
  "Pigeon": ["유연성", "가동성", "이완"],
  "King Pigeon": ["유연성", "가동성", "집중"],
  "Plank": ["근력", "자세 정렬", "집중"],
  "Plow": ["유연성", "이완", "집중"],
  "Pyramid": ["유연성", "자세 정렬", "집중"],
  "Reverse Warrior": ["가동성", "자세 정렬", "활력"],
  "Seated Forward Bend": ["유연성", "이완", "집중"],
  "Lotus": ["가동성", "집중", "이완"],
  "Half Lord of the Fishes": ["가동성", "자세 정렬", "집중"],
  "Shoulder Stand": ["균형", "집중", "이완"],
  "Side Plank": ["근력", "균형", "집중"],
  "Sphinx": ["가동성", "자세 정렬", "이완"],
  "Splits": ["유연성", "가동성", "집중"],
  "Garland Pose": ["가동성", "유연성", "자세 정렬"],
  "Standing Forward Bend": ["유연성", "이완", "집중"],
  "Crescent Moon": ["가동성", "자세 정렬", "활력"],
  "Side Splits": ["유연성", "가동성", "집중"],
  "Tree": ["균형", "집중", "자세 정렬"],
  "Triangle": ["유연성", "자세 정렬", "집중"],
  "Upward-Facing Dog": ["가동성", "근력", "활력"],
  "Warrior One": ["근력", "자세 정렬", "집중"],
  "Warrior Two": ["근력", "자세 정렬", "집중"],
  "Warrior Three": ["근력", "균형", "집중"],
  "Wheel": ["가동성", "근력", "활력"],
  "Wild Thing": ["가동성", "근력", "활력"]
};

const POSE_INTENSITIES = {
  "Boat": "보통", "Half Boat": "보통", "Bow": "보통", "Bridge": "보통",
  "Butterfly": "낮음", "Camel": "보통", "Cat": "낮음", "Cow": "낮음",
  "Chair": "보통", "Child's Pose": "낮음", "Corpse": "낮음", "Crescent Lunge": "보통",
  "Crow": "높음", "Dolphin": "보통", "Downward-Facing Dog": "보통", "Eagle": "보통",
  "Extended Hand to Toe": "보통", "Extended Side Angle": "보통", "Forearm Stand": "높음",
  "Forward Bend with Shoulder Opener": "낮음", "Half-Moon": "보통", "Handstand": "높음",
  "Low Lunge": "낮음", "Pigeon": "낮음", "King Pigeon": "높음", "Plank": "보통",
  "Plow": "보통", "Pyramid": "낮음", "Reverse Warrior": "보통", "Seated Forward Bend": "낮음",
  "Lotus": "낮음", "Half Lord of the Fishes": "낮음", "Shoulder Stand": "높음",
  "Side Plank": "보통", "Sphinx": "낮음", "Splits": "높음", "Garland Pose": "낮음",
  "Standing Forward Bend": "낮음", "Crescent Moon": "낮음", "Side Splits": "높음",
  "Tree": "낮음", "Triangle": "낮음", "Upward-Facing Dog": "보통", "Warrior One": "보통",
  "Warrior Two": "보통", "Warrior Three": "보통", "Wheel": "높음", "Wild Thing": "높음"
};

const POSE_SEQUENCE_ROLES = {
  "Boat": ["본운동"],
  "Half Boat": ["본운동"],
  "Bow": ["본운동"],
  "Bridge": ["본운동", "마무리"],
  "Butterfly": ["준비", "마무리"],
  "Camel": ["본운동"],
  "Cat": ["준비"],
  "Cow": ["준비"],
  "Chair": ["본운동"],
  "Child's Pose": ["준비", "마무리", "최종 이완"],
  "Corpse": ["최종 이완"],
  "Crescent Lunge": ["준비", "본운동"],
  "Crow": ["본운동"],
  "Dolphin": ["준비", "본운동"],
  "Downward-Facing Dog": ["준비", "본운동"],
  "Eagle": ["본운동"],
  "Extended Hand to Toe": ["본운동"],
  "Extended Side Angle": ["본운동"],
  "Forearm Stand": ["본운동"],
  "Forward Bend with Shoulder Opener": ["마무리"],
  "Half-Moon": ["본운동"],
  "Handstand": ["본운동"],
  "Low Lunge": ["준비"],
  "Pigeon": ["마무리"],
  "King Pigeon": ["본운동"],
  "Plank": ["본운동"],
  "Plow": ["마무리"],
  "Pyramid": ["준비", "마무리"],
  "Reverse Warrior": ["본운동"],
  "Seated Forward Bend": ["마무리"],
  "Lotus": ["마무리", "최종 이완"],
  "Half Lord of the Fishes": ["마무리"],
  "Shoulder Stand": ["본운동", "마무리"],
  "Side Plank": ["본운동"],
  "Sphinx": ["준비", "마무리"],
  "Splits": ["본운동"],
  "Garland Pose": ["준비"],
  "Standing Forward Bend": ["준비", "마무리"],
  "Crescent Moon": ["준비"],
  "Side Splits": ["본운동"],
  "Tree": ["준비", "본운동"],
  "Triangle": ["준비", "본운동"],
  "Upward-Facing Dog": ["준비", "본운동"],
  "Warrior One": ["준비", "본운동"],
  "Warrior Two": ["본운동"],
  "Warrior Three": ["본운동"],
  "Wheel": ["본운동"],
  "Wild Thing": ["본운동"]
};

function getPoseName(pose) {
  return POSE_NAMES[pose.english_name] || {
    korean: pose.english_name,
    koreanSanskrit: pose.sanskrit_name_adapted || '',
    roman: pose.sanskrit_name || '',
    english: pose.english_name
  };
}

const statusText = document.querySelector('#status');
function textElement(tag, text) { const el = document.createElement(tag); el.textContent = text || ''; return el; }
function poseImage(pose) { const img = document.createElement('img'); img.src = pose.url_png || pose.url_svg; img.alt = pose.english_name; img.loading = 'lazy'; img.addEventListener('error', () => { img.replaceWith(textElement('span', '이미지를 불러올 수 없습니다')); }); return img; }
function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function routineRolePlan(count) {
  // 사용자가 고른 "자세 수"는 연꽃 자세와 송장 자세를 제외한 본 루틴 개수다.
  if (count === 4) return ["준비", "본운동", "본운동", "마무리"];
  if (count === 8) return ["준비", "준비", "본운동", "본운동", "본운동", "본운동", "마무리", "마무리"];
  return ["준비", "준비", "본운동", "본운동", "마무리", "마무리"];
}

function makeRoutine(poses, options) {
  const { level, goal, bodyArea, intensity, count } = options;
  const lotus = poses.find((pose) => pose.english_name === "Lotus");
  const corpse = poses.find((pose) => pose.english_name === "Corpse");

  // 연꽃 자세와 송장 자세는 필터와 자세 수 계산에서 제외한다.
  const matching = poses.filter((pose) => {
    if (["Lotus", "Corpse"].includes(pose.english_name)) return false;

    const areas = POSE_BODY_AREAS[pose.english_name] || [];
    const goals = POSE_GOALS[pose.english_name] || [];
    const poseIntensity = POSE_INTENSITIES[pose.english_name] || "보통";
    return (!level || pose.difficulty_level === level)
      && (!goal || goals.includes(goal))
      && (!bodyArea || areas.includes(bodyArea))
      && (!intensity || poseIntensity === intensity);
  });

  if (!matching.length) return { routine: [], matchingCount: 0, selectedCount: 0 };

  const plan = routineRolePlan(count);
  const unused = new Set(matching.map((pose) => String(pose.id)));
  const selectedRoutine = [];

  plan.forEach((role) => {
    let pool = matching.filter((pose) => unused.has(String(pose.id))
      && (POSE_SEQUENCE_ROLES[pose.english_name] || []).includes(role));

    if (!pool.length) {
      pool = matching.filter((pose) => unused.has(String(pose.id)));
    }

    const selected = shuffled(pool)[0];
    if (selected) {
      selectedRoutine.push({ pose: selected, role, fixed: false });
      unused.delete(String(selected.id));
    }
  });

  const routine = [];
  if (lotus) routine.push({ pose: lotus, role: "시작", fixed: true });
  routine.push(...selectedRoutine);
  if (corpse) routine.push({ pose: corpse, role: "최종 이완", fixed: true });

  return {
    routine,
    matchingCount: matching.length,
    selectedCount: selectedRoutine.length
  };
}

function renderRoutine(routine, matchingCount, selectedCount) {
  const result = document.querySelector('#routine-result');
  const status = document.querySelector('#routine-status');
  if (!result || !status) return;

  result.replaceChildren();

  if (!routine.length) {
    status.textContent = '선택한 조건에 맞는 자세가 없습니다. 조건을 하나씩 줄여보세요.';
    return;
  }

  status.textContent = `${matchingCount}개의 후보 중 ${selectedCount}개 자세를 골랐습니다. 연꽃 자세로 시작해 송장 자세로 마무리합니다.`;
  const fragment = document.createDocumentFragment();
  let numberedIndex = 0;

  for (let start = 0; start < routine.length; start += 4) {
    const row = document.createElement('div');
    row.className = 'routine-row';
    const chunk = routine.slice(start, start + 4);

    chunk.forEach(({ pose, role, fixed }, indexInChunk) => {
      const item = document.createElement('a');
      item.className = fixed ? 'routine-card routine-card-fixed' : 'routine-card';
      item.href = `detail.html?id=${encodeURIComponent(pose.id)}`;

      if (!fixed) {
        numberedIndex += 1;
        const order = textElement('span', String(numberedIndex).padStart(2, '0'));
        order.className = 'routine-order';
        item.append(order);
      }

      const imageWrap = document.createElement('div');
      imageWrap.className = 'routine-picture';
      imageWrap.append(poseImage(pose));

      const text = document.createElement('div');
      text.className = 'routine-copy';
      const name = getPoseName(pose);
      const title = textElement('h3', name.korean);
      const meta = textElement('p', `${role} · ${POSE_INTENSITIES[pose.english_name] || '보통'} · ${name.english}`);
      text.append(title, meta);

      item.append(imageWrap, text);
      row.append(item);

      if (indexInChunk < chunk.length - 1) {
        const arrow = document.createElement('div');
        arrow.className = 'routine-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        row.append(arrow);
      }
    });

    fragment.append(row);
  }

  result.append(fragment);
}

async function start() {
  try {
    const response = await fetch("/api/poses");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const poses = await response.json();
    if (!Array.isArray(poses)) throw new Error('응답 데이터가 배열이 아닙니다');
    const cards = document.querySelector('#cards');
    if (cards) {
      function render(preserveScroll = false) {
        // 검색/필터링 전의 스크롤 위치와 카드 영역 높이를 기억한다.
        // 결과가 줄어들어 페이지 전체 높이가 짧아지면 브라우저가 스크롤을 강제로 위로
        // 보정하므로, 기존 카드 영역 높이를 min-height로 확보해 그 현상을 막는다.
        const savedScrollY = preserveScroll ? window.scrollY : 0;
        if (preserveScroll) {
          const currentHeight = cards.offsetHeight;
          const reservedHeight = parseFloat(cards.style.minHeight) || 0;
          if (currentHeight > reservedHeight) {
            cards.style.minHeight = `${currentHeight}px`;
          }
        }
        const query = (document.querySelector('#search')?.value || '').trim().toLowerCase();
        const level = document.querySelector('#level-filter')?.value || '';
        const bodyArea = document.querySelector('#body-filter')?.value || '';
        const poseType = document.querySelector('#type-filter')?.value || '';
        const goal = document.querySelector('#goal-filter')?.value || '';

        const results = poses.filter(p => {
          const name = getPoseName(p);
          const searchable = [
            p.english_name,
            p.sanskrit_name_adapted,
            p.sanskrit_name,
            name.korean,
            name.koreanSanskrit,
            name.roman,
            name.english
          ].filter(Boolean).join(' ').toLowerCase();

          const matchesSearch = !query || searchable.includes(query);
          const matchesLevel = !level || p.difficulty_level === level;
          const areas = POSE_BODY_AREAS[p.english_name] || [];
          const matchesBody = !bodyArea || areas.includes(bodyArea);
          const types = POSE_TYPES[p.english_name] || [];
          const matchesType = !poseType || types.includes(poseType);
          const goals = POSE_GOALS[p.english_name] || [];
          const matchesGoal = !goal || goals.includes(goal);

          return matchesSearch && matchesLevel && matchesBody && matchesType && matchesGoal;
        });
        // 먼저 메모리 안에서 카드들을 만든 뒤 한 번에 교체한다.
        // 이렇게 하면 DOM을 비우는 순간 페이지 높이가 줄어들며 위로 튀는 현상을 줄일 수 있다.
        const fragment = document.createDocumentFragment();

        results.forEach(pose => {
          const card = document.createElement('a'); card.className = 'card'; card.href = `detail.html?id=${encodeURIComponent(pose.id)}`;
          const picture = document.createElement('div'); picture.className = 'card-picture'; picture.append(poseImage(pose));
          const name = POSE_NAMES[pose.english_name];

if (name) {
  card.append(
    picture,
    textElement('h3', name.korean),
    textElement('p', name.koreanSanskrit),
    textElement('p', name.roman),
    textElement('p', name.english)
  );
} else {
  card.append(
    picture,
    textElement('h3', pose.english_name),
    textElement('p', pose.sanskrit_name_adapted)
  );
}
          fragment.append(card);
        });

        cards.replaceChildren(fragment);
        statusText.textContent = `${results.length}개의 아사나`;

        if (preserveScroll) {
          // DOM 교체 직후와 다음 프레임에 한 번씩 복원해 브라우저의 자동 스크롤 보정을 막는다.
          window.scrollTo({ top: savedScrollY, left: 0, behavior: 'auto' });
          requestAnimationFrame(() => {
            window.scrollTo({ top: savedScrollY, left: 0, behavior: 'auto' });
          });
        }
      }
      const createRoutineButton = document.querySelector('#create-routine');
      createRoutineButton?.addEventListener('click', () => {
        const level = document.querySelector('#routine-level')?.value || '';
        const goal = document.querySelector('#routine-goal')?.value || '';
        const bodyArea = document.querySelector('#routine-body')?.value || '';
        const intensity = document.querySelector('#routine-intensity')?.value || '';
        const count = Number(document.querySelector('#routine-count')?.value || 6);
        const { routine, matchingCount, selectedCount } = makeRoutine(poses, { level, goal, bodyArea, intensity, count });
        renderRoutine(routine, matchingCount, selectedCount);
      });

      render();

      // 검색어를 입력하는 동안에는 카드 목록을 바꾸지 않는다.
      // 사용자가 Enter를 눌렀을 때만 검색 결과를 적용한다.
      const searchInput = document.querySelector('#search');
      searchInput?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          render(true);
        }
      });

      document.querySelector('#level-filter')?.addEventListener('change', () => render(true));
      document.querySelector('#body-filter')?.addEventListener('change', () => render(true));
      document.querySelector('#type-filter')?.addEventListener('change', () => render(true));
      document.querySelector('#goal-filter')?.addEventListener('change', () => render(true));
    } else {
      const id = new URLSearchParams(location.search).get('id');
      const pose = poses.find(p => String(p.id) === id);
      if (!pose) throw new Error('선택한 아사나를 찾을 수 없습니다');
const name = getPoseName(pose);

document.querySelector('#name').textContent = name.korean;
document.querySelector('#english-name').textContent = name.english;
document.querySelector('#sanskrit-roman').textContent = name.roman;
document.querySelector('#sanskrit-korean').textContent = name.koreanSanskrit;

document.querySelector('#description').textContent = pose.pose_description;
document.title = `${name.korean} — ASANA`;
      document.querySelector('#description').textContent = pose.pose_description;
      document.title = `${pose.english_name} — ASANA`;
      const media = (window.ASANA_MEDIA || {})[pose.english_name] || {};
      const photos = media.photos || []; const gallery = document.querySelector('#gallery');
      statusText.textContent = photos.length ? `${photos.length}장의 사진` : '';
      if (!photos.length) {
        gallery.className = 'empty'; gallery.append(poseImage(pose), textElement('h2', '이 자세의 사진을 모으고 있어요.'), textElement('p', '다양한 사람들의 사진이 이곳에 펼쳐집니다.'));
      }
      const dialog = document.querySelector('#lightbox');
      photos.forEach(photo => {
        const button = document.createElement('button'); button.className = 'photo';
        const img = document.createElement('img'); img.src = photo.src; img.alt = photo.alt || pose.english_name; img.loading = 'lazy'; button.append(img);
        button.addEventListener('click', () => { document.querySelector('#large').src = photo.src; document.querySelector('#large').alt = img.alt; document.querySelector('#caption').textContent = photo.credit || ''; dialog.showModal(); }); gallery.append(button);
      });
      document.querySelector('#close').addEventListener('click', () => dialog.close());
      if (media.video) { document.querySelector('#video-section').hidden = false; const video = document.createElement('video'); video.controls = true; video.preload = 'metadata'; video.src = media.video; document.querySelector('#video').append(video); }
    }
  } catch(error) { statusText.textContent = `데이터를 불러오지 못했어요. API 서버가 켜져 있는지 확인해주세요. (${error.message})`; }
}
start();
