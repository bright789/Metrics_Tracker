import random
from datetime import datetime
from app import db
from app.models.metrics import Metrics

def simulate_metrics():
    services = ['auth-service', 'task-service', 'pipeline-service']
    for service in services:
        metric = Metrics(
            service=service,
            uptime_percent=round(random.uniform(95.0, 100.0), 2),
            error_count=random.randint(0, 5),
            avg_latency_ms=round(random.uniform(100, 300), 2),
            timestamp=datetime.utcnow()
        )
        db.session.add(metric)
    db.session.commit()
