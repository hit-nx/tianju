from app import db, models
from flask_restful import Resource, Api, reqparse, abort

class planPersonal(Resource):

    def put(self):
        planPersonal = models.planPersonal.query.get(id)