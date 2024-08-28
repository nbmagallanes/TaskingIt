from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, Section, db
from app.forms import ProjectForm, SectionForm

project_routes = Blueprint('projects', __name__)

@project_routes.route('/user/<int:user_id>')
@login_required
def get_projects_by_user(user_id):
    if current_user.id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    projects = Project.query.filter_by(user_id=user_id).all()

    if not projects:
        return jsonify({'error': 'No projects found'}), 404
    
    return jsonify([project.to_dict() for project in projects])

@project_routes.route('/<int:project_id>')
@login_required
def get_projects_by_id(project_id):
    project = Project.query.get(project_id)

    if not project:
        return jsonify({'error': 'No project found'}), 404
    
    if current_user.id != project.user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
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


# Section Routes

@project_routes.route('/<int:project_id>/sections', methods=["GET"])
@login_required
def get_sections_by_project(project_id):

    project = Project.query.get(project_id)

    if current_user.id != project.user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    sections = Section.query.filter_by(project_id=project_id).all()

    if not sections:
        return jsonify([]), 200

    
    return jsonify([section.to_dict() for section in sections]), 200

@project_routes.route('/<int:project_id>/sections/<int:section_id>', methods=["GET"])
@login_required
def get_section_by_id(project_id, section_id):

    section = Section.query.filter_by(id=section_id, project_id=project_id).one_or_none()

    if not section:
        return jsonify({'error': 'Section not found'}), 404

    if current_user.id != section.user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    return jsonify(section.to_dict()), 200

@project_routes.route('/<int:project_id>/sections/new', methods=["POST"])
@login_required
def post_section(project_id):
    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    project = Project.query.get(project_id)

    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    if current_user.id != project.user_id:
        return jsonify({'error': 'Unauthorized'}), 403


    if form.validate_on_submit():
        new_section = Section(
            user_id=current_user.id,
            project_id=project_id,
            name=form.data['name']
        )

        db.session.add(new_section)
        db.session.commit()

        return jsonify(new_section.to_dict()), 200
    else:
        errors = form.errors
        return jsonify({'errors': errors}), 400
    
@project_routes.route('/<int:project_id>/sections/<int:section_id>', methods=["PUT"])
@login_required
def edit_section(project_id, section_id):
    form = SectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    section = Section.query.filter_by(id=section_id, project_id=project_id).one_or_none()

    if not section:
        return jsonify({'error': 'Section not found'}), 404
    
    if current_user.id != section.user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    if form.validate_on_submit():
        
        section.project_id=form.data['project_id']
        section.name=form.data['name']
        db.session.commit()

        return jsonify(section.to_dict()), 200
    else:
        errors = form.errors
        return jsonify({'errors': errors}), 400
    
@project_routes.route('/<int:project_id>/sections/<int:section_id>', methods=["DELETE"])
@login_required
def delete_section(project_id, section_id):
    section = Section.query.filter_by(id=section_id, project_id=project_id).one_or_none()

    if not section:
        return jsonify({'error': 'Section not found'}), 404
    
    if current_user.id != section.user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(section)
    db.session.commit()

    return jsonify({"message": "Section successfully deleted"}), 200
    


    
