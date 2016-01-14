# Niqels

## Development environment

- Install js deps

```shell
export UID; docker-compose -f docker-compose.grunt.yml run --rm  grunt
```

- Run the app

```
docker-compose up
```
It will start the app on localhost:8080

- Create the database

```
docker-compose run --rm app ./manage.py syncdb --migrate --noinput
```
- Create the superuser

```
docker-compose run --rm app ./manage.py createsuperuser
```

## Admin access

The url to access the admin is _http://localhost:8080/admin panel/_

## Production

```shell
docker-compose run --rm app ./manage.py makemessages -l pt_BR -i node_modules -i staticfiles -i static/dist -i "**/doc"
docker-compose run --rm app ./manage.py makemessages -l pt_BR -d djangojs -i node_modules -i staticfiles -i static/dist -i "**/doc"
# Update the translations
docker-compose run --rm app ./manage.py compilemessages
```

