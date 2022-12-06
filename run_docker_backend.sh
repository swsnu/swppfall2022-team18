ABSOLUTE_DB_PATH="/home/ubuntu/swppfall2022-team18/Backend/team18/db.sqlite3"
BACKEND_CONTAINER_DB_PATH="/app/db.sqlite3"

ABSOLUTE_MEDIA_PATH="/home/ubuntu/swppfall2022-team18/Backend/team18/media"
BACKEND_CONTAINER_MEDIA_PATH="/app/media"

# sudo docker run -d --rm \
#     --name "backend" \
#     -p 8000:8000 \
#     -v $ABSOLUTE_DB_PATH:$BACKEND_CONTAINER_DB_PATH \
#     backend:latest \

sudo docker run --rm -it \
--name "backend" \
-p 8000:8000 \
-v $ABSOLUTE_DB_PATH:$BACKEND_CONTAINER_DB_PATH \
-v $ABSOLUTE_MEDIA_PATH:$BACKEND_CONTAINER_MEDIA_PATH \
backend:latest /bin/bash