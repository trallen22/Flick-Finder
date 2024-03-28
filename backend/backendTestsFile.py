from backend_movie_funcs import rate_movie
from os import system 

system('curl -X POST http://127.0.0.1:5000/sign-up -d \'{ "username": "ta1", "password": "123", "email": "test@email.com" }\' -H "Content-Type: application/json"')

rate_movie("Prometheus", 1, 5)
rate_movie("Finding Nemo", 1, 4.5)
rate_movie("Forrest Gump", 1, 5)
rate_movie("Walk on Water", 1, 1)