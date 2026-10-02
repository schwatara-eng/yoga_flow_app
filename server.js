require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MySQL 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// 요가 자세 전체 조회 API
app.get("/api/poses", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM poses ORDER BY english_name ASC"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "데이터베이스 조회 중 오류가 발생했습니다."
    });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}`);
});