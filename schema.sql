DROP DATABASE IF EXISTS subscription_db;

CREATE DATABASE subscription_db;

USE subscription_db;

CREATE TABLE user (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
user VARCHAR(30) NOT NULL,
email NOT NULL,
password NOT NULL
);

CREATE TABLE subscription (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT,
subscription_name VARCHAR(60) NOT NULL,
spend INT,
FOREIGN KEY (user_id)
REFERENCES user(id)
ON DELETE SET NULL
);
