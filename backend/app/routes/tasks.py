from flask import request, jsonify, Blueprint
from app import db
from app.models.task import Task
from app.utils.auth_utils import jwt_required

# Routes for Tasks
tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/', methods=['GET'])
@jwt_required
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'created_at': task.created_at,
        'status': task.status
    } for task in tasks])

@tasks_bp.route('/', methods=['POST'])
@jwt_required
def create_task():
    data = request.get_json()
    task = Task(title=data['title'], description=data.get('description', ''))
    db.session.add(task)
    db.session.commit()
    return jsonify({'id': task.id, 'message': 'Task created'}), 201

@tasks_bp.route('/<int:task_id>', methods=['GET'])
@jwt_required
def get_task(task_id):
    task = Task.query.get_or_404(task_id)
    return jsonify({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'created_at': task.created_at,
        'status': task.status
    })

@tasks_bp.route('/<int:task_id>', methods=['PUT'])
@jwt_required
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)
    db.session.commit()
    return jsonify({'message': 'Task updated'})

@tasks_bp.route('/<int:task_id>', methods=['DELETE'])
@jwt_required
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})
