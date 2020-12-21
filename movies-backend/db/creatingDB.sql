--First is needed to create a new DB
CREATE DATABASE movies_project
-- It is needed to create a new user to be able to use the DB
CREATE USER 'user_name'@'localhost' IDENTIFIED BY 'user_password';
-- Granting privilages
GRANT ALL PRIVILEGES ON * . * TO 'user_name'@'localhost';
FLUSH PRIVILEGES;

USE movies_project;

CREATE TABLE  IF NOT EXISTS movies (
    movie_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    movie_name VARCHAR(50) NOT NULL,
    movie_image VARCHAR(128) NOT NULL,
    movie_description LONGTEXT NOT NULL,
    movie_genre VARCHAR(32) NOT NULL,
    movie_duration INT(32) NOT NULL,
    movie_time INT(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_IDCC VARCHAR(32) UNIQUE NOT NULL,
    user_phone VARCHAR(32) UNIQUE NOT NULL,
    user_email VARCHAR(32) UNIQUE NOT NULL,
    user_password VARCHAR(32) NOT NULL, 
    user_rol BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    room_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    room_capacity INT (128) NOT NULL,
    room_type ENUM('STANDARD','VIP','ELITE')
);

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_IDCC VARCHAR(32) NOT NULL,
    movie_name VARCHAR(128) NOT NULL,
    movie_time INT(32) NOT NULL,    
    room_id INT(32) NOT NULL,
    CONSTRAINT FK_room_id FOREIGN KEY (room_id)
    REFERENCES rooms(room_id)
);