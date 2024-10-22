#!/bin/bash
container_name="crud-app2_db_1"

# Check if container is running
if [ $(docker inspect -f '{{.State.Running}}' $container_name) == "true" ]; then
    echo "$container_name is running."
else
    echo "$container_name is not running. Restarting..."
    docker-compose up -d
fi

