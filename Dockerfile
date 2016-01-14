FROM python:2-onbuild

RUN apt update && apt install -y gettext;

EXPOSE 8080

VOLUME /usr/src/static
