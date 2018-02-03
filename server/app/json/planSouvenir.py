from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('id')


class planSouvenir(Resource):
    # 修改
    def put(self, wechat):
        plan=models.plan.query.get(wechat)
        planSouvenir = models.planSouvenir.query.get(plan.id)
        args = parse.parse_args()
        # 判断planSouvenir是否存在
        if planSouvenir:
            planSouvenir.id = args.id if args.id else planSouvenir.id
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(wechat))
            }