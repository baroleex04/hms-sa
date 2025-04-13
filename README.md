# hms-sa
This tutorial covers the essential Git commands for **branching, pulling, and pushing code** without affecting the `main` branch.

---
## Cloning the Repository
If you haven't cloned the repository yet, use:
```sh
# Clone the repository
git clone <repository-url>

# Navigate into the repository
cd <repository-name>
```
---
## Installing Docker on local

If you don't have Docker then install it by this link: 

```
https://www.docker.com/get-started/
```
---
## Running up database

This repository has folder database for initializing and maintaining database. 
Please change the directory to database:

```
cd database
```

Then run the follow command to build the database at local:

```
docker build -t mysql-hospital .
docker build -t be-hospital .
```

Then run the container of image database:

```

```

If you have installed a Docker container before then you need to stop container and delete the images before you want to build a new one:

```
docker stop mysql-hospital
docker rm mysql-hospital
docker rmi mysql-hospital
```

Then you could retrn to the class again.
--- 
## Running backend for testing API
The backend can be tested by running the following command to change the directory to backend, supposed you are in the hms-sa folder:
```
cd BE
python -m venv .venv 
source ./.venv/bin/activate
pip install -r requirements.txt
```
Then run the below to open Flask server:
```
python3 server.py
```
Please make sure that you have python installed on your local environment.

---
## API documentation

Please access this link to get the API documentation, please notice that the file works for application running at local environment and port 5000:

```
https://documenter.getpostman.com/view/29084125/2sB2cUANcU
```

Please access Postman to test.
---
## Test full application using Docker Compose:
Please install and setup Docker compose at local environment before doing this step.

Run this command to run application:
```
docker compose up -d
```

Run this command to stop and remove all resources related to application:
```
docker compose down -v --rmi all
```

Add an .env file and config it like the format below (no sensitive credential as test at local environment):
```
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=hospital_db
MYSQL_USER=hospital_user
MYSQL_PASSWORD=hospital_pass
DB_HOST=mysql-hospital
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=hospital_db
```