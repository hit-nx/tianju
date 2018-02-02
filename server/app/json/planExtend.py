from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('extend')


class planExtend(Resource):
    # 修改
    def put(self, wechat):
        planExtend = models.planExtend.query.get(wechat)
        args = parse.parse_args()
        # 判断用户是否存在
        if planExtend:
            planExtend.extend = args.extend if args.extend else planExtend.extend
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(wechat))
            }