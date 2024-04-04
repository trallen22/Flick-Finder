from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from flask_mysqldb import MySQL
from user import User
from backend_funcs import top_recommendations, get_movie_details_by_name, sql_query, rate_movie, user_opinion_of_movie, search_movie_by_name, get_disliked_movies, get_liked_movies, get_favorite_movies

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'Steelers19!'
app.config['MYSQL_DB'] = 'FlickFinder'
app.config['SECRET_KEY'] = 'secret1'

api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)
mysql = MySQL(app)
login_manager = LoginManager(app)
login_manager.login_view = "/sign-up"

@login_manager.user_loader
def load_user(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE user_id=%s;", (user_id,))
    user_data = cursor.fetchall()[0]
    cursor.close()
    return User(user_id, user_data[1])

class Login(Resource):
    def get(self):
        return
    def post(self):
        jsonData = request.get_json()
        loginStatus = { "status": "", "details": "" }
        missingInput = 0
        try: 
            username = jsonData['username']
        except KeyError:
            loginStatus = { "status": "failed", "details": "missing username" }
            missingInput = 1
        try:
            password = jsonData['password']
        except KeyError:
            loginStatus = { "status": "failed", "details": "missing password" }
            missingInput = 1
        if not missingInput:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE username=%s;", (username,))
            # TODO: need to add exception handling here as well if user not found 
            foundUser = 1
            try:
                user_data = cursor.fetchall()[0]
            except: 
                loginStatus = { "status": "failed", "details": "username not found" }
                foundUser = 0
            cursor.close()
            if foundUser:
                hashed_password = user_data[2]
                is_valid = bcrypt.check_password_hash(hashed_password, password) 
                if (is_valid):
                    login_user(User(user_data[0], user_data[1]))
                    loginStatus = { "status": "success", "details": "user successfully logged in" }
                else:
                    loginStatus = { "status": "failed", "details": "incorrect password" }
        return loginStatus

class Logout(Resource):
    # @login_required
    def get(self):
        logout_user()
        return redirect('/home')

class GetUser(Resource):
    def get(self):
        try:
            userStatus = { "user_id": str(current_user.id) }
        except Exception as e:
            userStatus = { "user_id": "-1" }
        return userStatus

class Profile(Resource): 
    def get(self):
        try:
            curUserId = current_user.id 
        except Exception as e:
            curUserId = -1
        profileStatus = dict()
        profileStatus['username'] = sql_query("SELECT username FROM users WHERE user_id=%s;", (curUserId,))[0]['username']
        profileStatus['likes'] = get_liked_movies(curUserId)
        profileStatus['dislikes'] = get_disliked_movies(curUserId)
        profileStatus['favorites'] = get_favorite_movies(curUserId)
        return profileStatus

class SignUp(Resource):
    def get(self):
        return jsonify({"movie0": { "title": "no title for movie 1", "description": "no description" }, 
                "movie1": { "title": "no title for movie 2", "description": "no description" }, 
                "movie2": { "title": "no title for movie 3", "description": "no description" }})
    def post(self):
        jsonData = request.get_json()
        signupStatus = { "status": "", "details": "" }
        missingInput = 0
        try: 
            username = jsonData['username']
        except KeyError:
            signupStatus = { "status": "failed", "details": "missing username" }
            missingInput = 1
        try:
            password = jsonData['password']
        except KeyError:
            signupStatus = { "status": "failed", "details": "missing password" }
            missingInput = 1
        try:
            email = jsonData['email']
        except KeyError:
            signupStatus = { "status": "failed", "details": "missing email" }
            missingInput = 1
        if not missingInput:
            if len(sql_query("SELECT * FROM users WHERE username=%s", (username,))):
                signupStatus = { "status": "failed", "details": "username already taken" }
            elif len(sql_query("SELECT * FROM users WHERE email=%s;", (email,))):
                signupStatus = { "status": "failed", "details": "email already taken" }
            else: 
                hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
                try:
                    sql_query("INSERT INTO users VALUES (%s, %s, %s, %s);", (None, username, hashed_password, email))
                    signupStatus = { "status": "success", "details": "user successfully signed up" }
                except Exception:
                    signupStatus = { "status": "failed", "details": "error reaching database" }
        return signupStatus  

class Movie(Resource):
    def get(self, movieName:str): # TODO: need to look into how spaces in titles are being represented in fetch 
        return get_movie_details_by_name(movieName)

class TopRecommendations(Resource):
    # @login_required
    def get(self):
        # TODO: need to figure out how to handle if no user is logged in 
        # currently returns random movies
        try: 
            curUserId = current_user.id
        except Exception as e:
            curUserId = -1
        return top_recommendations(curUserId)

# TODO: need to implement GET reqeust and clean up POST
class RateMovie(Resource):
    def post(self, movieName):
        jsonData = request.get_json()
        userRating = float(jsonData['rating'])
        try:
            curUserId = current_user.id
        except Exception as e:
            curUserId = -1
        # TODO: need logic if user not logged in 
        # return rate_movie(movieTitle, curUserId, userRating)
        return rate_movie(movieName, 1, userRating)

# TODO: need to implement like/dislike/favorite GET
class UserOpinion(Resource): 
    def post(self, movieName:str):
        jsonData = request.get_json()
        userOpinion = int(jsonData['opinion'])
        try:
            curUserId = current_user.id
        except Exception as e:
            curUserId = -1
        # TODO: need logic if user not logged in 
        # return user_opinion_of_movie(movieTitle, curUserId, userOpinion) 
        return user_opinion_of_movie(movieName, 1, userOpinion) 

class MovieSearch(Resource):
    def get(self, movieName:str): # TODO: need to look into how spaces in titles are being represented in fetch 
        return search_movie_by_name(movieName)


api.add_resource(TopRecommendations, "/top-recommendations")
api.add_resource(Movie, "/movie/<movieName>")
api.add_resource(SignUp, "/sign-up")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(GetUser, "/get-user")
api.add_resource(Profile, "/profile")
# TODO: need to decide how to setup url; /movie/<movieName>/rating or /rating/<movieName>; 
#       former might be easier to implement with react useLocation() 
api.add_resource(RateMovie, "/movie/<movieName>/rating") # TODO: change these to id in case there are movies with duplicate names
api.add_resource(UserOpinion, "/movie/<movieName>/opinion") # TODO: same ^
api.add_resource(MovieSearch, "/search-movies/<movieName>")

if __name__ == "__main__":
    app.run(debug=True)