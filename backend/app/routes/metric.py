from flask import Blueprint, jsonify
from app.models.metrics import Metrics
from app.utils.auth_utils import jwt_required

metrics_bp = Blueprint('metrics', __name__)

@metrics_bp.route('/', methods=['GET'])
@jwt_required
def get_metrics():
    metrics = Metrics.query.order_by(Metrics.timestamp.desc()).limit(15).all()
    return jsonify([{
        'service': m.service,
        'uptime': m.uptime_percent,
        'errors': m.error_count,
        'latency': m.avg_latency_ms,
        'timestamp': m.timestamp
    } for m in metrics])
