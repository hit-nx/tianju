from app import db, models
from flask.ext.restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()



class adminUser(Resource):

	def get(self):
		pass