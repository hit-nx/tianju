from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument("wechat")
parse.add_argument("plan")
parse.add_argument('extend')

class planExtend(Resource):
    # 修改
    def put(self):
        args = parse.parse_args()
        plan=models.plan.query.filter_by(args.plan).first()
        planExtend = models.planExtend.query.filter_by(args.extend).first()
        # 判断用户是否存在
        if planExtend and plan:
            if args.wechat==plan.wechat:
                planExtend.extend = args.extend if args.extend else planExtend.extend
                db.session.commit()
                return {"message": True}
            else:
                return {"message":"Please call the source"}
        else:
            return {
                abort(404, message="It doesn't exist")
            }