/*
YOUR FLOW — 연결형 루틴 생성 모듈
2026-10-08

사용법:
1) 기존 public/script.js의 POSE_SEQUENCE_ROLES 선언 다음에
   아래 POSE_CONNECTIONS 및 함수들을 넣습니다.
2) 기존 makeRoutine() 함수는 이 파일의 makeRoutine()으로 교체합니다.
3) 나머지 검색/상세/렌더링 코드는 그대로 유지합니다.

주의:
- 연결 데이터는 1차 설계안입니다.
- 실제 요가 지도/의료 안전성을 보증하는 데이터가 아닙니다.
- 필터 조건으로 완전한 경로를 만들 수 없으면 억지로 자세를 채우지 않습니다.
*/

// YOUR FLOW: directional pose connections, preliminary editorial draft.
// Weights: 10 = straightforward, 7 = reasonable with transition cue, 5 = conditional.
// These are NOT clinically or instructor validated. Review each edge before production.
const POSE_CONNECTIONS = {
  'Lotus': ['Butterfly:10','Seated Forward Bend:8','Half Lord of the Fishes:7','Boat:6'],
  'Butterfly': ['Seated Forward Bend:10','Side Splits:8','Boat:7','Half Lord of the Fishes:7','Child\'s Pose:6'],
  'Seated Forward Bend': ['Butterfly:9','Half Lord of the Fishes:8','Boat:7','Bridge:5','Corpse:9'],
  'Half Lord of the Fishes': ['Seated Forward Bend:9','Butterfly:8','Boat:7','Corpse:7'],
  'Boat': ['Half Boat:10','Butterfly:7','Seated Forward Bend:8','Bridge:6','Corpse:6'],
  'Half Boat': ['Boat:9','Bridge:7','Seated Forward Bend:7','Corpse:7'],
  'Side Splits': ['Butterfly:9','Seated Forward Bend:9','Half Lord of the Fishes:7','Corpse:6'],
  'Child\'s Pose': ['Cat:10','Cow:9','Downward-Facing Dog:8','Sphinx:7','Corpse:7'],
  'Cat': ['Cow:10','Child\'s Pose:9','Downward-Facing Dog:8','Plank:7'],
  'Cow': ['Cat:10','Child\'s Pose:9','Downward-Facing Dog:8','Plank:7'],
  'Downward-Facing Dog': ['Plank:10','Low Lunge:9','Crescent Lunge:8','Warrior One:8','Dolphin:9','Pigeon:7','Standing Forward Bend:7'],
  'Plank': ['Downward-Facing Dog:10','Side Plank:9','Upward-Facing Dog:6','Child\'s Pose:8','Crow:6'],
  'Side Plank': ['Plank:10','Wild Thing:7','Downward-Facing Dog:7','Child\'s Pose:6'],
  'Dolphin': ['Downward-Facing Dog:10','Forearm Stand:6','Child\'s Pose:8','Plank:7'],
  'Forearm Stand': ['Dolphin:8','Child\'s Pose:6','Downward-Facing Dog:5'],
  'Handstand': ['Downward-Facing Dog:7','Child\'s Pose:6','Standing Forward Bend:5'],
  'Crow': ['Garland Pose:9','Plank:8','Downward-Facing Dog:7','Child\'s Pose:7'],
  'Garland Pose': ['Crow:8','Standing Forward Bend:8','Chair:8','Butterfly:7','Low Lunge:7'],
  'Standing Forward Bend': ['Chair:9','Forward Bend with Shoulder Opener:10','Downward-Facing Dog:8','Pyramid:7','Tree:6'],
  'Forward Bend with Shoulder Opener': ['Standing Forward Bend:10','Chair:7','Downward-Facing Dog:7'],
  'Chair': ['Standing Forward Bend:10','Tree:8','Eagle:8','Warrior One:7','Garland Pose:7'],
  'Tree': ['Eagle:7','Warrior Three:7','Extended Hand to Toe:7','Chair:8','Standing Forward Bend:7'],
  'Eagle': ['Tree:9','Chair:9','Warrior Three:6','Standing Forward Bend:6'],
  'Extended Hand to Toe': ['Tree:8','Warrior Three:7','Chair:7','Standing Forward Bend:7'],
  'Warrior Three': ['Half-Moon:7','Warrior Two:8','Tree:8','Extended Hand to Toe:7','Pyramid:7'],
  'Half-Moon': ['Triangle:9','Warrior Three:8','Warrior Two:7','Pyramid:6'],
  'Low Lunge': ['Crescent Lunge:9','Warrior One:8','Downward-Facing Dog:9','Pigeon:8','Splits:6'],
  'Crescent Lunge': ['Warrior One:9','Low Lunge:9','Warrior Three:7','Downward-Facing Dog:8','Pyramid:7'],
  'Crescent Moon': ['Low Lunge:8','Crescent Lunge:8','Warrior One:7','Standing Forward Bend:6'],
  'Warrior One': ['Warrior Two:10','Crescent Lunge:9','Pyramid:8','Downward-Facing Dog:8','Warrior Three:7'],
  'Warrior Two': ['Reverse Warrior:10','Extended Side Angle:10','Triangle:9','Half-Moon:7','Downward-Facing Dog:7'],
  'Reverse Warrior': ['Warrior Two:10','Extended Side Angle:9','Triangle:8','Downward-Facing Dog:6'],
  'Extended Side Angle': ['Warrior Two:10','Reverse Warrior:9','Triangle:9','Half-Moon:7','Downward-Facing Dog:7'],
  'Triangle': ['Half-Moon:9','Warrior Two:9','Extended Side Angle:9','Pyramid:8','Standing Forward Bend:6'],
  'Pyramid': ['Warrior One:8','Triangle:8','Standing Forward Bend:8','Low Lunge:7','Downward-Facing Dog:7'],
  'Pigeon': ['King Pigeon:7','Downward-Facing Dog:8','Child\'s Pose:8','Seated Forward Bend:7','Corpse:6'],
  'King Pigeon': ['Pigeon:10','Child\'s Pose:7','Downward-Facing Dog:6'],
  'Splits': ['Low Lunge:9','Pigeon:7','Seated Forward Bend:6','Child\'s Pose:6'],
  'Sphinx': ['Upward-Facing Dog:7','Bow:7','Child\'s Pose:8','Downward-Facing Dog:6'],
  'Upward-Facing Dog': ['Downward-Facing Dog:10','Plank:8','Sphinx:8','Child\'s Pose:7'],
  'Bow': ['Sphinx:8','Child\'s Pose:8','Camel:5','Corpse:5'],
  'Camel': ['Child\'s Pose:9','Low Lunge:7','Bridge:6','Sphinx:6'],
  'Bridge': ['Wheel:7','Corpse:9','Seated Forward Bend:6','Shoulder Stand:5'],
  'Wheel': ['Bridge:9','Corpse:7','Child\'s Pose:5'],
  'Wild Thing': ['Side Plank:9','Downward-Facing Dog:8','Plank:7'],
  'Shoulder Stand': ['Plow:8','Bridge:5','Corpse:7'],
  'Plow': ['Shoulder Stand:7','Corpse:8','Bridge:5'],
  'Corpse': []
};

