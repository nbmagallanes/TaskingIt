from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_projects():
    # Creating starter inbox project for all seed users
    project1 = Project(
        user_id=1, name='Inbox', description='Inbox', color='grey')
    project2 = Project(
        user_id=2, name='Inbox', description='Inbox', color='grey')
    project3 = Project(
        user_id=3, name='Inbox', description='Inbox', color='grey')

    project4 = Project(
        user_id=1, name='Home', description='All things home', color='grey')
    project5 = Project(
        user_id=1, name='Weekly Meals', description='Meals for the week of August 26', color='red')
    project6 = Project(
        user_id=2, name='Home', description='To track chores for the home', color='purple')
    project7 = Project(
        user_id=3, name='Workout Plan', description='Weekly workout plan', color='green')

    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.add(project4)
    db.session.add(project5)
    db.session.add(project6)
    db.session.add(project7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
        
    db.session.commit()