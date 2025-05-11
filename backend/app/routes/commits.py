from flask import Blueprint, request, jsonify
from app import db
from app.models.commit import Commit
from app.utils.auth_utils import jwt_required

commits_bp = Blueprint('commits', __name__)

@commits_bp.route('/', methods=['GET'])
@jwt_required
def get_commits():
    commits = Commit.query.all()
    return jsonify([{
        'id': c.id,
        'repo': c.repo,
        'author': c.author,
        'message': c.message,
        'timestamp': c.timestamp
    } for c in commits])

@commits_bp.route('/', methods=['POST'])
@jwt_required
def create_commit():
    data = request.get_json()
    commit = Commit(
        repo=data['repo'],
        author=data.get('author', ''),
        message=data.get('message', '')
    )
    db.session.add(commit)
    db.session.commit()
    return jsonify({'id': commit.id, 'message': 'Commit added'}), 201

@commits_bp.route('/<int:commit_id>', methods=['GET'])
@jwt_required
def get_commit(commit_id):
    commit = Commit.query.get_or_404(commit_id)
    return jsonify({
        'id': commit.id,
        'repo': commit.repo,
        'author': commit.author,
        'message': commit.message,
        'timestamp': commit.timestamp
    })

@commits_bp.route('/<int:commit_id>', methods=['DELETE'])
@jwt_required
def delete_commit(commit_id):
    commit = Commit.query.get_or_404(commit_id)
    db.session.delete(commit)
    db.session.commit()
    return jsonify({'message': 'Commit deleted'})
