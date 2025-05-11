from flask import Blueprint
from app.utils.auth_utils import jwt_required
from app.utils.report_generator import generate_csv_report

report_bp = Blueprint('report', __name__)

@report_bp.route('/csv', methods=['GET'])
@jwt_required
def get_csv_report():
    return generate_csv_report()
