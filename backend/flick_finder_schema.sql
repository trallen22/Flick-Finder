-- Tristan Allen, Will Cox, and Daniel Carter 
drop schema if exists flickfinder;
create schema flickfinder;
use flickfinder;
create table movies (
	movie_id         NUMERIC(6, 0),
	title      VARCHAR(100),
	genre      VARCHAR(1000),
	overview   VARCHAR(1000),
	keywords   VARCHAR(5000),
	duration   INT,
	release_date DATE,
	primary key (movie_id)
	);
	
create table users (
	user_id   VARCHAR(50),
	username 	VARCHAR(50),
	password     VARCHAR(50),  # how to encrypt
	email     VARCHAR(100),
	reg_date  DATE,
	primary key (user_id)
);

create table reviews (
	user_id  VARCHAR(50),
	movie_id NUMERIC(6,0),
	rating   INT,
	rate_date DATE,
	primary key (user_id, movie_id),
	foreign key (user_id) references users(user_id),
	foreign key (movie_id) references movies(movie_id)
);
