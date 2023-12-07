CREATE DATABASE Bookmark_DB;
USE Bookmark_DB;
CREATE TABLE Bookmark(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    URL VARCHAR(255) NOT NULL,
    title VARCHAR(50) NOT NULL,
    date_added DATETIME NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO Bookmark(URL, title, date_added) VALUES ('www.google.com','google' ,now());
INSERT INTO Bookmark(URL, title, date_added) VALUES ('www.youtube.com','youtube' ,now());
INSERT INTO Bookmark(URL, title, date_added) VALUES ('www.facebook.com','facebook' ,now());
INSERT INTO Bookmark(URL, title, date_added) VALUES ('www.twitter.com','twitter' ,now());