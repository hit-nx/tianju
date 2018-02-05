#-*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, Api, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('phone')
parse.add_argument('name')
parse.add_argument('grade')
parse.add_argument('college')
parse.add_argument('major')
parse.add_argument('classnum')
parse.add_argument('studentnum')
parse.add_argument('plan_id')


class user(Resource):
	# 查询用户信息
	def get(self, wechat):
		user = models.user.query.get(wechat)
		# 判断用户是否存在
		if user:
			return {
				"wechat": user.wechat,
				"name": user.name,
				"phone": user.phone,
				"grade": user.grade,
				"college": user.college,
				"major": user.major,
				"classnum": user.classnum,
				"studentnum": user.studentnum,
				"plan_id": user.plan_id,
			}, 200
		else:
			return {
				abort(404, message="{} doesn't exist".format(wechat))
			}

	# 添加用户信息
	def post(self, wechat):
		# 判断用户是否存在
		if models.user.query.get(wechat):
			abort(400, message="{} existed".format(wechat))
		# 创建用户
		user = models.user()
		user.wechat = wechat
		args = parse.parse_args()
		# 将传入参数加入到user中
		user.name = args.name
		user.phone = args.phone
		user.grade = args.grade
		user.college = args.college
		user.major = args.major
		user.classnum = args.classnum
		user.studentnum = args.studentnum
		user.plan_id = args.plan_id
		# 将user存入数据库
		try:
			db.session.add(user)
			db.session.commit()
			return {"message": True}
		except Exception as e:
			db.session.rollback()
			abort(500)

	# 修改个人信息
	def put(self, wechat):
		user = models.user.query.get(wechat)
		args = parse.parse_args()
		# 判断用户是否存在
		if user:
			user.name = args.name if args.name else user.name
			user.phone = args.phone if args.phone else user.phone
			user.grade = args.grade if args.grade else user.grade
			user.college = args.college if args.college else user.college
			user.major = args.major if args.major else user.major
			user.classnum = args.classnum if args.classnum else user.classnum
			user.studentnum = args.studentnum if args.studentnum else user.studentnum
			user.plan_id = args.plan_id if args.plan_id else user.plan_id
			db.session.commit()
			return {"message": True}
		else:
			return {
				abort(404, message="{} doesn't exist".format(wechat))
			}
