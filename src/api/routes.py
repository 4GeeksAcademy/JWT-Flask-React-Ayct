from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User

api = Blueprint('api', __name__)

@api.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from the backend!"})

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 400
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid credentials"}), 401
    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"msg": f"Hello {user.email}, you are authenticated!"})