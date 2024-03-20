-- Tristan Allen, Will Cox, Daniel Carter, and Josiah Jackson
drop schema if exists flickfinder;
create schema flickfinder;
use flickfinder;
create table movies (
	-- movie_id         NUMERIC(6, 0),
	movie_id	INT NOT NULL,
	title		VARCHAR(120), -- longest is 105
 	genres		VARCHAR(100), -- longest is 98 
	cast 		VARCHAR(5180), -- longest is 5179
 	description	VARCHAR(1000), -- longest is 1000 
 	keywords	VARCHAR(1950), -- longest is 1901
	runtime   INT,
	release_date DATE,
	primary key (movie_id)
	);
	
create table users (
	user_id   INT NOT NULL AUTO_INCREMENT,
	username 	VARCHAR(50) NOT NULL,
	password     VARCHAR(60) NOT NULL,  
	-- email     VARCHAR(100),
	-- reg_date  DATE,
	primary key (user_id)
);

create table reviews (
	user_id  INT NOT NULL,
	-- movie_id NUMERIC(6,0),
	movie_id	INT NOT NULL,
	rating   FLOAT(1),
	rate_date DATE,
	foreign key (user_id) references users(user_id),
	foreign key (movie_id) references movies(movie_id)
);
