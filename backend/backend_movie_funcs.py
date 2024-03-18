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

def check_user_credentials() -> dict:
	return 