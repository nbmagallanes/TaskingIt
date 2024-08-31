from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, Task, db
from app.forms import TaskForm
from .project_routes import project_routes

task_routes = Blueprint('tasks', __name__)

@project_routes.route('/<int:project_id>/tasks', methods=["GET"])
@login_required
def get_tasks_by_project(project_id):
    project = Project.query.get(project_id)

    if project.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    tasks = Task.query.filter_by(project_id=project_id, user_id=current_user.id).all()

    if not tasks:
        return jsonify([])
    
    return jsonify([task.to_dict() for task in tasks])


@task_routes.route('/current', methods=["GET"])
@login_required
def get_tasks_by_user():
    tasks = Task.query.filter_by(user_id=current_user.id).all()
    
    if not tasks:
        return jsonify([])
    
    return jsonify([task.to_dict() for task in tasks])


@task_routes.route('/<int:task_id>', methods=["GET"])
@login_required
def get_task(task_id):
    task = Task.query.get(task_id)
    
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    if task.user_id != current_user.id:
            return jsonify({"error": "Unauthorized"}), 403
    
    return jsonify(task.to_dict())

@task_routes.route('/new', methods=["POST"])
@login_required
def post_task():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        if form.data['duration']:
            form_duration=form.data['duration']
            duration=Task.convert_duration(form_duration)

        new_task = Task(
            user_id=current_user.id,
            project_id=form.data['project_id'],
            section_id=form.data['section_id'],
            title=form.data['title'],
            description=form.data['description'] if form.data['description'] else None,
            priority=form.data['priority'],
            due_date=form.data['due_date'],
            due_time=form.data['due_time'],
            duration=duration if form.data['duration'] else None,
            repeat=form.data['repeat'],
            repeat_type=form.data['repeat_type'] if form.data['repeat_type'] else None,
            repeat_start=form.data['repeat_start'],
            repeat_end=form.data['repeat_end']
        )

        db.session.add(new_task)
        db.session.commit()

        return jsonify(new_task.to_dict())
    else:
        errors = form.errors
        return jsonify({'errors': errors}), 400

@task_routes.route('/<int:task_id>', methods=["PUT"])
@login_required
def edit_task(task_id):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        task = Task.query.get(task_id)

        if not task:
            return jsonify({"error": "Task not found"}), 404
        
        if task.user_id != current_user.id:
            return jsonify({"error": "Unauthorized"}), 403

        if form.data['duration']:
            form_duration=form.data['duration']
            duration=Task.convert_duration(form_duration)

        task.project_id=form.data['project_id']
        task.section_id=form.data['section_id']
        task.title=form.data['title']
        task.description=form.data['description'] if form.data['description'] else None
        task.priority=form.data['priority']
        task.due_date=form.data['due_date']
        task.due_time=form.data['due_time']
        task.duration=duration if form.data['duration'] else None
        task.repeat=form.data['repeat']
        task.repeat_type=form.data['repeat_type'] if form.data['repeat_type'] else None
        task.repeat_start=form.data['repeat_start']
        task.repeat_end=form.data['repeat_end']

        db.session.commit()

        return jsonify(task.to_dict())
    else:
        errors = form.errors
        return jsonify({'errors': errors}), 400
    
@task_routes.route('/<int:task_id>', methods=["DELETE"])
@login_required
def delete_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    if current_user.id != task.user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task successfully deleted"}), 200