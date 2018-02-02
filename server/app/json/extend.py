from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('picture')


class extend(Resource):
    # 查询其他需要信息
    def get(self, id):

        # 判断是否要查询其他需要列表
        if (id == 0):
            l = []
            extends = models.extend.query.all()
            # 判断其他需要列表是否为空
            if extends:
                for item in extends:
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

        extend = models.extend.query.get(id)
        # 判断其他需要是否存在
        if extend:
            return {
                       "id": extend.id,
                       "name": extend.name,
                       "introduce": extend.introduce,
                       "picture": extend.picture,
                   }, 200
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 添加其他需要信息
    def post(self, id):
        # # 判断其他需要是否存在
        # if models.extend.query.get(id):
        #     abort(400, message="{} existed".format(id))

        # 找到之前最大的id
        max = models.extend.query.order_by(db.desc(models.extend.id)).first()
        id = max.id + 1 if max else 1
        # 创建其他需要
        extend = models.extend()
        extend.id = id
        args = parse.parse_args()
        # 将传入参数加入到extend中
        extend.name = args.name
        extend.introduce = args.introduce
        extend.picture = args.picture
        # 将extend存入数据库
        try:
            db.session.add(extend)
            db.session.commit()
            return {"message": True}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改其他需要
    def put(self, id):
        extend = models.extend.query.get(id)
        args = parse.parse_args()
        # 判断其他需要是否存在
        if extend:
            extend.name = args.name if args.name else extend.name
            extend.introduce = args.introduce if args.introduce else extend.introduce
            extend.picture = args.picture if args.picture else extend.picture
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 删除其他需要
    def delete(self, id):
        extend = models.extend.query.get(id)
        # 判断其他需要是否存在
        if extend:
            try:
                db.session.delete(extend)
                db.session.commit()
                return {"message": True}
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }