import mysql.connector 
import sys
import smtplib
import random
from email.message import EmailMessage

HOST = 'localhost'
USER = 'root'
DATABASE = 'FlickFinder'
#PASSWORD = 'Steelers19!'
PASSWORD = '123456'
EMAILADDRESS = 'flick.finder.recommender@gmail.com'
EMAILPASSWORD = 'ywvz lzum yfei pmah' # to login online -> Movie123

def sql_query(sqlString:str, sqlTuple:tuple) -> list:
	try: 
		connection = mysql.connector.connect(host=HOST, user=USER, database=DATABASE , password=PASSWORD)
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

# TODO: Should consolidate this into get_details_by_id
def get_movie_details_by_name(movieName:str) -> dict:
	movieDict = {}
	movieTitle = movieName.replace('_', ' ')
	sqlStr = "SELECT * FROM movies WHERE title=%s;"
	curMovies = sql_query(sqlStr, (movieTitle,))
	try:
		curMovie = curMovies[0] # this checks if movie with given title is found in db
		movieDict = {"title":curMovie["title"],
					"description":curMovie["description"],
					"genre":eval(curMovie['genres']),
					"id":curMovie["movie_id"],
					"director":curMovie["director"],
					"cast":eval(curMovie["cast"]),
					"runtime": curMovie["runtime"]
					}
	except IndexError:
		movieDict = {"title":f"no movie found with id '{movieName}'", 
					"description":"no description available", 
					"genre":"no genres available",
					"id":"no id available",
					"director": "no director",
					"cast":"no cast",
					"runtime": "no runtime"
					}
	return movieDict

def get_movie_details_by_id(movieId) -> dict:
	movieDict = {}
	sqlStr = "SELECT * FROM movies WHERE movie_id=%s;"
	curMovies = sql_query(sqlStr, (movieId,))
	try:
		curMovie = curMovies[0] # this checks if movie with given title is found in db
		movieDict = {"title":curMovie["title"], 
					"description":curMovie["description"],
					"genre":curMovie['genres'],
					"id":curMovie["movie_id"]}
	except IndexError:
		movieDict = {"title":f"no movie found with id '{movieId}'", 
					"description":"no description available", 
					"genre":"no genres available",
					"id":"no id available"}
	return movieDict

def search_movie_by_name(movieName:str) -> dict:
	movieDict = {}
	movieTitle = movieName.replace('_', ' ')
	# sqlStr = "SELECT * FROM movies WHERE title LIKE %s;"
	# curMovies = sql_query(sqlStr, (movieTitle,))
	# movieTitle = movieName.replace('_', ' ')
	sqlStr = "SELECT * FROM movies WHERE title LIKE %s ORDER BY popularity DESC LIMIT 10;"
	curMovies = sql_query(sqlStr, ('%' + movieTitle + '%',))
	i = 0
	for curMovie in curMovies:
		movieDict[f"movie{i}"] = get_movie_details_by_id(curMovie["movie_id"])
		i += 1
	return movieDict

def search_by_genre(genre:str) -> dict:
    movieDict = {}
    newGenre = genre.replace('_', ' ')
    
    sqlStr = "SELECT * FROM movies WHERE genres LIKE %s ORDER BY popularity DESC LIMIT 30;"
    curMovies = sql_query(sqlStr, ('%' + newGenre + '%',))
    
    i = 0
    for curMovie in curMovies:
        movieDict[f"movie{i}"] = get_movie_details_by_id(curMovie["movie_id"])
        i += 1

    # Extract 5 random movies from movieDict
    random_movies = dict(random.sample(movieDict.items(), 10))
    
    return random_movies


def get_recent_movies(userId:int) -> dict:
	interactedMovies = get_movies_interacted_with(userId)
	recentMoviesDict = {}
	recentMovTitleList = []
	for movieId in interactedMovies:
		recentMovTitleList.append(get_movie_title_by_id(movieId))
	for i in range(len(recentMovTitleList)):
		recentMoviesDict[f"movie{i}"] = get_movie_details_by_name(recentMovTitleList[i])
	return recentMoviesDict

def get_movies_interacted_with(userId:int) -> set:
	interactedMovies = set(get_user_ratings(userId).keys())
	likedMoviesDict = get_liked_movies(userId)
	for i in range(len(likedMoviesDict)):
		interactedMovies.add(likedMoviesDict[f"movie{i}"]['id'])
	dislikedMoviesDict = get_disliked_movies(userId)
	for i in range(len(dislikedMoviesDict)):
		interactedMovies.add(dislikedMoviesDict[f"movie{i}"]['id'])
	return interactedMovies

# top_recommendations: returns a dictionary of the 
# 	highest recommended movies
#
# parameters: int, user id for the given user 
# returns: dict, dictionary of movies 
def top_recommendations(userId:int) -> dict:
	# TODO: need to define behavior if user is not logged in 
	NUM_REC_MOVIES = 10
	movieDict = {}
	userRecsDict = weight_associated_movies(userId)
	interactedMovies = get_movies_interacted_with(userId)
	curMovIndex = 0
	userRecsIdList = []
	while len(userRecsIdList) < NUM_REC_MOVIES:
		curMovId = list(userRecsDict.keys())[curMovIndex]
		if curMovId not in interactedMovies:
			userRecsIdList.append(curMovId)
		curMovIndex += 1
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
			if(check[0]['is_liked'] == userOpinion):
				deleteStr = "DELETE FROM likes WHERE movie_id=%s AND user_id=%s;"
				sql_query(deleteStr, (movieId, userId))
			else:
				updateStr = "UPDATE likes SET is_liked=%s WHERE movie_id=%s;"
				sql_query(updateStr, (userOpinion, movieId))
		else:
			rateStr = "INSERT INTO likes VALUES (%s, %s, %s);"
			sql_query(rateStr, (userId, movieId, userOpinion))
	else:
		if userOpinion:
			try:
				opinionStatus['details'] = check[0]['is_liked']
			except IndexError:
				opinionStatus['details'] = 0
		elif len(check):
			deleteStr = "DELETE FROM likes WHERE movie_id=%s AND user_id=%s;"
			sql_query(deleteStr, (movieId, userId))
	return opinionStatus

def get_disliked_movies(userId:int) -> dict:
	return get_movies_for_opinion(userId, 2)

def get_liked_movies(userId:int) -> dict:
	curMovDict = get_favorite_movies(userId)
	return get_movies_for_opinion(userId, 3, movieDict=curMovDict)

def get_favorite_movies(userId:int) -> dict:
	return get_movies_for_opinion(userId, 4)

def get_movies_for_opinion(userId:int, opinion:int, movieDict=None) -> dict:
	if not movieDict:
		movieDict = dict()
	moviesOfInterest = sql_query("SELECT movie_id FROM likes WHERE user_id=%s AND is_liked=%s;", (userId, opinion))
	movieIds = []
	for curMovie in moviesOfInterest:
		movieIds.append(curMovie['movie_id'])
	movieTitleList = []
	for curMovId in movieIds:
		movieTitleList.append(get_movie_title_by_id(curMovId))
	keyBuffer = len(list(movieDict.keys()))
	for i in range(len(movieTitleList)):
		movieDict[f"movie{i + keyBuffer}"] = get_movie_details_by_name(movieTitleList[i])
	return movieDict

def get_sorted_ratings(userId:int) -> dict:
	movieDict = dict()
	userRatingDict = get_user_ratings(userId)
	sortedRatingMovDict = dict(sorted(userRatingDict.items(), key=lambda x:x[1], reverse=True))
	userRatedMovieIdList = list(sortedRatingMovDict.keys())
	ratedTitleList = []
	for curMovId in userRatedMovieIdList:
		ratedTitleList.append(get_movie_title_by_id(curMovId))
	for i in range(len(ratedTitleList)):
		movieDict[f"movie{i}"] = get_movie_details_by_name(ratedTitleList[i])
		movieDict[f"movie{i}"]['rating'] = list(sortedRatingMovDict.values())[i]
	return movieDict

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
	"""
	returns sorterd dictionary of movie_id by weight -> { movie_id: weight from recommender }
	"""
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

def send_recovery_email(userEmail:str) -> None:
	msg = EmailMessage()
	msg['Subject'] = "Password Reset"
	msg['From'] = EMAILADDRESS
	# msg['To'] = sql_query("SELECT email FROM users WHERE user_id=%s", (userId,))[0]['email']
	msg['To'] = "trallen@davidson.edu"
	
	recoveryCode = get_recovery_code(userEmail)
	msg.set_content(f"Your recovery code: {recoveryCode}")
	try:
		with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
			try:
				smtp.login(EMAILADDRESS, EMAILPASSWORD)
			except Exception as e:
				print(f'{e}')
			try:
				smtp.send_message(msg)
			except Exception as e:
				print(f'{e}')
	except Exception as e:
		print(f'{e}')

def get_recovery_code(userEmail:str) -> str:
	code = sql_query("SELECT username FROM users WHERE email=%s", (userEmail,))[0]['username']
	return code

def reset_password(userEmail:int, inputRecoveryCode:str, newPassword:str) -> None:
	userRecoveryCode = get_recovery_code(userEmail)
	if (inputRecoveryCode == userRecoveryCode):
		sql_query("UPDATE users SET password=%s WHERE email=%s",(newPassword, userEmail))

#def reset_password(userId:int, password) -> None:
	#sql_query("UPDATE users SET password=%s WHERE user_id=%s", (password, userId));

	#return 
