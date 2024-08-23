from .db import db, environment, SCHEMA, add_prefix_for_prod

class Task_Occurrence(db.Model):
    __tablename__ = 'task_occurrences'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id')), nullable=False)
    occurrence_date = db.Column(db.Date, nullable=False)
    started_at = db.Column(db.DateTime)
    completed_at = db.Column(db.DateTime)

    task = db.relationship('Task', back_populates='task_occurrences')

    def to_dict(self):
        return {
            'id': self.id,
            'task_id': self.task_id,
            'started_at': self.started_at,
            'completed_at': self.completed_at,
            'task': self.task
        }