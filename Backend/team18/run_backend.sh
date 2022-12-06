pip install djangorestframework==3.14.0
pip install Pillow==8.4
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata final.json
mkdir -p /log # for `uwsgi` logging
uwsgi --ini uwsgi/uwsgi.ini