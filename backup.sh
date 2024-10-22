#!/bin/bash
backup_dir="/home/ubuntu/backup"
timestamp=$(date +"%Y%m%d%H%M")
container_name="db"

# Create a backup
docker exec $container_name mongodump --archive=$backup_dir/mongobackup_$timestamp.archive

echo "MongoDB backup created at $backup_dir/mongobackup_$timestamp.archive"
