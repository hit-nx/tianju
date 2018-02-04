from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('picture')
parse.add_argument('address')

class restaurant(Resource):

	# 查询酒店信息
    def get(self,id):
		# 若id为0，返回整个列表
        if id==0:
            restaurants = models.restaurant.query.all() #返回的restaurants是一个列表，其中每个元素都是一个 restaurant 类型的对象
            d = {}
            d["restaurant"] = []
            for restaurant in restaurants:
                dic = {}
                dic["id"] = restaurant.id
                dic["name"] = restaurant.name
                dic["introduce"] = restaurant.introduce
                dic["picture"] = restaurant.picture
                dic["address"] = restaurant.address
                #print(item)
                d["restaurant"].append(dic)
            return d,200
        else:
            restaurant=models.restaurant.query.get(id)
            if restaurant:
                return{
                    "id":restaurant.id,
                    "name":restaurant.name,
                    "introduce":restaurant.introduce,
                    "picture":restaurant.picture,
                    "address":restaurant.address,
                    },200
            else:
                return{
                    abort(404, message="{} doesn't exist".format(id))
                }

	# 添加酒店信息
    def post(self):
        max = models.restaurant.query.order_by(db.desc(models.restaurant.id)).first()
        id = max.id+1 if max else 1
        restaurant.id=id
        args=parse.parse_args()
        restaurant.name=args.name
        restaurant.introduce=args.introduce
        restaurant.picture=args.picture
        restaurant.address=args.address
        try:
        	db.session.add(restaurant)
        	db.session.commit()
        	return {"message": True}
        except Exception as e:
        	db.session.rollback()
        	abort(500)

	# 修改酒店信息
    def put(self,id):
        restaurant=models.restaurant.query.get(id)
        if restaurant:
            restaurant.name=args.name if args.name else restaurant.name
            restaurant.introduce=args.introduce if args.introduce else restaurant.introduce
            restaurant.picture=args.picture if args.picture else restaurant.picture
            restaurant.address=args.address if args.address else restaurant.address
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
                }

	# 删除酒店信息
    def delete(self,id):
        restaurant=models.restaurant.query.get(id)
        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }