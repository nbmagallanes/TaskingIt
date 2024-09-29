from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, time, timedelta


def seed_tasks():
    # Tasks for User: 1, Project: Home, NO SECTION
    task1 = Task(
        user_id=1, project_id=4, title='Check schedule for the day')
    
    task2 = Task(
        user_id=1, project_id=4, title='Update routine')

    # Tasks for User: 1, Project: Home, Section: Routines
    task3 = Task(
        user_id=1, project_id=4, section_id=1, title='Take pups for a walk', description='Daily walk for pups')
    
    # Tasks for User: 1, Project: Home, Section: Cleaning
    task4 = Task(
        user_id=1, project_id=4, section_id=2, title='Clean Kitchen', 
        due_time=time(23, 0), duration=timedelta(hours=2, minutes=30), repeat=True, repeat_type='Daily', repeat_start=date.today())
    
    task5 = Task(
        user_id=1, project_id=4, section_id=2, title='Wash Dishes', 
        due_time=time(13, 0), duration=timedelta(hours=1, minutes=30), repeat=True, repeat_type='Daily', repeat_start=date.today())
    
    task6 = Task(
        user_id=1, project_id=4, section_id=2, title='Mop Floor', due_date=date(2024,9,4), 
        due_time=time(15, 0), duration=timedelta(hours=1), repeat=False)
    
    # Tasks for User: 1, Project: Inbox(id: 1) 
    task7 = Task(
        user_id=1, project_id=1, title='Add new tasks in Home project')
    
    task8 = Task(
        user_id=1, project_id=1, title='Add new meals in Weekly Meals')

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
   
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
        
    db.session.commit()