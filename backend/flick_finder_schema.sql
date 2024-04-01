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
	director    VARCHAR(150),
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
	email     VARCHAR(100),
	-- reg_date  DATE,
	primary key (user_id)
);

create table reviews (
	user_id  INT NOT NULL,
	-- movie_id NUMERIC(6,0),
	movie_id	INT NOT NULL,
	rating   FLOAT(1),
	rate_date DATE,
	foreign key (user_id) references users(user_id) on delete CASCADE,
	foreign key (movie_id) references movies(movie_id)
);

create table likes (
	user_id   INT NOT NULL,
	movie_id  INT not null,
	is_liked      INT,   -- 0 for no, 1 for yes
	foreign key (movie_id) references movies(movie_id),
	foreign key (user_id) references users(user_id) on delete cascade 
);

CREATE TABLE recommendations (
    movie_id INT NOT NULL,
    rec_one INT NOT NULL,
    rec_two INT NOT NULL,
    rec_three INT NOT NULL,
    rec_four INT NOT NULL,
    rec_five INT NOT NULL,
    rec_six INT NOT NULL,
    rec_seven INT NOT NULL,
    rec_eight INT NOT NULL,
    rec_nine INT NOT NULL,
    rec_ten INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_one) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_two) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_three) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_four) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_five) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_six) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_seven) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_eight) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_nine) REFERENCES movies(movie_id),
    FOREIGN KEY (rec_ten) REFERENCES movies(movie_id)
);