// Parse draft into objects. Avoid using as a safety-verified movement plan.
const parsedPoseConnections = Object.fromEntries(Object.entries(POSE_CONNECTIONS).map(([from, edges]) => [from, edges.map(s => { const cut=s.lastIndexOf(':'); return {to:s.slice(0,cut),weight:Number(s.slice(cut+1))}; })]));
if (typeof module !== 'undefined') module.exports = parsedPoseConnections;


/* ===== 연결형 루틴 알고리즘 ===== */

// YOUR FLOW: directional pose connections, preliminary editorial draft.
// Weights: 10 = straightforward, 7 = reasonable with transition cue, 5 = conditional.
// These are NOT clinically or instructor validated. Review each edge before production.
const POSE_CONNECTIONS_DRAFT = {
  'Lotus': ['Butterfly:10','Seated Forward Bend:8','Half Lord of the Fishes:7','Boat:6'],
  'Butterfly': ['Seated Forward Bend:10','Side Splits:8','Boat:7','Half Lord of the Fishes:7','Child\'s Pose:6'],
  'Seated Forward Bend': ['Butterfly:9','Half Lord of the Fishes:8','Boat:7','Bridge:5','Corpse:9'],
  'Half Lord of the Fishes': ['Seated Forward Bend:9','Butterfly:8','Boat:7','Corpse:7'],
  'Boat': ['Half Boat:10','Butterfly:7','Seated Forward Bend:8','Bridge:6','Corpse:6'],
  'Half Boat': ['Boat:9','Bridge:7','Seated Forward Bend:7','Corpse:7'],
  'Side Splits': ['Butterfly:9','Seated Forward Bend:9','Half Lord of the Fishes:7','Corpse:6'],
  'Child\'s Pose': ['Cat:10','Cow:9','Downward-Facing Dog:8','Sphinx:7','Corpse:7'],
  'Cat': ['Cow:10','Child\'s Pose:9','Downward-Facing Dog:8','Plank:7'],
  'Cow': ['Cat:10','Child\'s Pose:9','Downward-Facing Dog:8','Plank:7'],
  'Downward-Facing Dog': ['Plank:10','Low Lunge:9','Crescent Lunge:8','Warrior One:8','Dolphin:9','Pigeon:7','Standing Forward Bend:7'],
  'Plank': ['Downward-Facing Dog:10','Side Plank:9','Upward-Facing Dog:6','Child\'s Pose:8','Crow:6'],
  'Side Plank': ['Plank:10','Wild Thing:7','Downward-Facing Dog:7','Child\'s Pose:6'],
  'Dolphin': ['Downward-Facing Dog:10','Forearm Stand:6','Child\'s Pose:8','Plank:7'],
  'Forearm Stand': ['Dolphin:8','Child\'s Pose:6','Downward-Facing Dog:5'],
  'Handstand': ['Downward-Facing Dog:7','Child\'s Pose:6','Standing Forward Bend:5'],
  'Crow': ['Garland Pose:9','Plank:8','Downward-Facing Dog:7','Child\'s Pose:7'],
  'Garland Pose': ['Crow:8','Standing Forward Bend:8','Chair:8','Butterfly:7','Low Lunge:7'],
  'Standing Forward Bend': ['Chair:9','Forward Bend with Shoulder Opener:10','Downward-Facing Dog:8','Pyramid:7','Tree:6'],
  'Forward Bend with Shoulder Opener': ['Standing Forward Bend:10','Chair:7','Downward-Facing Dog:7'],
  'Chair': ['Standing Forward Bend:10','Tree:8','Eagle:8','Warrior One:7','Garland Pose:7'],
  'Tree': ['Eagle:7','Warrior Three:7','Extended Hand to Toe:7','Chair:8','Standing Forward Bend:7'],
  'Eagle': ['Tree:9','Chair:9','Warrior Three:6','Standing Forward Bend:6'],
  'Extended Hand to Toe': ['Tree:8','Warrior Three:7','Chair:7','Standing Forward Bend:7'],
  'Warrior Three': ['Half-Moon:7','Warrior Two:8','Tree:8','Extended Hand to Toe:7','Pyramid:7'],
  'Half-Moon': ['Triangle:9','Warrior Three:8','Warrior Two:7','Pyramid:6'],
  'Low Lunge': ['Crescent Lunge:9','Warrior One:8','Downward-Facing Dog:9','Pigeon:8','Splits:6'],
  'Crescent Lunge': ['Warrior One:9','Low Lunge:9','Warrior Three:7','Downward-Facing Dog:8','Pyramid:7'],
  'Crescent Moon': ['Low Lunge:8','Crescent Lunge:8','Warrior One:7','Standing Forward Bend:6'],
  'Warrior One': ['Warrior Two:10','Crescent Lunge:9','Pyramid:8','Downward-Facing Dog:8','Warrior Three:7'],
  'Warrior Two': ['Reverse Warrior:10','Extended Side Angle:10','Triangle:9','Half-Moon:7','Downward-Facing Dog:7'],
  'Reverse Warrior': ['Warrior Two:10','Extended Side Angle:9','Triangle:8','Downward-Facing Dog:6'],
  'Extended Side Angle': ['Warrior Two:10','Reverse Warrior:9','Triangle:9','Half-Moon:7','Downward-Facing Dog:7'],
  'Triangle': ['Half-Moon:9','Warrior Two:9','Extended Side Angle:9','Pyramid:8','Standing Forward Bend:6'],
  'Pyramid': ['Warrior One:8','Triangle:8','Standing Forward Bend:8','Low Lunge:7','Downward-Facing Dog:7'],
  'Pigeon': ['King Pigeon:7','Downward-Facing Dog:8','Child\'s Pose:8','Seated Forward Bend:7','Corpse:6'],
  'King Pigeon': ['Pigeon:10','Child\'s Pose:7','Downward-Facing Dog:6'],
  'Splits': ['Low Lunge:9','Pigeon:7','Seated Forward Bend:6','Child\'s Pose:6'],
  'Sphinx': ['Upward-Facing Dog:7','Bow:7','Child\'s Pose:8','Downward-Facing Dog:6'],
  'Upward-Facing Dog': ['Downward-Facing Dog:10','Plank:8','Sphinx:8','Child\'s Pose:7'],
  'Bow': ['Sphinx:8','Child\'s Pose:8','Camel:5','Corpse:5'],
  'Camel': ['Child\'s Pose:9','Low Lunge:7','Bridge:6','Sphinx:6'],
  'Bridge': ['Wheel:7','Corpse:9','Seated Forward Bend:6','Shoulder Stand:5'],
  'Wheel': ['Bridge:9','Corpse:7','Child\'s Pose:5'],
  'Wild Thing': ['Side Plank:9','Downward-Facing Dog:8','Plank:7'],
  'Shoulder Stand': ['Plow:8','Bridge:5','Corpse:7'],
  'Plow': ['Shoulder Stand:7','Corpse:8','Bridge:5'],
  'Corpse': []
};


