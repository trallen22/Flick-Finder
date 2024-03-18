from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, id, name, active=True):
        self.id = id
        self.name = name
        self.active = active