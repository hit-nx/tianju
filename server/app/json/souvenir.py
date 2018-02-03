from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('picture')


class souvenir(Resource):
    # 查询纪念品信息
    def get(self, id):

        # 判断是否要查询纪念品列表
        if (id == 0):
            l = []
            souvenirs = models.souvenir.query.all()
            # 判断纪念品列表是否为空
            if souvenirs:
                for item in souvenirs:
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

        souvenir = models.souvenir.query.get(id)
        # 判断纪念品是否存在
        if souvenir:
            return {
                "id": souvenir.id,
                "name": souvenir.name,
                "introduce": souvenir.introduce,
                "picture": souvenir.picture,
            }, 200
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 添加纪念品信息
    def post(self, id):
        # # 判断纪念品是否存在
        # if models.souvenir.query.get(id):
        #     abort(400, message="{} existed".format(id))

        # 找到之前最大的id
        max = models.souvenir.query.order_by(db.desc(models.souvenir.id)).first()
        id = max.id + 1 if max else 1
        # 创建纪念品
        souvenir = models.souvenir()
        souvenir.id = id
        args = parse.parse_args()
        # 将传入参数加入到souvenir中
        souvenir.name = args.name
        souvenir.introduce = args.introduce
        souvenir.picture = args.picture
        # 将souvenir存入数据库
        try:
            db.session.add(souvenir)
            db.session.commit()
            return {"message": True}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改纪念品
    def put(self, id):
        souvenir = models.souvenir.query.get(id)
        args = parse.parse_args()
        # 判断纪念品是否存在
        if souvenir:
            souvenir.name = args.name if args.name else souvenir.name
            souvenir.introduce = args.introduce if args.introduce else souvenir.introduce
            souvenir.picture = args.picture if args.picture else souvenir.picture
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 删除纪念品
    def delete(self, id):
        souvenir = models.souvenir.query.get(id)
        #判断纪念品是否存在
        if souvenir:
            try:
                db.session.delete(souvenir)
                db.session.commit()
                return {"message": True}
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }