# db_connection.py

import mysql.connector

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        # host="172.17.0.2", # inside the network of Docker port 3306 inside docker network
        host="127.0.0.1",
        port=3308,  # Change to your DB host if needed
        user="root",  # Your MySQL username
        password="root",  # Your MySQL password
        database="hospital_db"
    )
