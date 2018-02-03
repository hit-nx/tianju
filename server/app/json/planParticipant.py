from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('participant_wechat')
parse.add_argument('plan')


def deleteInfoByWechatAndPlan(plan, participant_wechat):

    planParticipant = models.planParticipant.query.filter_by(plan=plan,
                                                             participant_wechat=participant_wechat).first()
    personalChoose = models.participantChoosePersonal.query.filter_by(plan=plan,
                                                                      participant_wechat=participant_wechat).first()
    roomChoose = models.participantChooseRoom.query.filter_by(plan=plan,
                                                              participant_wechat=participant_wechat).first()

    if planParticipant:
        try:
            if personalChoose:
                # 循环删除个人需求
                while models.participantChoosePersonal.query.filter_by(plan=plan,
                                                                       participant_wechat=participant_wechat).first():
                    db.session.delete(models.participantChoosePersonal.query.filter_by(plan=plan,
                                                                                       participant_wechat=participant_wechat).first())

            if roomChoose:
                # 删除个人房间需求
                db.session.delete(roomChoose)
            # 删除该用户在该方案中的记录
            db.session.delete(planParticipant)
            db.session.commit()

            return {"message": True}

        except Exception as e:
            db.session.rollback()
            abort(500)
    else:
        return {
            abort(404, message="{} doesn't exist".format(id))
        }


class planParticipant(Resource):

    # 增加方案参与人员接口
    def post(self):

        args = parse.parse_args()

        # 判断用户是否已经存在于该方案中
        if models.planParticipant.query.filter_by(plan=args.plan, participant_wechat=args.participant_wechat).all():
            return {
                abort(400, message="您已加入该方案，不可重复加入！")
            }
        # 创建参与记录
        else:
            # 创建用户参与条目
            planParticipant = models.planParticipant()
            max = models.planParticipant.query.order_by(db.desc(models.planParticipant.id)).first()
            id = max.id + 1 if max else 1
            # 将参数传入条目中
            planParticipant.id = id
            planParticipant.plan = args.plan
            planParticipant.participant_wechat = args.participant_wechat
            # 将条目存入数据库
            try:
                db.session.add(planParticipant)
                db.session.commit()
                return {"message": True}
            except Exception as e:
                print(e)
                db.session.rollback()
                abort(500)

    # 删除方案参与人员接口（包括与该参与者相关的所有信息）
    def delete(self):

        args = parse.parse_args()

        result = deleteInfoByWechatAndPlan(args.plan, args.participant_wechat)
        return result
