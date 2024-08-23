from .db import db, environment, SCHEMA, add_prefix_for_prod

class Section(db.Model):
    __tablename__ = 'sections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    project = db.relationship('Project', back_populates='sections')
    tasks = db.relationship('Task', back_populates='section', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'color': self.color
        }
