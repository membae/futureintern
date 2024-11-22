from models import db,User
from flask_migrate import Migrate
from flask import Flask,request,make_response,jsonify
from flask_restful import Api,Resource
from flask_jwt_extended import JWTManager,get_jwt_identity,jwt_required,create_access_token,create_refresh_token
import secrets,os,json
from flask_cors import CORS
from werkzeug.security import check_password_hash,generate_password_hash
from datetime import timedelta

BASE_DIR =os.path.abspath(os.path.dirname(__file__))
DATABASE= os.environ.get(
    "DB_URI",f"sqlite:///{os.path.join(BASE_DIR,'app.db')}"
)

app= Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']=DATABASE
app.config['SQLALCHEMY_TRACK_MODOFICATIONS']=False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)


migrate=Migrate(app,db)
db.init_app(app)
api=Api(app)
jwt=JWTManager(app)

class Home(Resource):
    def get(self):
        return make_response({'msg':"homepage here"},200)
api.add_resource(Home,'/')


class Get_users(Resource):
    # @jwt_required()
    def get(self):
        users=User.query.all()
        return make_response([user.to_dict() for user in users],200)
api.add_resource(Get_users,'/users')

class Add_user(Resource):
    def post(self):
    # @jwt_required()
        data=request.get_json()
        email=data.get("email")
        first_name=data.get("first_name")
        last_name=data.get("last_name")
        password=generate_password_hash(data.get('password'))
        role=data.get("role","employee")
        if "@" in email and first_name and first_name!=" " and last_name and last_name!=" " and role and role!=" " and data.get("password") and data.get("password")!=" ":
            user=User.query.filter_by(email=email).first()
            if user:
                return make_response ({"msg":f"{email} is already registered"},400)
            new_user=User(first_name=first_name,last_name=last_name,email=email,password=password,role=role) 
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(),201)
        return make_response({"msg":"invalid data entries"},400)
api.add_resource(Add_user,'/addUser')

class User_id(Resource):
    # @jwt_required
    def get(self,id):
        user=User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict(),200)
        return make_response({"msg":"user not found"},400)
    # @jwt_required()
    def delete(self,id):
        user=User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({"msg":"user deleted successfully"},204)
        return make_response({"msg":"user not found"},404)
    
    # @jwt_required
    def patch(self,id):
        user=User.query.filter_by(id=id).first()
        if user:
            data=request.get_json()
            if not user:
                return make_response({"msg":"User not found"},404)
            first_name=data.get("first_name")
            last_name=data.get("last_name")
            password=data.get("password")
            role=data.get("role")

            if first_name and first_name!=" ":
                user.first_name=first_name
            if last_name and last_name!=" ":
                user.last_name=last_name
            if password and password!=" ":
                user.password=generate_password_hash(password)
            if role and role!=" ":
                user.role=role

            db.session.commit()
            return make_response(user.to_dict(),200)
api.add_resource(User_id,'/updateUser/<int:id>')

                                                                                                                                                        




if __name__=="__main__":
    app.run(debug=True)