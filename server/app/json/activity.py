from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('picture')


class activity(Resource):
    # 查询活动信息
    def get(self, id):
        activity = models.activity.query.get(id)
        # 判断活动是否存在
        if activity:
            return {
                       "id": activity.id,
                       "name": activity.name,
                       "introduce": activity.introduce,
                       "picture": activity.picture,
                   }, 200
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 添加活动信息
    def post(self, id):
        # 判断活动是否存在
        if models.activity.query.get(id):
            abort(400, message="{} existed".format(id))
        # 创建活动
        activity = models.activity()
        activity.id = id
        args = parse.parse_args()
        # 将传入参数加入到activity中
        activity.name = args.name
        activity.introduce = args.introduce
        activity.picture = args.picture
        # 将activity存入数据库
        try:
            db.session.add(activity)
            db.session.commit()
            return {"message": True}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改活动信息
    def put(self, id):
        activity = models.activity.query.get(id)
        args = parse.parse_args()
        # 判断活动是否存在
        if activity:
            activity.name = args.name if args.name else activity.name
            activity.introduce = args.introduce if args.introduce else activity.introduce
            activity.picture = args.picture if args.picture else activity.picture
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 删除活动信息
    def delete(self, id):
        activity = models.activity.query.get(id)
        # 判断活动是否存在
        if activity:
            db.session.delete(activity)
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }
