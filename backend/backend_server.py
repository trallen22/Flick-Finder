from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Resource, Api

from backend_movie_funcs import top_recommendations, get_movie_by_name

app = Flask(__name__)
api = Api(app)
CORS(app)

class Movie(Resource):
    def get(self, movieName:str):
        return get_movie_by_name(movieName)

class TopRecommendations(Resource):
    def get(self):
        return top_recommendations()

api.add_resource(TopRecommendations, "/top-recommendations")
api.add_resource(Movie, "/movie/<movieName>")


if __name__ == "__main__":
    app.run(debug=True)