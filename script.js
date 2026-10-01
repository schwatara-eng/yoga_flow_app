// Live Server에서 실행 중인 요가 API를 요청합니다.
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
          card.append(picture, textElement('h3', pose.english_name), textElement('p', pose.sanskrit_name_adapted)); cards.append(card);
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
