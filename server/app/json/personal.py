from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('picture')


class personal(Resource):
    # 查询个人需要信息
    def get(self, id):

        # 判断是否要查询个人需要列表
        if (id == 0):
            l = []
            personals = models.personal.query.all()
            # 判断个人需要列表是否为空
            if personals:
                for item in personals:
                    l.append({
                        "id": item.id,
                        "name": item.name,
                        "introduce": item.introduce,
                        "picture": item.picture
                    })
                d = {}
                d["list"] = l
                return d, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

        personal = models.personal.query.get(id)
        # 判断个人需要是否存在
        if personal:
            return {
                       "id": personal.id,
                       "name": personal.name,
                       "introduce": personal.introduce,
                       "picture": personal.picture,
                   }, 200
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 添加个人需要信息
    def post(self, id):
        # # 判断个人需要是否存在
        # if models.personal.query.get(id):
        #     abort(400, message="{} existed".format(id))
        # 找到之前最大的id
        max = models.personal.query.order_by(db.desc(models.personal.id)).first()
        id = max.id + 1 if max else 1
        # 创建个人需要
        personal = models.personal()
        personal.id = id
        args = parse.parse_args()
        # 将传入参数加入到personal中
        personal.name = args.name
        personal.introduce = args.introduce
        personal.picture = args.picture
        # 将personal存入数据库
        try:
            db.session.add(personal)
            db.session.commit()
            return {"message": True}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改个人需要
    def put(self, id):
        personal = models.personal.query.get(id)
        args = parse.parse_args()
        # 判断个人需要是否存在
        if personal:
            personal.name = args.name if args.name else personal.name
            personal.introduce = args.introduce if args.introduce else personal.introduce
            personal.picture = args.picture if args.picture else personal.picture
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 删除个人需要
    def delete(self, id):
        personal = models.personal.query.get(id)
        # 判断个人需要是否存在
        if personal:
            try:
                db.session.delete(personal)
                db.session.commit()
                return {"message": True}
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }