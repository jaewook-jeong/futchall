#!/bin/bash

DOCKER_APP_NAME=futchall_nextjs

EXIST_BLUE=$(docker-compose -p ${DOCKER_APP_NAME}-blue_nextjs_1 -f docker-compose.blue.yml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
	echo "blue up"
	docker-compose -p ${DOCKER_APP_NAME}-blue_nextjs_1 -f docker-compose.blue.yml up -d

	sleep 10

	docker-compose -p ${DOCKER_APP_NAME}-green_nextjs_1 -f docker-compose.green.yml down
else
	echo "green up"
	docker-compose -p ${DOCKER_APP_NAME}-green_nextjs_1 -f docker-compose.green.yml up -d

	sleep 10

	docker-compose -p ${DOCKER_APP_NAME}-blue_nextjs_1 -f docker-compose.blue.yml down
fi