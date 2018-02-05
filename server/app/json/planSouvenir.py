from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument("wechat")
parse.add_argument("plan")
parse.add_argument("souvenir")

class planSouvenir(Resource):
    # 增加
    def post(self):
        # 找到之前最大的id
        max = models.planSouvenir.query.order_by(db.desc(models.planSouvenir.id)).first()
        id = max.id + 1 if max else 1

        args = parse.parse_args()
        plan=models.plan.query.filter_by(id=args.plan).first()
        planSouvenir = models.planSouvenir()
        planSouvenir.id = id
        planSouvenir.plan = args.plan
        planSouvenir.souvenir = args.souvenir
        if plan:
            if args.wechat==plan.wechat:
                if models.planSouvenir.query.filter_by(plan=args.plan,souvenir=args.souvenir).first():
                    abort(400, message="{} souvenir existed".format(args.souvenir))
                else:
                    try:
                        db.session.add(planSouvenir)
                        db.session.commit()
                        return {"message": True}
                    except Exception as e:
                        db.session.rollback()
                        abort(500)
            else:
                return {"message":"please call the source"},200
        else:
            return {"message":"no this plan"},400

    def delete(self):
        args = parse.parse_args()
        plan=models.plan.query.filter_by(id=args.plan).first()
        planSouvenir = models.planSouvenir.query.filter_by(plan=args.plan,souvenir=args.souvenir).first()
        # 判断planSouvenir是否存在
        if planSouvenir and plan:
            if args.wechat==plan.wechat:
                db.session.delete(models.planSouvenir.query.filter_by(plan=args.plan,souvenir=args.souvenir).first())
                db.session.commit()
                return {"message": True}
            else:
                return {"message":"Please call the source"}
        else:
            return {
                abort(404, message="It doesn't exist")
            }