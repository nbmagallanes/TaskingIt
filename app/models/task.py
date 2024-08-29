from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timedelta

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('sections.id')))
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
    task_occurrences = db.relationship('Task_Occurrence', back_populates='task', cascade='all, delete')
    section = db.relationship('Section', back_populates='tasks')

    def end_time(self):
        if self.due_time and self.duration:
            end_time = (datetime.combine(self.due_date, self.due_time) + self.duration).time()
            return end_time
        return None
    
    def format_duration(self):
        duration = str(self.duration)
        hours, minutes, seconds = duration.split(':')
        return f"{int(hours):02}:{int(minutes):02}"

    @staticmethod
    def convert_duration(duration_str):
        hours, minutes = map(int, duration_str.split(':'))
        return timedelta(hours=hours, minutes=minutes)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'section_id': self.section_id,
            'title': self.title,
            'description': self.description,
            'priority': self.priority,
            'due_date': self.due_date.strftime('%Y-%m-%d') if self.due_date else None,
            'due_time': self.due_time.strftime('%I:%M %p') if self.due_time else None,
            'duration': self.format_duration() if self.duration else None,
            'repeat': self.repeat,
            'repeat_type': self.repeat_type,
            'repeat_start': self.repeat_start.strftime('%Y-%m-%d') if self.repeat_start else None,
            'repeat_end': self.repeat_end.strftime('%Y-%m-%d') if self.repeat_end else None,
            'end_time': self.end_time().strftime('%I:%M %p') if self.end_time() else None
        }
