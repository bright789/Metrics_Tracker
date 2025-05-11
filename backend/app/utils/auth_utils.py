from flask import request, jsonify
import jwt
from functools import wraps
from app.models.user import User
from flask import current_app

def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]

        if not token:
            return jsonify({'error': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            user = User.query.get(data['user_id'])
            if not user:
                raise ValueError("User not found")
        except Exception as e:
            return jsonify({'error': 'Token is invalid or expired!', 'details': str(e)}), 401

        return f(*args, **kwargs)
    return decorated
