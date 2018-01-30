from app import app, db, models
from flask.ext.restful import Api, Resource 

api = Api(app)
# @app.route('/')
# @app.route('/index')
class Hello(Resource):
	def get(self):
		user = models.user.query.get("messi")
		return {
				"wechat" : user.wechat,
				"phone" : user.phone,
				"plan_id" : user.plan_id
			}

api.add_resource(Hello, '/', '/index')