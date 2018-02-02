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


class adminUser(db.Model):
    __tablename__ = 'user_admin'
    wechat = db.Column(primary_key=True)


class activity(db.Model):
    __tablename__ = 'activity'
    id = db.Column(primary_key=True)
    name = db.Column()
    introduce = db.Column()
    picture = db.Column()


class activityTemplet(db.Model):
    __tablename__ = 'activity_templet'
    id = db.Column(primary_key=True)
    name = db.Column()
    introduce = db.Column()
    activity_one = db.Column()
    activity_two = db.Column()
    activity_three = db.Column()
    activity_four = db.Column()
    activity_five = db.Column()
    activity_six = db.Column()


class restaurant(db.Model):
    __tablename__ = 'restaurant'
    id = db.Column(primary_key=True)
    name = db.Column()
    introduce = db.Column()
    picture = db.Column()
    address = db.Column()


class hotel(db.Model):
    __tablename__ = 'hotel'
    id = db.Column(primary_key=True)
    name = db.Column()
    introduce = db.Column()
    picture = db.Column()
    address = db.Column()


class hotelRoom(db.Model):
    __tablename__ = 'hotel_room'
    id = db.Column(primary_key=True)
    hotel = db.Column()
    name = db.Column()
    introduce = db.Column()
    picture = db.Column()


class souvenir(db.Model):
    __tablename__ = 'souvenir'
    id = db.Column(primary_key=True)
    name = db.Column()
    introduce = db.Column()
    picture = db.Column()


class extend(db.Model):
    __tablename__ = 'extend'
    id = db.Column(primary_key=True)
    name = db.Column()
    introduce = db.Column()
    picture = db.Column()


class personal(db.Model):
    __tablename__ = 'personal'
    id = db.Column(primary_key=True)
    name = db.Column()
    introduce = db.Column()
    picture = db.Column()


class plan(db.Model):
    __tablename__ = 'plan'
    id = db.Column(primary_key=True)
    key = db.Column()
    date = db.Column()
    wechat = db.Column()
    activityOne = db.Column()
    activityTwo = db.Column()
    activityThree = db.Column()
    activityFour = db.Column()
    activityFive = db.Column()
    activitySix = db.Column()
    hotel = db.Column()
    restaurantOne = db.Column()
    restaurantTwo = db.Column()
    restaurantThree = db.Column()
    restaurantFour = db.Column()


class planSouvenir(db.Model):
    __tablename__ = 'plan_souvenir'
    id = db.Column(primary_key=True)
    plan = db.Column()
    souvenir = db.Column()


class planExtend(db.Model):
    __tablename__ = 'plan_extend'
    id = db.Column(primary_key=True)
    plan = db.Column()
    extend = db.Column()


class planParticipant(db.Model):
    __tablename__ = 'plan_participant'
    id = db.Column(primary_key=True)
    plan = db.Column()
    participantWechat = db.Column()


class partucipantChooseRoom(db.Model):
    __tablename__ = 'participant_choose_room'
    id = db.Column(primary_key=True)
    participant_wechat = db.Column()
    room = db.Column()


class participantChoosePersonal(db.Model):
    __tablename__ = 'participant_choose_personal'
    id = db.Column(primary_key=True)
    participant_wechat = db.Column()
    personal = db.Column()
