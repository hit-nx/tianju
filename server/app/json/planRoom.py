from app import db, models
from flask_restful import Resource, Api, reqparse, abort

class planRoom(Resource):

    def put(self):
        planRoom = models.planRoom.query.get(id)