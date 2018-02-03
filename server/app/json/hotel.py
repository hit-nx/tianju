from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('picture')
parse.add_argument('address')


class hotel(Resource):

    # 查询宾馆信息
    def get(self, id):
        hotel = models.hotel.query.get(id)
        if hotel:
            return {
                       "id": hotel.id,
                       "name": hotel.name,
                       "introduce": hotel.introduce,
                       "picture": hotel.picture,
                       "address": hotel.address,
                   }, 200
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 添加宾馆信息
    def post(self, id):
        if models.hotel.query.get(id):
            abort(400, message="{} existed".format(id))
        hotel = models.hotel()
        hotel.id = id
        args = parse.parse_args()
        hotel.name = args.name
        hotel.introduce = args.introduce
        hotel.picture = args.picture
        hotel.address = args.address
        try:
            db.session.add(hotel)
            db.session.commit()
            return {"message": True}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改宾馆信息
    def put(self, id):
        hotel = models.hotel.query.get(id)
        if hotel:
            hotel.name = args.name if args.name else hotel.name
            hotel.introduce = args.introduce if args.introduce else hotel.introduce
            hotel.picture = args.picture if args.picture else hotel.picture
            hotel.address = args.address if args.address else hotel.address
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 删除宾馆信息
    def delete(self, id):
        hotel = models.hotel.query.get(id)
        if hotel:
            db.session.delete(hotel)
            db.session.commit()
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }
