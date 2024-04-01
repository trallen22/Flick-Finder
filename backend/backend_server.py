from pydoc import describe
from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from flask_mysqldb import MySQL
from user import User
from backend_movie_funcs import top_recommendations, get_movie_by_name, sql_query

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
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
        username = jsonData['username']
        password = jsonData['password']

        try:
            if not username:
                raise ValueError("Username cannot be empty")
            if not password:
                raise ValueError("Password cannot be empty")
            #should there be some call back to the login function

            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE username=%s;", (username,))
            user_data = cursor.fetchall()[0]
            cursor.close()

            hashed_password = user_data[2]
            is_valid = bcrypt.check_password_hash(hashed_password, password) 
            #add try, excepts, defaults, just in login and sign up, if there is none, it should fail, status failed
            if (is_valid):
                login_user(User(user_data[0], user_data[1]))
                loginStatus = { "status": "success" }
            else:
                loginStatus = { "status": "failed" }
        except Exception as e:
            loginStatus = {"error": str(e) }
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

class SignUp(Resource):
    def get(self):
        return jsonify({"movie0": { "title": "no title for movie 1", "description": "no description" }, 
                "movie1": { "title": "no title for movie 2", "description": "no description" }, 
                "movie2": { "title": "no title for movie 3", "description": "no description" }})
    def post(self):
        jsonData = request.get_json()
        username = jsonData["username"]
        password = jsonData["password"]

        try:
            if not username:
                raise ValueError("Username cannot be empty")
            if not password:
                raise ValueError("Password cannot be empty")

            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            sql_query("INSERT INTO users VALUES (%s, %s, %s)", (None, username, hashed_password))
        except Exception as e:
            signupStatus = {"error", str(e) }
        return {}

class Movie(Resource):
    def get(self, movieName:str):
        return get_movie_by_name(movieName)

class TopRecommendations(Resource):
    @login_required
    def get(self):
        return top_recommendations()

api.add_resource(TopRecommendations, "/top-recommendations")
api.add_resource(Movie, "/movie/<movieName>")
api.add_resource(SignUp, "/sign-up")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(GetUser, "/get_user")

if __name__ == "__main__":
    app.run(debug=True)