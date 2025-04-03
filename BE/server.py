from flask import Flask

app = Flask("hms")

@app.route("/")
def hello_world():
  return "Hello world!"
