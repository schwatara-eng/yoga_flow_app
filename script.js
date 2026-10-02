// Live Server에서 실행 중인 요가 API를 요청합니다.
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


const API_URL = 'http://localhost:8000/v1/poses';
const statusText = document.querySelector('#status');
function textElement(tag, text) { const el = document.createElement(tag); el.textContent = text || ''; return el; }
function poseImage(pose) { const img = document.createElement('img'); img.src = pose.url_png || pose.url_svg; img.alt = pose.english_name; img.loading = 'lazy'; img.addEventListener('error', () => { img.replaceWith(textElement('span', '이미지를 불러올 수 없습니다')); }); return img; }
async function start() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const poses = await response.json();
    if (!Array.isArray(poses)) throw new Error('응답 데이터가 배열이 아닙니다');
    const cards = document.querySelector('#cards');
    if (cards) {
      function render(query = '') {
        cards.replaceChildren();
        const results = poses.filter(p => `${p.english_name} ${p.sanskrit_name_adapted}`.toLowerCase().includes(query.toLowerCase()));
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
} cards.append(card);
        });
        statusText.textContent = `${results.length}개의 아사나`;
      }
      render(); document.querySelector('#search').addEventListener('input', e => render(e.target.value));
    } else {
      const id = new URLSearchParams(location.search).get('id');
      const pose = poses.find(p => String(p.id) === id);
      if (!pose) throw new Error('선택한 아사나를 찾을 수 없습니다');
      document.querySelector('#name').textContent = pose.english_name;
      document.querySelector('#sanskrit').textContent = pose.sanskrit_name_adapted;
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
