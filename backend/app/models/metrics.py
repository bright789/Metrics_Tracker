from app import db
from datetime import datetime

class Metrics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    service = db.Column(db.String(64))
    uptime_percent = db.Column(db.Float)
    error_count = db.Column(db.Integer)
    avg_latency_ms = db.Column(db.Float)
