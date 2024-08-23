from .db import db, environment, SCHEMA, add_prefix_for_prod

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    color = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', back_populates='projects')
    tasks = db.relationship('Task', back_populates='project', cascade='all, delete')
    sections = db.relationship('Section', back_populates='project', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'color': self.color,
            'sections': [section.to_dict() for section in self.sections]
        }
