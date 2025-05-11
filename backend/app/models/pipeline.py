from datetime import datetime
from app import db

class Pipeline(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    status = db.Column(db.String(32))
    duration_seconds = db.Column(db.Integer)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    finished_at = db.Column(db.DateTime)
