from app import db

class user(db.Model):
    __tablename__ = 'user'
    wechat = db.Column(primary_key=True)
    phone = db.Column()
    grade = db.Column()
    college = db.Column()
    major = db.Column()
    classnum = db.Column()
    studentnum = db.Column()
    plan_id = db.Column()
