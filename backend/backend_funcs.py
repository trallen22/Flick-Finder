import mysql.connector 
import sys

HOST = 'localhost'
USER = 'root'
DATABASE = 'FlickFinder'
PASSWORD = '123456'

def sql_query(sqlString:str, sqlTuple:tuple) -> list:
	try: 
		connection = mysql.connector.connect(host=HOST, user=USER, database=DATABASE, password=PASSWORD)
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
	curMovId = sql_query("SELECT movie_id FROM movies WHERE title=%s;", (movieTitle,))[0]['movie_id']
	return curMovId

def get_movie_title_by_id(movieId:int) -> str:
	curMovTitle = sql_query("SELECT title FROM movies WHERE movie_id=%s;", (movieId,))[0]['title']
	return curMovTitle

# TODO: should user rating, liked/disliked be returned from this function? 
def get_movie_details_by_name(movieName:str) -> dict:
	movieDict = {}
	movieTitle = movieName.replace('_', ' ')
	sqlStr = "SELECT * FROM movies WHERE title=%s;"
	curMovies = sql_query(sqlStr, (movieTitle,))
	try:
		curMovie = curMovies[0] # this checks if movie with given title is found in db
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
# TODO: need to implement logic so that movies that have been rated aren't recommended 
def top_recommendations(userId:int) -> dict:
	# TODO: need to define behavior if user is not logged in 
	NUM_REC_MOVIES = 5
	movieDict = {}
	userRecsDict = weight_associated_movies(userId)
	userRecsIdList = list(userRecsDict.keys())[:NUM_REC_MOVIES]
	userRecsTitleList = []
	for curMovId in userRecsIdList:
		userRecsTitleList.append(get_movie_title_by_id(curMovId))
	for i in range(len(userRecsTitleList)):
		movieDict[f"movie{i}"] = get_movie_details_by_name(userRecsTitleList[i])
	return movieDict

# puts the user rating and associated movie information into the reviews table
# TODO: could look into implementing removing a rating for a movie
# --> could rate from 0.5-5 and then have 0 as the remove value 
def rate_movie(movieName:str, userId:int, userRating:float) -> None:
	# TODO: is this necessary 
	movieTitle = movieName.replace('_', ' ')
	movieId = get_movie_id_by_title(movieTitle)
	# checking if movie has already been rated 
	checkStr = "SELECT * FROM reviews WHERE movie_id=%s AND user_id=%s;"
	check = sql_query(checkStr, (movieId, userId))
	# TODO: Do we need to implement the date of rating a movie? 
	if len(check):
		updateStr = "UPDATE reviews SET rating=%s WHERE movie_id=%s;"
		sql_query(updateStr, (userRating, movieId))
	else:
		rateStr = "INSERT INTO reviews VALUES (%s, %s, %s, %s);"
		sql_query(rateStr, (userId, movieId, userRating, '0000-01-01'))
	return 

# TODO: need to look into how to represent userOpinion, I think int is the best way   
# --> could make dislike = 2, like = 3, favorite = 4, check opinion = 1, 0 to remove an opinion from db 
# TODO: should getting user opinion be it's own function? I think no 
def user_opinion_of_movie(movieName:str, userId:int, userOpinion:int) -> None:
	"""
	parameter: 
		userOpinion - int, 0 -> remove opinion; 1 -> return opinion; 2 -> dislike movie; 3 -> like movie; 4 -> favorite movie 
	"""
	opinionStatus = { "status": "success", "details": "" }
	movieTitle = movieName.replace('_', ' ')
	movieId = get_movie_id_by_title(movieTitle)
	# checking if movie has already been liked/disliked/favorited  
	checkStr = "SELECT is_liked FROM likes WHERE movie_id=%s AND user_id=%s;"
	check = sql_query(checkStr, (movieId, userId))
	# TODO: Do we want to implement the date of liking a movie? 
	if userOpinion > 1:
		if len(check):
			updateStr = "UPDATE likes SET is_liked=%s WHERE movie_id=%s;"
			sql_query(updateStr, (userOpinion, movieId))
		else:
			rateStr = "INSERT INTO likes VALUES (%s, %s, %s);"
			sql_query(rateStr, (userId, movieId, userOpinion))
	else:
		if userOpinion:
			# TODO: need to add logic if user hasn't liked/disliked a movie; need to figure out what to return if not liked 
			try:
				opinionStatus['details'] = check[0]['is_liked']
			except IndexError:
				opinionStatus['details'] = 0
		elif len(check):
			deleteStr = "DELETE FROM likes WHERE movie_id=%s AND user_id=%s;"
			sql_query(deleteStr, (movieId, userId))
	return opinionStatus

def get_user_ratings(userId:int) -> dict:
	"""
	returns: dict, dictionary of { movie1_id: rating, movie2_id: rating, ... } 
	"""
	userRatingDict = dict()
	userRatingList = sql_query("SELECT movie_id, rating FROM reviews WHERE user_id=%s;", (userId,))
	for curRating in userRatingList: 
		userRatingDict[curRating['movie_id']] = curRating['rating']
	return userRatingDict

def get_associated_movies() -> list: 
	associatedMovies = sql_query("SELECT * FROM recommendations;", ())
	return associatedMovies 

# TODO: need to look into how likes/dislikes/favorites will affect the recommendations 
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
	sortedWeightMovDict = dict(sorted(weightedMovieDict.items(), key=lambda x:x[1], reverse=True))
	return sortedWeightMovDict

# ##############
# Used for testing 
# print("don't forget to comment the code below!!") 
# rate_movie("Prometheus", 1, 5)
# rate_movie("Finding Nemo", 1, 1)
# rate_movie("Forrest Gump", 1, 2)
# rate_movie("Walk on Water", 1, 1)
# rate_movie("The Dark Knight", 1, 5)
# rate_movie("Batman Begins", 1, 5)

# print(top_recommendations(1))

# print(user_opinion_of_movie("Batman Begins", 1, 3)) 
# print(user_opinion_of_movie("Prometheus", 1, 4)) 
# print(user_opinion_of_movie("The Dark Knight", 1, 1)) 
