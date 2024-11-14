CREATE DATABASE IF NOT EXISTS blogdb;

USE blogdb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password, name) VALUES ('admin@gmail.com', 'admin123', 'admin');

