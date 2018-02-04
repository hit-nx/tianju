from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument("wechat")
parse.add_argument("plan")
parse.add_argument('extend')

class planExtend(Resource):
    # 增加
    def post(self):
        # 找到之前最大的id
        max = models.planExtend.query.order_by(db.desc(models.planExtend.id)).first()
        id = max.id + 1 if max else 1

        args = parse.parse_args()
        plan = models.plan.query.filter_by(id=args.plan).first()
        planExtend = models.planExtend()
        planExtend.id = id
        planExtend.plan = args.plan
        planExtend.extend = args.extend
        if plan:
            if args.wechat == plan.wechat:
                if models.planExtend.query.filter_by(plan=args.plan, extend=args.extend).first():
                    abort(400, message="{} extend existed".format(args.extend))
                else:
                    try:
                        db.session.add(planExtend)
                        db.session.commit()
                        return {"message": True},200
                    except Exception as e:
                        db.session.rollback()
                        abort(500)

            else:
                return {"message": "please call the source"},200
        else:
            return {"message":"no this plan"},400

    def delete(self):
        args = parse.parse_args()
        plan = models.plan.query.filter_by(id=args.plan).first()
        planExtend = models.planExtend.query.filter_by(plan=args.plan, extend=args.extend).first()
        # 判断planSouvenir是否存在
        if planExtend and plan:
            if args.wechat == plan.wechat:
                db.session.delete(models.planExtend.query.filter_by(plan=args.plan, extend=args.extend).first())
                db.session.commit()
                return {"message": True}
            else:
                return {"message": "Please call the source"}
        else:
            return {
                abort(404, message="It doesn't exist")
            }