ENCRYPT_SSL_FULLCHAIN_PATH="/etc/letsencrypt/archive/recommendyouroutfit.shop/fullchain1.pem"
ENCRYPT_SSL_PRIVKEY_PATH="/etc/letsencrypt/archive/recommendyouroutfit.shop/privkey1.pem"

CONTAINER_SSL_FULLCHAIN_PATH="/usr/app/ssl/fullchain.pem"
CONTAINER_SSL_PRIVKEY_PATH="/usr/app/ssl/privkey.pem"

# sudo docker run --rm \
#     --name "frontend" \
#     -p 443:443 \
#     -v $ENCRYPT_SSL_FULLCHAIN_PATH/:$CONTAINER_SSL_FULLCHAIN_PATH \
#     -v $ENCRYPT_SSL_PRIVKEY_PATH/:$CONTAINER_SSL_PRIVKEY_PATH \
#     frontend:latest

sudo docker run -d --rm \
    --name "frontend" \
    -p 443:443 \
    -v $ENCRYPT_SSL_FULLCHAIN_PATH/:$CONTAINER_SSL_FULLCHAIN_PATH \
    -v $ENCRYPT_SSL_PRIVKEY_PATH/:$CONTAINER_SSL_PRIVKEY_PATH \
    frontend:latest