from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('activity_one')
parse.add_argument('activity_two')
parse.add_argument('activity_three')
parse.add_argument('activity_four')
parse.add_argument('activity_five')
parse.add_argument('activity_six')


class activityTemplet(Resource):
    # 查询户模板信息
    def get(self, id):
    	# 若id为0，返回整个列表
        if id==0:
            activityTemplets = models.activityTemplet.query.all() #返回的activities是一个列表，其中每个元素都是一个 activity 类型的对象
            d = {}
            d["activityTemplet"] = []
            for activityTemplet in activityTemplets:
                dic = {}
                dic["id"] = activityTemplet.id
                dic["name"] = activityTemplet.name
                dic["introduce"] = activityTemplet.introduce
                dic["activity_one"] = activityTemplet.activity_one
                dic["activity_two"] = activityTemplet.activity_two
                dic["activity_three"] = activityTemplet.activity_three
                dic["activity_four"] = activityTemplet.activity_four
                dic["activity_five"] = activityTemplet.activity_five
                dic["activity_six"] = activityTemplet.activity_six
                #print(item)
                d["activityTemplet"].append(dic)
            return d,200
        else:
	        activityTemplet = models.activityTemplet.query.get(id)
	        # 判断模板是否存在
	        if activityTemplet:
	            return {
	                       "id": activityTemplet.id,
	                       "name": activityTemplet.name,
	                       "introduce": activityTemplet.introduce,
	                       "activity_one": activityTemplet.activity_one,
	                       "activity_two": activityTemplet.activity_two,
	                       "activity_three": activityTemplet.activity_three,
	                       "activity_four": activityTemplet.activity_four,
	                       "activity_five": activityTemplet.activity_five,
	                       "activity_six": activityTemplet.activity_six,
	                   }, 200
	        else:
	            return {
	                abort(404, message="{} doesn't exist".format(id))
	            }

    # 添加模板信息
    def post(self, id):
        max = models.activityTemplet.query.order_by(db.desc(models.activityTemplet.id)).first()
        id = max.id+1 if max else 1
        activityTemplet = models.activityTemplet()
        activityTemplet.id = id
        args = parse.parse_args()
        # 将传入参数加入到activityTemplet中
        activityTemplet.name = args.name
        activityTemplet.introduce = args.introduce
        activityTemplet.activity_one = args.activity_one
        activityTemplet.activity_two = args.activity_two
        activityTemplet.activity_three = args.activity_three
        activityTemplet.activity_four = args.activity_four
        activityTemplet.activity_five = args.activity_five
        activityTemplet.activity_six = args.activity_six
        # 将activityTemplet存入数据库
        try:
            db.session.add(activityTemplet)
            db.session.commit()
            return {"message": True}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改模板信息
    def put(self, id):
        activityTemplet = models.activityTemplet.query.get(id)
        args = parse.parse_args()
        # 判断模板是否存在
        if activityTemplet:
            activityTemplet.name = args.name if args.name else activityTemplet.name
            activityTemplet.introduce = args.introduce if args.introduce else activityTemplet.introduce
            activityTemplet.activity_one = args.activity_one if args.activity_one else activityTemplet.activity_one
            activityTemplet.activity_two = args.activity_two if args.activity_two else activityTemplet.activity_two
            activityTemplet.activity_three = args.activity_three if args.activity_three else activityTemplet.activity_three
            activityTemplet.activity_four = args.activity_four if args.activity_four else activityTemplet.activity_four
            activityTemplet.activity_five = args.activity_five if args.activity_five else activityTemplet.activity_five
            activityTemplet.activity_six = args.activity_six if args.activity_six else activityTemplet.activity_six
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }


    # 删除模板信息
    def delete(self, id):
        activityTemplet = models.activityTemplet.query.get(id)
        # 判断模板是否存在
        if activityTemplet:
            db.session.delete(activityTemplet)
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))

            }


