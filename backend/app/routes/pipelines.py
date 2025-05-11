from flask import Blueprint, request, jsonify
from app import db
from app.models.pipeline import Pipeline
from app.utils.auth_utils import jwt_required


pipelines_bp = Blueprint('pipelines', __name__)

@pipelines_bp.route('/', methods=['GET'])
@jwt_required
def get_pipelines():
    pipelines = Pipeline.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'status': p.status,
        'duration_seconds': p.duration_seconds,
        'started_at': p.started_at,
        'finished_at': p.finished_at
    } for p in pipelines])

@pipelines_bp.route('/', methods=['POST'])
@jwt_required
def create_pipeline():
    data = request.get_json()
    pipeline = Pipeline(
        name=data['name'],
        status=data.get('status', 'pending'),
        duration_seconds=data.get('duration_seconds', 0),
        started_at=data.get('started_at'),
        finished_at=data.get('finished_at')
    )
    db.session.add(pipeline)
    db.session.commit()
    return jsonify({'id': pipeline.id, 'message': 'Pipeline created'}), 201

@pipelines_bp.route('/<int:pipeline_id>', methods=['GET'])
@jwt_required
def get_pipeline(pipeline_id):
    pipeline = Pipeline.query.get_or_404(pipeline_id)
    return jsonify({
        'id': pipeline.id,
        'name': pipeline.name,
        'status': pipeline.status,
        'duration_seconds': pipeline.duration_seconds,
        'started_at': pipeline.started_at,
        'finished_at': pipeline.finished_at
    })

@pipelines_bp.route('/<int:pipeline_id>', methods=['DELETE'])
@jwt_required
def delete_pipeline(pipeline_id):
    pipeline = Pipeline.query.get_or_404(pipeline_id)
    db.session.delete(pipeline)
    db.session.commit()
    return jsonify({'message': 'Pipeline deleted'})
