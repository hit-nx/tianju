from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('name')
parse.add_argument('introduce')
parse.add_argument('picture')
parse.add_argument('activity_one')
parse.add_argument('activity_two')
parse.add_argument('activity_three')
parse.add_argument('activity_four')
parse.add_argument('activity_five')
parse.add_argument('activity_six')


class activityTemplet(Resource):
    # 查询户模板信息
    def get(self, id):
        activityTemplet = models.activityTemplet.query.get(id)
        # 判断模板是否存在
        if activityTemplet:
            return {
                       "id": activityTemplet.id,
                       "name": activityTemplet.name,
                       "introduce": activityTemplet.introduce,
                       "picture": activityTemplet.picture,
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
        # 判断模板是否存在
        if models.activityTemplet.query.get(id):
            abort(400, message="{} existed".format(id))
        # 创建模板
        activityTemplet = models.activityTemplet()
        activityTemplet.id = id
        args = parse.parse_args()
        # 将传入参数加入到activityTemplet中
        activityTemplet.name = args.name
        activityTemplet.introduce = args.introduce
        activityTemplet.picture = args.picture
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
            activityTemplet.picture = args.picture if args.picture else activityTemplet.picture
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


