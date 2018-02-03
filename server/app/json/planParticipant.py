from app import db, models
from flask_restful import Resource, Api, reqparse, abort


# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('participant_wechat')
parse.add_argument('plan')


class planParticipant(Resource):

    # 增加方案参与人员接口
    def post(self, plan, wechat):

        # 判断用户是否已经存在于该方案中
        if models.planParticipant.query.filter_by(plan=plan, participant_wechat=wechat).all():
            return {
                abort(400, message="您已加入该方案，不可重复加入！")
            }
        # 创建参与记录
        else:
            # 创建用户参与条目
            planParticipant = models.planParticipant()
            args = parse.parse_args()
            # 将参数传入条目中
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
