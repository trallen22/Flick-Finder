# Flick-Finder

Have you ever spent so much time looking for a movie, that you no longer have time to watch the movie? We sure have, which is why we made FlickFinder. FlickFinder is a Movie Recommender Web Appliciation that utilizes a Content Based Recommendation System to provide personalized recommendations to a user.

FlickFinder is a full stack application that utilizes React.JS, Python-Flask, and MySQL.

## Requirements

### Mac OS, Windows, Linux

- [Node Package Manager](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager)
- [Python](https://www.python.org/)
- [MySQL](https://www.mysql.com/)

## How to Run
- Fork this repository

### Frontend
- Open terminal
- Navigate to the FlickFinder frontend directory
- Run ```npm i ```to install packages required
- Run ```npm start``` to run Frontend instance on your localhost

### Backend
- Navigate to backend_server.py and backend_func.py to update the database configuration with your information
- Install the following Python Packages (pandas, numpy, AST, SciKit Learn, NLTK, TQDM)
- Run ```python backend/data_importer.py```
- Run ``` python backend/recommender_alg.py``` (takes roughly 45 mins)
- Install the following Python Packages (flask_cors, flask_restful, flask_bcrpyt, flask_login, flask_mysqldb)
- Run ```python backend/backend_server.py``` to run backend instance on your localhost

Group # 1 

Group Members:
- Tristan Allen, Scrum Master/Developer
- Will Cox, Product Owner/Developer 
- Daniel Carter, Developer 
- Josiah Jackson, Developer 
