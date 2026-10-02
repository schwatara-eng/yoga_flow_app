require("dotenv").config();
const mysql = require("mysql2/promise");

async function importData() {
  const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT
  });

  const response = await fetch(
    "https://yoga-api-nzy4.onrender.com/v1/poses"
  );

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const poses = await response.json();

  for (const pose of poses) {
    await connection.execute(
      `INSERT INTO poses (
        id,
        english_name,
        sanskrit_name_adapted,
        sanskrit_name,
        translation_name,
        pose_description,
        pose_benefits,
        url_svg,
        url_png,
        url_svg_alt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        english_name = VALUES(english_name),
        sanskrit_name_adapted = VALUES(sanskrit_name_adapted),
        sanskrit_name = VALUES(sanskrit_name),
        translation_name = VALUES(translation_name),
        pose_description = VALUES(pose_description),
        pose_benefits = VALUES(pose_benefits),
        url_svg = VALUES(url_svg),
        url_png = VALUES(url_png),
        url_svg_alt = VALUES(url_svg_alt)`,
      [
        pose.id,
        pose.english_name ?? "",
        pose.sanskrit_name_adapted ?? "",
        pose.sanskrit_name ?? "",
        pose.translation_name ?? "",
        pose.pose_description ?? "",
        pose.pose_benefits ?? "",
        pose.url_svg ?? "",
        pose.url_png ?? "",
        pose.url_svg_alt ?? "",
      ]
    );
  }

  console.log(`${poses.length}개의 아사나를 MySQL에 저장했습니다.`);
  await connection.end();
}

importData().catch((error) => {
  console.error("데이터 저장 실패:", error);
});