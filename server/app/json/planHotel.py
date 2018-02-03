from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument("wechat")
parse.add_argument("id")
parse.add_argument('hotel')


class planHotel(Resource):
    # 修改
    def put(self):
        args = parse.parse_args()
        plan = models.plan.query.filter_by(id=args.id).first()
        # 判断用户是否存在
        if plan:
            if args.wechat==plan.wechat:
                plan.hotel = args.hotel if args.hotel else plan.hotel
                db.session.commit()
                return {"message": True}
            else:
                return {"message":"please call the source"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(plan.wechat))
            }