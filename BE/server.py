from flask import Flask
from modules.staff import Staff

app = Flask("hms")
moduleStaff = Staff()

@app.route("/")
def hello_world():
  return moduleStaff.mock()
