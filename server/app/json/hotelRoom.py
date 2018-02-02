from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('hotel')
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('picture')


class hotelRoom(Resource):
    # 查询房间信息
    def get(self, id):
        # print("a")
        # 判断是否要查询房间列表
        if(id == 0):
            l=[]
            hotelRooms = models.hotelRoom.query.all()
            # 判断宾馆列表是否为空
            if hotelRooms:
                for item in hotelRooms:
                    l.append({
                        "id": item.id,
                        "hotel": item.hotel,
                        "name": item.name,
                        "introduce": item.introduce,
                        "picture": item.picture
                    })
                d={}
                d["list"] = l
                return d, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }
            # queryId = 1
            # all=[]
            # while(models.hotelRoom.query.get(queryId)):
            #     hotelRoom = models.hotelRoom.query.get(queryId)
            #     all.append({
            #         "id": hotelRoom.id,
            #         "hotel": hotelRoom.hotel,
            #         "name": hotelRoom.name,
            #         "introduce": hotelRoom.introduce,
            #         "picture": hotelRoom.picture
            #     })
            #     queryId+=1
            # if(queryId == 1):
            #     return {
            #         abort(404, message="{} doesn't exist".format(id))
            #     }
            # else:
            #     return all

        hotelRoom = models.hotelRoom.query.get(id)
        # 判断房间是否存在
        if hotelRoom:

            return {
                "id": hotelRoom.id,
                "hotel": hotelRoom.hotel,
                "name": hotelRoom.name,
                "introduce": hotelRoom.introduce,
                "picture": hotelRoom.picture,
            }, 200
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 添加房间信息
    def post(self, id):
        # # 判断房间是否存在
        # if models.hotelRoom.query.get(id):
        #     abort(400, message="{} existed".format(id))

        # 找到之前最大的id
        max = models.hotelRoom.query.order_by(db.desc(models.hotelRoom.id)).first()
        id = max.id + 1 if max else 1
        # 创建房间
        hotelRoom = models.hotelRoom()
        hotelRoom.id = id
        args = parse.parse_args()
        # 将传入参数加入到hotelRoom中
        hotelRoom.hotel = args.hotel
        hotelRoom.name = args.name
        hotelRoom.introduce = args.introduce
        hotelRoom.picture = args.picture
        # 将hotelRoom存入数据库
        try:
            db.session.add(hotelRoom)
            db.session.commit()
            return {"message": True}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改房间
    def put(self, id):
        hotelRoom = models.hotelRoom.query.get(id)
        args = parse.parse_args()
        # 判断房间是否存在
        if hotelRoom:
            hotelRoom.hotel = args.hotel if args.hotel else hotelRoom.hotel
            hotelRoom.name = args.name if args.name else hotelRoom.name
            hotelRoom.introduce = args.introduce if args.introduce else hotelRoom.introduce
            hotelRoom.picture = args.picture if args.picture else hotelRoom.picture
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 删除房间
    def delete(self, id):
        hotelRoom = models.hotelRoom.query.get(id)
        #判断房间是否存在
        if hotelRoom:
            try:
                db.session.delete(hotelRoom)
                db.session.commit()
                return {"message": True}
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }
