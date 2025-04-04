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
```

Then run the container of image database:

```
docker run -d -p 3308:3306 --name mysql-hospital mysql-hospital
```
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
