from app import api

# 用户信息接口--GET POST PUT
from app.json.user import user
api.add_resource(user, '/user/<string:wechat>')

# 管理员用户接口--GET POST DELETE
from app.json.adminUser import adminUser
api.add_resource(adminUser, '/adminUser/<string:wechat>')

# 活动接口--GET POST PUT DELETE
from app.json.activity import activity
api.add_resource(activity, '/activity/<int:id>')

# 活动模板接口--GET POST PUT DELETE
from app.json.activityTmplet import activityTmplet
api.add_resource(activityTmplet, '/activityTmplet/<int:id>')

# 酒店接口--GET POST PUT DELETE
from app.json.restaurant import restaurant
api.add_resource(restaurant, '/restaurant')

# 宾馆接口--GET POST PUT DELETE
from app.json.hotel import hotel
api.add_resource(hotel, '/hotel')

# 宾馆房间接口--GET POST PUT DELETE
from app.json.room import room
api.add_resource(room, '/room')

# 纪念品接口--GET POST PUT DELETE
from app.json.souvenir import souvenir
api.add_resource(souvenir, '/souvenir')

# 其他需要接口--GET POST PUT DELETE
from app.json.extend import extend
api.add_resource(extend, '/extend')

# 个人需要接口--GET POST PUT DELETE
from app.json.personal import personal
api.add_resource(personal, '/personal')



# 方案接口--GET POST PUT DELETE
from app.json.plan import plan
api.add_resource(plan, '/plan')

# 方案活动接口--PUT
from app.json.planActivity import planActivity
api.add_resource(planActivity, '/plan/activity')

# 方案酒店接口--PUT
from app.json.planRestaurant import planRestaurant
api.add_resource(planRestaurant, '/plan/restaurant')

# 方案宾馆接口--PUT
from app.json.planHotel import planHotel
api.add_resource(planHotel, '/plan/hotel/<int:plan_id>')

# 方案纪念品接口--PUT
from app.json.planSouvenir import planSouvenir
api.add_resource(planSouvenir, '/plan/souvenir')

# 方案其他需要接口--PUT
from app.json.planExtend import planExtend
api.add_resource(planExtend, '/plan/extend')

# 方案参与人员接口--PUT DELETE
from app.json.planParticipant import planParticipant
api.add_resource(planParticipant, '/plan/participant')

# 方案房间需要接口--PUT
from app.json.planRoom import planRoom
api.add_resource(planRoom, '/plan/room')

# 方案个人需要接口--PUT
from app.json.planPersonal import planPersonal
api.add_resource(planPersonal, '/plan/personal')