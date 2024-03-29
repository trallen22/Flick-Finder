import mysql.connector 
import sys

HOST = 'localhost'
USER = 'root'
DATABASE = 'FlickFinder'
# PASSWORD = 'Steelers19!'

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

def get_movie_id_by_title(movieTitle:str) -> int:
	curMovId = sql_query("SELECT movie_id FROM movies WHERE title=%s", (movieTitle,))[0]['movie_id']
	return curMovId

def get_movie_title_by_id(movieId:int) -> str:
	curMovTitle = sql_query("SELECT title FROM movies WHERE movie_id=%s", (movieId,))[0]['title']
	return curMovTitle

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
# parameters: int, user id for the given user 
# returns: dict, dictionary of movies 
def top_recommendations(userId:int=1) -> dict:
	NUM_REC_MOVIES = 5
	movieDict = {}
	userRecsDict = weight_associated_movies(userId)
	userRecsIdList = list(userRecsDict.keys())[:NUM_REC_MOVIES]
	userRecsTitleList = []
	for curMovId in userRecsIdList:
		userRecsTitleList.append(get_movie_title_by_id(curMovId))
	for i in range(len(userRecsTitleList)):
		movieDict[f"movie{i}"] = get_movie_by_name(userRecsTitleList[i])
	return movieDict

# puts the user rating and associated movie information into the reviews table
def rate_movie(movieName:str, userId:int, userRating:float) -> None:
	movieTitle = movieName.replace('_', ' ')
	movieStr = "SELECT movie_id FROM movies WHERE title=%s;"
	movieInfo = sql_query(movieStr, (movieTitle,))[0]
	# check if movie has already been rated 
	checkStr = "SELECT * FROM reviews WHERE movie_id=%s AND user_id=%s;"
	check = sql_query(checkStr, (movieInfo["movie_id"], userId))
	if len(check):
		updateStr = "UPDATE reviews SET rating=%s WHERE movie_id=%s;"
		sql_query(updateStr, (userRating, movieInfo["movie_id"]))
	else:
		rateStr = "INSERT INTO reviews VALUES (%s, %s, %s, %s)"
		sql_query(rateStr, (userId, movieInfo['movie_id'], userRating, '0000-01-01'))
	return 

def get_user_ratings(userId:int) -> dict:
	userRatingDict = dict()
	userRatingList = sql_query("SELECT movie_id, rating FROM reviews WHERE user_id=%s", (userId,))
	for curRating in userRatingList: 
		userRatingDict[curRating['movie_id']] = curRating['rating']
	return userRatingDict

def get_associated_movies() -> list: 
	associatedMovies = sql_query("SELECT * FROM recommendations", ())
	return associatedMovies 

def weight_associated_movies(userId:int) -> dict:
	WEIGHT_MULTIPLIER = 1
	# TODO: could look into how changing these weights affects recommendations 
	REC_WEIGHTS = {
		"rec_one": 10, 
		"rec_two": 9, 
		"rec_three": 8, 
		"rec_four": 7, 
		"rec_five": 6, 
		"rec_six": 5, 
		"rec_seven": 4, 
		"rec_eight": 3, 
		"rec_nine": 2, 
		"rec_ten": 1
	}
	REC_KEYS = list(REC_WEIGHTS.keys())
	userRatingsDict = get_user_ratings(userId)
	assocMovieList = get_associated_movies()
	weightedMovieDict = dict() # { movie_id: calculated weight }
	for curMovAndRecs in assocMovieList:
		# print(curMovAndRecs)
		try: 
			curMovRating = userRatingsDict[curMovAndRecs['movie_id']]
		except KeyError: 
			# TODO: could look into finding a good default value if movie not already rated 
			curMovRating = 0
		for recNum in REC_KEYS:
			curRecMovieId = curMovAndRecs[recNum]
			userWeightedCurRec = curMovRating * REC_WEIGHTS[recNum] * WEIGHT_MULTIPLIER
			try:
				weightedMovieDict[curRecMovieId] += userWeightedCurRec
			except KeyError:
				weightedMovieDict[curRecMovieId] = userWeightedCurRec
		# print(weightedMovieDict)
		# pass
	sortedWeightMovDict = dict(sorted(weightedMovieDict.items(), key=lambda x:x[1], reverse=True))
	return sortedWeightMovDict

# print(get_user_ratings(1))
# print(get_associated_movies())
# print(weight_associated_movies(1))
x = top_recommendations()
for i in list(x.keys()):
	print(f"{i[-1]}: {x[i]['title']}")
