FROM node:14.15

MAINTAINER ChrisJeong <dnrlwo11@gmail.com>

VOLUME /futchall/

COPY ./docker-start.sh /usr/local/bin
RUN ln -s /usr/local/bin/docker-start.sh /docker-start.sh
CMD ["docker-start.sh"]