from .db import db, environment, SCHEMA, add_prefix_for_prod

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('sections.id')))
    parent_task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id')))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000))
    priority = db.Column(db.Integer)
    due_date = db.Column(db.Date)
    due_time = db.Column(db.Time)
    duration = db.Column(db.Interval)
    repeat = db.Column(db.Boolean)
    repeat_type = db.Column(db.String(20))
    repeat_start = db.Column(db.Date)
    repeat_end = db.Column(db.Date)

    user = db.relationship('User', back_populates='tasks')
    project = db.relationship('Project', back_populates='tasks')
    subtasks = db.relationship('Task', back_populates='parent_task', cascade='all, delete')
    parent_task = db.relationship('Task', remote_side=[id], back_populates='subtasks')
    task_occurrences = db.relationship('Task_Occurrence', back_populates='task', cascade='all, delete')
    section = db.relationship('Section', back_populates='tasks')

    def add_subtask(self, subtask):
        subtask.parent_task_id = self.id
        db.session.add(subtask)
        db.session.commit()

    def remove_subtask(self, subtask):
        if subtask in self.subtasks:
            db.session.delete(subtask)
            db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'section_id': self.section_id,
            'parent_task_id': self.parent_task_id,
            'title': self.title,
            'description': self.description,
            'priority': self.priority,
            'due_date': self.due_date.strftime('%Y-%m-%d') if self.due_date else None,
            'due_time': self.due_time.strftime('%H:%M') if self.due_time else None,
            'duration': str(self.duration),
            'repeat': self.repeat,
            'repeat_type': self.repeat_type,
            'repeat_start': self.repeat_start,
            'repeat_end': self.repeat_end,
            'subtasks': [subtask.to_dict() for subtask in self.subtasks]
        }
