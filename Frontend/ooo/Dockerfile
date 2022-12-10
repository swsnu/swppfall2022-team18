FROM snuspl/swpp:practice11

WORKDIR /usr/app

COPY package.json .
COPY src/ src/
COPY public/ public/
COPY run_frontend.sh .
COPY tsconfig.json .

RUN yarn install --silent
RUN npm run build --prod --silent
RUN apt-get update && apt-get install -y nginx

# should have made nginx configuration file to the frontend directory
COPY nginx.conf /etc/nginx/sites-available/nginx.conf
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/nginx.conf
RUN mkdir -p /usr/share/nginx/html
RUN cp -r build/* /usr/share/nginx/html/

RUN mkdir -p ssl

ENTRYPOINT ["sh", "./run_frontend.sh"]