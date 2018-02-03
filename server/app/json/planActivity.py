from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('wechat')
parse.add_argument('id')
parse.add_argument('activity_one')
parse.add_argument('activity_two')
parse.add_argument('activity_three')
parse.add_argument('activity_four')
parse.add_argument('activity_five')
parse.add_argument('activity_six')

class planActivity(Resource):
    # 修改
    def put(self):
        args = parse.parse_args()
        plan = models.plan.query.get(args.wechat)
        # 判断用户是否存在
        if plan:
            plan.activity_one = args.activity_one if args.activity_one else plan.activity_one
            plan.activity_two = args.activity_two if args.activity_two else plan.activity_two
            plan.activity_three = args.activity_three if args.activity_three else plan.activity_three
            plan.activity_four = args.activity_four if args.activity_four else plan.activity_four
            plan.activity_five = args.activity_five if args.activity_five else plan.activity_five
            plan.activity_six = args.activity_six if args.activity_six else plan.activity_six
            print("a")
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(wechat))
            }
