from app.models import db, Section, environment, SCHEMA
from sqlalchemy.sql import text


def seed_sections():
    # Sections for User: 1, Project: Home
    section1 = Section(
        project_id=4, name='Routines')
    section2 = Section(
        project_id=4, name='Cleaning')
    section3 = Section(
        project_id=4, name='Self Care')
    
    # Sections for User: 1, Project: Weekly Meals
    section4 = Section(
        project_id=5, name='Day 1',)
    section5 = Section(
        project_id=5, name='Day 2',)
    section6 = Section(
        project_id=5, name='Day 3',)
    
    # Sections for User: 3, Project: Workout Plan
    section7 = Section(
        project_id=7, name='Monday - Glutes')
    section8 = Section(
        project_id=7, name='Tuesday - Back and Bicepts')
    section9 = Section(
        project_id=7, name='Wednesday - Rest Day')

    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)
    db.session.add(section5)
    db.session.add(section6)
    db.session.add(section7)
    db.session.add(section8)
    db.session.add(section9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_sections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.sections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM sections"))
        
    db.session.commit()