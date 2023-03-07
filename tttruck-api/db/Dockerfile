# Use an official MariaDB runtime as a parent image
FROM mariadb:10.5

# Set the root password
ENV MYSQL_ROOT_PASSWORD haemin1234!
##db configuration##
# Create a database and a user with permissions to access it
ENV MYSQL_DATABASE tttruck_db
ENV MYSQL_USER tttruck
ENV MYSQL_PASSWORD haemin1234!

# Copy the database initialization script to the container
COPY mydatabase.sql /docker-entrypoint-initdb.d/

# Expose the port the database will listen on
EXPOSE 3306