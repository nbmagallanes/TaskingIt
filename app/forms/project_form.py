from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class ProjectForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=50)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=200)])
    color = StringField('Color', validators=[DataRequired()])