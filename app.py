from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from Scheduler import schedule, restructure

app = Flask(__name__, static_url_path='', static_folder='../client/public')
CORS(app) #, expose_headers='Authorization'
api = Api(app)

@app.get('/')
def serve():
    data = schedule()
    restructured_data = restructure(data)
    return restructured_data

if __name__ == "__main__":
    app.run(debug=True)

