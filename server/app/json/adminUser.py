from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()


class adminUser(Resource):

    # 查询管理员信息
    def get(self, wechat):
        adminUser = models.adminUser.query.get(wechat)
        # 判断管理员是否存在
        if adminUser:
            return {
                       "wechat": adminUser.wechat,
                   }, 200
        else:
            return {
                abort(404, message="{} doesn't exist".format(wechat))
            }

    # 添加管理员信息
    def post(self, wechat):
        # 判断管理员是否存在
        if models.adminUser.query.get(wechat):
            abort(400, message="{} existed".format(wechat))
        # 创建管理员
        adminUser = models.adminUser()
        adminUser.wechat = wechat
        try:
            db.session.add(adminUser)
            db.session.commit()
            return {"message": True}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 删除管理员信息
    def delete(self, wechat):
        adminUser = models.adminUser.query.get(wechat)
        # 判断管理员是否存在
        if adminUser:
            db.session.delete(adminUser)
            db.session.commit()
            return {"message": True}
        else:
            return {
                abort(404, message="{} doesn't exist".format(wechat))
            }
