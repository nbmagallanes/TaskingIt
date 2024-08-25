from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, db
from app.forms import ProjectForm

project_routes = Blueprint('projects', __name__)

@project_routes.route('/current')
@login_required
def get_projects_by_user():
    projects = Project.query.filter_by(user_id=current_user.id).all()

    if not projects:
        return jsonify({'error': 'No projects found'}), 404
    
    return jsonify([project.to_dict() for project in projects])

@project_routes.route('/<int:project_id>')
@login_required
def get_projects_by_id(project_id):
    project = Project.query.get(project_id)

    if not project:
        return jsonify({'error': 'No project found'}), 404
    
    return jsonify(project.to_dict())

@project_routes.route('/new', methods=["POST"])
@login_required
def post_project():
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_project = Project(
            user_id=current_user.id,
            name=form.data['name'],
            description=form.data['description'],
            color=form.data['color']
        )
        db.session.add(new_project)
        db.session.commit()
        
        return jsonify(new_project.to_dict())
    else:
        errors = form.errors
        return jsonify({'errors': errors}), 400


@project_routes.route('/<int:project_id>', methods=["PUT"])
@login_required
def edit_project(project_id):
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        project = Project.query.get(project_id)

        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        if project.user_id != current_user.id:
            return jsonify({"error": "Unauthorized"}), 403
        
        project.name=form.data['name']
        project.description=form.data['description']
        project.color=form.data['color']

        db.session.commit()

        return jsonify(project.to_dict()), 200
    else:
        errors = form.errors
        return jsonify({'errors': errors}), 400
    

@project_routes.route('/<int:project_id>', methods=["DELETE"])
@login_required
def delete_project(project_id):
    project = Project.query.get(project_id)

    if not project:
        return jsonify({"error": "Project not found"}), 404
        
    if project.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403
    
    db.session.delete(project)
    db.session.commit()

    return jsonify({"message": "Project successfully deleted"}), 200



