CREATE DATABASE IF NOT EXISTS yoga_db;

USE yoga_db;

DROP TABLE IF EXISTS poses;

CREATE TABLE poses (
    id INT PRIMARY KEY,
    english_name VARCHAR(255) NOT NULL,
    sanskrit_name_adapted VARCHAR(255) NOT NULL,
    sanskrit_name VARCHAR(255) NOT NULL,
    translation_name VARCHAR(255) NOT NULL,
    pose_description TEXT NOT NULL,
    pose_benefits TEXT NOT NULL,
    url_svg TEXT NOT NULL,
    url_png TEXT NOT NULL,
    url_svg_alt TEXT NOT NULL
);

DESCRIBE poses;

SELECT COUNT(*) FROM poses;

SELECT * FROM poses;

SHOW TABLES;

