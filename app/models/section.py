from .db import db, environment, SCHEMA, add_prefix_for_prod

class Section(db.Model):
    __tablename__ = 'sections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', back_populates='sections')
    project = db.relationship('Project', back_populates='sections')
    tasks = db.relationship('Task', back_populates='section', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'name': self.name,
            'tasks': [task.to_dict() for task in self.tasks]
        }
