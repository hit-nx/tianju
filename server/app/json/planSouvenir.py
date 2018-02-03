from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument("wechat")
parse.add_argument("plan")
parse.add_argument("souvenir")

class planSouvenir(Resource):
    # 修改
    def put(self):
        args = parse.parse_args()
        plan=models.plan.query.filter_by(id=args.plan).first()
        planSouvenir = models.planSouvenir.query.filter_by(plan.id).first()
        # 判断planSouvenir是否存在
        if planSouvenir and plan:
            if args.wechat==plan.wechat:
                planSouvenir.id = args.id if args.id else planSouvenir.id
                db.session.commit()
                return {"message": True}
            else:
                return {"message":"Please call the source"}
        else:
            return {
                abort(404, message="It doesn't exist")
            }