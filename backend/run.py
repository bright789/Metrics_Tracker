from flask import Flask, request, jsonify
from app import db
from flask_cors import CORS
from app.models import Task, Commit, Pipeline, User, Metrics

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///devops_tracker.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'dev-secret-key'

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
    db.init_app(app)

    @app.before_request
    def handle_preflight():
        if request.method == 'OPTIONS':
            response = jsonify({'status': 'CORS preflight OK'})
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            return response

    @app.route('/')
    def health():
        return jsonify({'status': 'OK'})
    
    # Register blueprints
    from app.routes.report import report_bp
    from app.routes.metric import metrics_bp
    from app.routes.auth import auth_bp
    from app.routes.tasks import tasks_bp
    from app.routes.commits import commits_bp
    from app.routes.pipelines import pipelines_bp

    app.register_blueprint(report_bp, url_prefix='/api/report')
    app.register_blueprint(metrics_bp, url_prefix='/api/metrics')
    app.register_blueprint(tasks_bp, url_prefix='/api/tasks')
    app.register_blueprint(commits_bp, url_prefix='/api/commits')
    app.register_blueprint(pipelines_bp, url_prefix='/api/pipelines')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    with app.app_context():
        db.create_all()

    from threading import Thread
    from time import sleep
    from app.jobs.monitor import simulate_metrics

    def run_metrics_job():
        while True:
            with app.app_context():
                simulate_metrics()
            sleep(30)  # simulate every 30 seconds

    Thread(target=run_metrics_job, daemon=True).start()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0')
