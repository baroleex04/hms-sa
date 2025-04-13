# db_connection.py

import mysql.connector
import os
from dotenv import load_dotenv

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        # host="172.17.0.2", # inside the network of Docker port 3306 inside docker network
        # host="mysql-hospital",
        # port=3306,  # Change to your DB host if needed
        # user="root",  # Your MySQL username
        # password="root",  # Your MySQL password
        # database="hospital_db"
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT")),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
