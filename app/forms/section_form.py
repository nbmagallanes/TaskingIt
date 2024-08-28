from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class SectionForm(FlaskForm):
    project_id =IntegerField('Project ID', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=50)])