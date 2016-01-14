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


