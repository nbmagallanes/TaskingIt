from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class SectionForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=50)])