// Uses English pose names as stable keys. The connection graph is a preliminary draft.
const FLOW_CONNECTIONS = Object.fromEntries(
  Object.entries(POSE_CONNECTIONS_DRAFT).map(([from, edges]) => [from, edges.map(s => {
    const i = s.lastIndexOf(':');
    return { to: s.slice(0, i), weight: Number(s.slice(i + 1)) };
  })])
);

// Called by makeRoutine after existing level/goal/bodyArea/intensity filtering.
// Returns a full-length route or null; never silently inserts an unconnected pose.
function findFlowRoute(matching, count, rolePlan, roles, recentFrequency = {}) {
  const byName = new Map(matching.map(p => [p.english_name, p]));
  const eligible = new Set(byName.keys());
  const wanted = Number(count);
  if (!Number.isInteger(wanted) || wanted < 1 || eligible.size < wanted) return null;
  const maxVisits = 150000;
  let visits = 0;
  const attempts = 12;
  const scored = [];
  for (let attempt = 0; attempt < attempts; attempt++) {
    const used = new Set(['Lotus', 'Corpse']);
    const path = [];
    function dfs(from, depth, score) {
      if (++visits > maxVisits) return false;
      if (depth === wanted) {
        const ending = (FLOW_CONNECTIONS[from] || []).find(e => e.to === 'Corpse');
        if (!ending) return false;
        scored.push({ path: path.slice(), score: score + ending.weight });
        return true;
      }
      const plannedRole = rolePlan[depth];
      const options = (FLOW_CONNECTIONS[from] || [])
        .filter(e => eligible.has(e.to) && !used.has(e.to))
        .map(e => ({ ...e, roleMatch: (roles[e.to] || []).includes(plannedRole),
          rank: e.weight * 2 + ((roles[e.to] || []).includes(plannedRole) ? 5 : -4)
             - (recentFrequency[e.to] || 0) * 2 + Math.random() * 9 }))
        .sort((a,b) => b.rank-a.rank);
      for (const edge of options) {
        used.add(edge.to); path.push(byName.get(edge.to));
        if (dfs(edge.to, depth+1, score+edge.rank)) return true;
        path.pop(); used.delete(edge.to);
      }
      return false;
    }
    dfs('Lotus', 0, 0);
    if (visits > maxVisits) break;
  }
  if (!scored.length) return null;
  scored.sort((a,b) => b.score-a.score);
  // Select from top routes, not always the single highest-scoring route.
  const shortlist = scored.slice(0, Math.min(5, scored.length));
  return shortlist[Math.floor(Math.random()*shortlist.length)].path;
}

// Example integration inside makeRoutine, after `matching` is computed:
// const plan = routineRolePlan(count);
// const path = findFlowRoute(matching, count, plan, POSE_SEQUENCE_ROLES);
// if (!path) return { routine: [], matchingCount: matching.length, selectedCount: 0,
//   reason: '연결 가능한 루틴이 없습니다. 필터를 완화하거나 자세 수를 줄여주세요.' };
// const selectedRoutine = path.map((pose, i) => ({pose, role: plan[i], fixed: false}));
// Keep existing Lotus/Corpse wrapper and renderRoutine code unchanged.

if (typeof module !== 'undefined') module.exports = { FLOW_CONNECTIONS, findFlowRoute };
