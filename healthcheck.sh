#!/bin/bash
container_name=$(docker ps --filter "name=db" --format "{{.Names}}")

# Check if container is running
if [ $(docker inspect -f '{{.State.Running}}' $container_name) == "true" ]; then
    echo "$container_name is running."
else
    echo "$container_name is not running. Restarting..."
    cd /var/lib/jenkins/workspace/Crud-app
    docker-compose up -d
fi
~      