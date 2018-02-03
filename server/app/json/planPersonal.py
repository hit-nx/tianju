from app import db, models
from flask_restful import Resource, Api, reqparse, abort

parse = reqparse.RequestParser()
parse.add_argument('plan')
parse.add_argument('participant_wechat')
parse.add_argument('personal')

class planPersonal(Resource):

    def post(self):
        args = parse.parse_args()
        planPersonal = models.participantChoosePersonal.query.filter_by(plan=args.plan,
                                                                        participant_wechat=args.participant_wechat,
                                                                        personal=args.personal).first()
        if planPersonal:
            return {
                abort(400, message="has exicted!")
            }
        else:
            newPlanPersonal = models.participantChoosePersonal()
            max = models.participantChoosePersonal.query.order_by(db.desc(models.participantChoosePersonal.id)).first()
            id = max.id + 1 if max else 1

            newPlanPersonal.id = id
            newPlanPersonal.plan = args.plan
            newPlanPersonal.participant_wechat = args.participant_wechat
            newPlanPersonal.personal = args.personal

            try:
                db.session.add(newPlanPersonal)
                db.session.commit()
                return {
                    "message":True
                }
            except Exception as e:
                print(e)
                db.session.rollback()
                abort(500)

    def delete(self):

        args = parse.parse_args()
        planPersonal = models.participantChoosePersonal.query.filter_by(plan=args.plan,
                                                                        participant_wechat=args.participant_wechat,
                                                                        personal=args.personal).first()
        if planPersonal:
            try:
                db.session.delete(planPersonal)
                db.session.commit()
                return {
                    "message": True
                }
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="doesn't exist")
            }

