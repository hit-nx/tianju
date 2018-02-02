from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('souvenir')


class planSouvenir(Resource):
    # 修改
    def put(self, wechat):
        planSouvenir = models.planSouvenir.query.get(wechat)
        args = parse.parse_args()
        # 判断用户是否存在
        if planSouvenir:
            planSouvenir.date = args.souvenir if args.souvenir else planSouvenir.souvenir
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(wechat))
            }