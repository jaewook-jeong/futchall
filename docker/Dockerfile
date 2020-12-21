FROM node:14.15

MAINTAINER ChrisJeong <dnrlwo11@gmail.com>

# 도커 컨테이너 호스트와 공유할 디렉터리 지정
VOLUME /futchall/

# 도커 이미지를 실행할시 실행될 스크립트
COPY ./docker-start.sh /usr/local/bin
RUN ln -s /usr/local/bin/docker-start.sh /docker-start.sh
CMD ["docker-start.sh"]