from app import db, models
from flask_restful import Resource, Api, reqparse, abort

parse = reqparse.RequestParser()
parse.add_argument('plan')
parse.add_argument('participant_wechat')
parse.add_argument('room')
parse.add_argument('date_in')
parse.add_argument('date_out')


class planRoom(Resource):

    def put(self):

        args = parse.parse_args()

        planRoom = models.participantChooseRoom.query.filter_by(plan=args.plan, participant_wechat=args.participant_wechat).first()
        #判断是否存在
        if planRoom:
            planRoom.plan = args.plan if args.plan else planRoom.plan
            planRoom.participant_wechat = args.participant_wechat if args.participant_wechat else planRoom.participant_wechat
            planRoom.room = args.room if args.room else planRoom.room
            planRoom.date_in = args.date_in if args.date_in else planRoom.date_in
            planRoom.date_out = args.date_out if args.date_out else planRoom.date_out
            db.session.commit()
            return {
                "message": "change successfully"
            }
        #不存在
        else:
            newPlanRoom = models.participantChooseRoom()
            max = models.participantChooseRoom.query.order_by(db.desc(models.participantChooseRoom.id)).first()
            id = max.id + 1 if max else 1

            newPlanRoom.id = id
            newPlanRoom.plan = args.plan
            newPlanRoom.participant_wechat = args.participant_wechat
            newPlanRoom.room = args.room
            newPlanRoom.date_in = args.date_in
            newPlanRoom.date_out = args.date_out

            try:
                db.session.add(newPlanRoom)
                db.session.commit()
                return {
                    "message": "add successfully"
                }
            except Exception as e:
                print(e)
                db.session.rollback()
                abort(500)
