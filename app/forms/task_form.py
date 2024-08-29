from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateField, TimeField, BooleanField, ValidationError
from wtforms.validators import DataRequired, Length, Optional

def validate_duration(form, field):
    if not field.data:
        return 

    try:
        hours, minutes = map(int, field.data.split(':'))
    except ValueError:
        raise ValidationError('Duration format must be in HH:MM')
    
    if not (0 <= hours <= 23) or not (0 <= minutes <= 59):
        raise ValidationError('Invalid time format')
    
    if not form.due_time.data or not form.due_date.data:
        raise ValidationError('Duration invalid. Due time and due date must be set')
    

class TaskForm(FlaskForm):
    project_id =IntegerField('Project ID', validators=[DataRequired()])
    section_id =IntegerField('Section ID')
    title = StringField('Title', validators=[DataRequired(), Length(min=3, max=150)])
    description = TextAreaField("Description", validators=[Optional(), Length(min=3, max=1000)])
    priority = IntegerField('Priority', validators=[Optional()])
    due_date = DateField('Due Date', format='%Y-%m-%d')
    due_time = TimeField('Due Time')
    duration = StringField('Duration', validators=[Optional(), validate_duration])
    repeat = BooleanField('Repeat')
    repeat_type = StringField('Repeat Type')
    repeat_start = DateField('Repeat Start', format='%Y-%m-%d')
    repeat_end = DateField('Repeat End', format='%Y-%m-%d')
