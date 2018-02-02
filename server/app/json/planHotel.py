from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('hotel')


class planHotel(Resource):
    # 修改
    def put(self, wechat):
        plan = models.plan.query.get(wechat)
        args = parse.parse_args()
        # 判断用户是否存在
        if plan:
            plan.hotel = args.grade if args.grade else plan.hotel
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(wechat))
            }