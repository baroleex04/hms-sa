FROM python:3.13-alpine

WORKDIR /app

COPY requirements.txt .         
# Copy requirements separately first (best practice for layer caching)
RUN pip install -r /app/requirements.txt

COPY . .

CMD ["python3", "server.py"]