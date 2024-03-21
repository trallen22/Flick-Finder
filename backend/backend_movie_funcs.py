import mysql.connector 
import sys

HOST = 'localhost'
USER = 'root'
DATABASE = 'FlickFinder'

def sql_query(sqlString:str, sqlTuple:tuple) -> list:
	try: 
		connection = mysql.connector.connect(host=HOST, user=USER, database=DATABASE) 
	except Exception as e:
		print(f'error: {e}')
		sys.exit()
	cursor = connection.cursor()
	cursor.execute(sqlString, sqlTuple)
	curMovies = []
	if (sqlString.split()[0] == 'SELECT'):
		fetched = cursor.fetchall()
		columns = [col[0] for col in cursor.description]
		curMovies = [dict(zip(columns, row)) for row in fetched]
	connection.commit()
	cursor.close()
	return curMovies

def get_movie_by_name(movieName:str) -> dict:
	movieDict = {}
	movieTitle = movieName.replace('_', ' ')
	sqlStr = "SELECT * FROM movies WHERE title=%s;"
	curMovies = sql_query(sqlStr, (movieTitle,))
	try:
		curMovie = curMovies[0]
		movieDict = {"title":curMovie["title"], 
					"description":curMovie["description"],
					"genre":curMovie['genres']}
	except IndexError:
		movieDict = {"title":f"no movie found with title '{movieName}'", 
					"description":"no description available", 
					"genre":"no genres available"}
	return movieDict

# top_recommendations: returns a dictionary of the 
# 	highest recommended movies
#
# parameters: none
# returns: dict, dictionary of movies 
def top_recommendations() -> dict:
	movieDict = {}
	# TODO: implement ml model here 
	listMovies = ['prometheus', 'star_wars', 'snatch']
	for i in range(len(listMovies)):
		movieDict[f"movie{i}"] = get_movie_by_name(listMovies[i])
	return movieDict

# puts the user rating and associated movie information into the reviews table
def rate_movie(movieName:str, userId:int, userRating:float) -> None:
	movieTitle = movieName.replace('_', ' ')
	movieStr = "SELECT movie_id FROM movies WHERE title=%s;"
	movieInfo = sql_query(movieStr, (movieTitle,))[0]
	checkStr = "SELECT * FROM reviews WHERE movie_id=%s AND user_id=%s;"
	check = sql_query(checkStr, (movieInfo["movie_id"], userId))
	if len(check):
		updateStr = "UPDATE reviews SET rating=%s WHERE movie_id=%s;"
		sql_query(updateStr, (userRating, movieInfo["movie_id"]))
	else:
		rateStr = "INSERT INTO reviews VALUES (%s, %s, %s, %s)"
		sql_query(rateStr, (userId, movieInfo['movie_id'], userRating, '0000-01-01'))
	return 

# print(rate_movie('prometheus', 1, 4.5))