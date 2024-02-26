-- Tristan Allen, Will Cox, and Daniel Carter 
DROP SCHEMA IF EXISTS FlickFinder;
CREATE SCHEMA FlickFinder;

USE FlickFinder;

CREATE TABLE movies
	(movieId 	INT NOT NULL, 
	title		VARCHAR(120), -- longest is 105
	genres		VARCHAR(100), -- longest is 98 
	description	VARCHAR(1000), -- longest is 1000 
	keywords	VARCHAR(1950) -- longest is 1901
	);