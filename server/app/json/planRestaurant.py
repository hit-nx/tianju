from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('restaurant_one')
parse.add_argument('restaurant_two')
parse.add_argument('restaurant_three')
parse.add_argument('restaurant_four')


class planRestaurant(Resource):
    # 修改
    def put(self, wechat):
        plan = models.plan.query.get(wechat)
        args = parse.parse_args()
        # 判断用户是否存在
        if plan:
            plan.restaurant_one = args.restaurant_one if args.restaurant_one else plan.restaurant_one
            plan.restaurant_two = args.restaurant_two if args.restaurant_two else plan.restaurant_two
            plan.restaurant_three = args.restaurant_three if args.restaurant_three else plan.restaurant_three
            plan.restaurant_four = args.restaurant_four if args.restaurant_four else plan.restaurant_four
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(wechat))
            }
