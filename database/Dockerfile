# Use the official MySQL image
FROM mysql:lts

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=hospital_db
ENV MYSQL_USER=hospital_user
ENV MYSQL_PASSWORD=hospital_pass

# Copy the initialization script to the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose MySQL default port
EXPOSE 3306
