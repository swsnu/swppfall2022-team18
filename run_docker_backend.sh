ABSOLUTE_DB_PATH="/home/ubuntu/swppfall2022-team18/Backend/team18/db.sqlite3"
BACKEND_CONTAINER_DB_PATH="/app/db.sqlite3"



# sudo docker run -d --rm \
#     --name "backend" \
#     -p 8000:8000 \
#     -v $ABSOLUTE_DB_PATH:$BACKEND_CONTAINER_DB_PATH \
#     backend:latest \




# 

sudo docker run -d --rm \
--name "backend" \
-v $ABSOLUTE_MEDIA_PATH:$BACKEND_CONTAINER_MEDIA_PATH \
-v $ABSOLUTE_DB_PATH:$BACKEND_CONTAINER_DB_PATH \
-p 8000:8000 \
backend:latest /bin/bash