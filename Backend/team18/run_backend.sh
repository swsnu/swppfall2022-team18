# python manage.py makemigrations
# python manage.py migrate
# python manage.py loaddata final.json
# python manage.py runserver 0.0.0.0:8000
mkdir -p /log # for `uwsgi` logging
uwsgi --ini uwsgi/uwsgi.ini