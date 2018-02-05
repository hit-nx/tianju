import random, string, json
from app import db, models
from flask_restful import Resource, reqparse, abort
from app.json.planParticipant import deleteInfoByWechatAndPlan

parse = reqparse.RequestParser()
parse.add_argument('id')
parse.add_argument('name')
parse.add_argument('date')
parse.add_argument('wechat')
parse.add_argument('key')


# 生成激活码
def getKey(id,length = 8):
    prefix = hex(int(id))[2:] + 'M'
    length = length - len(prefix)
    chars=string.ascii_letters+string.digits
    return prefix + ''.join([random.choice(chars) for i in range(length)])

# 通过激活码获得id
def getId(code):
	code = code.split('M')[0]
	return str(int(code.upper(), 16))


class plan(Resource):

	# 查找方案并返回方案信息
	def get(self):
		# 判断key是否存在
		args = parse.parse_args()
		id = getId(args.get('key')) if args.get('key') else args.get('id')
		plan = models.plan.query.get(id)
		if plan:
			# 方案的其他需要
			extendList = []
			extend = models.planExtend.query.filter_by(plan=id).all()
			if extend:
				for item in extend:
					extendList.append({
						"id" : item.id,
						"extend" : item.extend
						})

			# 方案的纪念品需要
			souvenirList = []
			souvenir = models.planSouvenir.query.filter_by(plan=id).all()
			if souvenir:
				for item in souvenir:
					souvenirList.append({
						"id" : item.id,
						"souvenir" : item.souvenir
						})

			# 方案的参与人员
			participantList = []
			participant = models.planParticipant.query.filter_by(plan=id).all()
			if participant:
				for item in participant:

					# 参与人员的房间需求
					participantRoomList = []
					participantRoom = models.participantChooseRoom.query.filter_by(participant_wechat=item.participant_wechat).all()
					if participantRoom:
						for roomItem in participantRoom:
							participantRoomList.append({
								"id" : roomItem.id,
								"room" : roomItem.room,
								"date_in" : roomItem.date_in,
								"date_out" : roomItem.date_out,
								})
					# 参与人员的房间需求
					participantPersonalList = []
					participantPersonal = models.participantChoosePersonal.query.filter_by(participant_wechat=item.participant_wechat).all()
					if participantPersonal:
						for personalItem in participantPersonal:
							participantPersonalList.append({
								"id" : personalItem.id,
								"personal" : personalItem.personal,
								})

					participantList.append({
						"id" : item.id,
						"participant" : item.participant_wechat,
						"participantRoom" : participantRoomList,
						"participantPersonal" : participantPersonalList,
						})
			return {
				"name": plan.name,
				"key": plan.key,
				"date": plan.date,
				"wechat": plan.wechat,
				"activity_one": plan.activity_one,
				"activity_two": plan.activity_two,
				"activity_three": plan.activity_three,
				"activity_four": plan.activity_four,
				"activity_five": plan.activity_five,
				"activity_six": plan.activity_six,
				"hotel": plan.hotel,
				"restaurant_one": plan.restaurant_one,
				"restaurant_two": plan.restaurant_two,
				"restaurant_three": plan.restaurant_three,
				"restaurant_four": plan.restaurant_four,
				"name": plan.name,
				"extend": extendList,
				"souvenir": souvenirList,
				"participant": participantList
			}
		else :
			return {
				abort(400, message="plan {} doesn't exist".format(id))
			}

	# 添加方案
	def post(self):
		# 找到之前最大的id 
		max = models.plan.query.order_by(db.desc(models.plan.id)).first()
		id = max.id+1 if max else 1
		
		plan = models.plan()
		args = parse.parse_args()
		plan.id = id
		plan.name = args.name
		plan.key = getKey(id)
		plan.wechat = args.wechat
		plan.date = args.date

		# 更改用户的参与方案
		user = models.user.query.get(args.wechat)
		if user:
			user.plan_id = id
		else:
			return {
				abort(400, message="user {} doesn't exist".format(args.wechat))
			}
		# 生成识别码
		try:
			db.session.add(plan)
			db.session.commit()
			return {"message": True}
		except Exception as e:
			db.session.rollback()
			abort(500)

	# 修改方案
	def put(self):
		args = parse.parse_args()
		plan = models.plan.query.get(args.id)
		if plan :
			plan.name = args.name if args.name else plan.name
			plan.date = args.date if args.date else plan.date
			db.session.commit()
			return {"message": True}
		else :
			return {
				abort(400, message="plan {} doesn't exist".format(args.id))
			}

	def delete(self):
		args = parse.parse_args()
		plan = models.plan.query.get(args.id)
		if plan:
			models.user.query.get(plan.wechat).plan_id = 0
			try:
				# 循环删除方案其他需要
				while models.planExtend.query.filter_by(plan=plan.id).first():
				 	db.session.delete(models.planExtend.query.filter_by(plan=plan.id).first()) 
				# 循环删除方案纪念品需要
				while models.planSouvenir.query.filter_by(plan=plan.id).first():
				 	db.session.delete(models.planSouvenir.query.filter_by(plan=plan.id).first()) 
				 # 循环删除方案参与人员
				while models.planParticipant.query.filter_by(plan=plan.id).first():
				 	deleteInfoByWechatAndPlan(plan.id, models.planParticipant.query.filter_by(plan=plan.id).first().participant_wechat)
				db.session.delete(plan)
				db.session.commit()
				return {"message": True}
			except Exception as e:
				db.session.rollback()
				abort(500)
		else:
			return {
				abort(400, message="plan {} doesn't exist".format(args.id))
			}