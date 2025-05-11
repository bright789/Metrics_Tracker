from datetime import datetime
from app import db

class Commit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    repo = db.Column(db.String(128), nullable=False)
    author = db.Column(db.String(64))
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
