
#  Public EC2 Setup with Jenkins, Docker, and MongoDB

---

This project demonstrates setting up an AWS EC2 instance, installing Docker and Jenkins using Ansible, and deploying an application with Docker Compose. It includes a Jenkins CI/CD pipeline triggered by a GitHub webhook on every push, and an hourly health check script with logs.

## Project Overview

1. **EC2 Setup**: Create an AWS EC2 instance with a security group configured for public access.
2. **Ansible Automation**: Automate the installation of Docker and Jenkins on the EC2 instance.
3. **Docker Compose**: Define a multi-container application using Docker Compose that includes:
   - Frontend service
   - Backend service
   - MongoDB
4. **Jenkins Pipeline**: Set up a CI/CD pipeline in Jenkins with a GitHub webhook that triggers the pipeline on code push.
5. **Health Check Script**: Create a script that runs hourly to check the health of the application and logs the results.

## Setup Guide

### 1. EC2 Instance Creation

- Launched an AWS EC2 instance (Ubuntu recommended).
- Configured a Security Group to allow the following:
  - SSH access (port 22)
  - HTTP (port 3000)
  - Jenkins (port 8080)
- Add the EC2 public IP to your SSH config or terminal for connection.
  ![instance](https://github.com/user-attachments/assets/7470decf-4dd5-409c-8885-4c20229f7f99)
 ![SG](https://github.com/user-attachments/assets/656abb20-13be-4416-a892-e269a9421dca)


### 2. Ansible Playbook for Docker and Jenkins

Used Ansible to automate the installation of Docker and Jenkins on the EC2 instance.
![jenkins](https://github.com/user-attachments/assets/cc80a99c-11a7-4769-99b6-a0c61b9ff3b0)

### 3. Docker Compose Setup

Create a `docker-compose.yml` file to define your application stack, which includes the frontend, backend, and MongoDB services.
```

version: '3.8'
services:
  frontend:
    build: ./frontend/
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - crud

  backend:
    build: ./backend/
    ports:
      - "5000:5000"
    depends_on:
      - db
    networks:
      - crud

  db:
    image: mongo:latest
    command: mongod --quiet --logpath /dev/null
    ports:
      - "27017:27017"
    volumes:
      - db-data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root  # Set up a root username
      - MONGO_INITDB_ROOT_PASSWORD=example  # Set up a root password
      - MONGO_INITDB_DATABASE=crud  # Set the name of the database to create
    networks:
      - crud

volumes:
  db-data:

networks:
  crud:
```

### 4. Jenkins CI/CD Pipeline

In Jenkins, created a pipeline that automates the following:
- Cloning my GitHub repository
- Building and deploying the Docker Compose app
- Running tests
```

pipeline {
    agent any
    
    environment {
        dockerHubCredentialsID	    = 'DockerHub'  		    			// DockerHub credentials ID.
  

    }
     stages {
     

        stage('Deploy on EC2') {
            steps {
                script { 
            		  sh '''
            		  	docker-compose down 
	                        echo "Stopping all active Docker containers..."
	                        docker stop $(docker ps -q) || echo "No active containers to stop."

	                    '''	
		          sh "docker-compose up -d --build "
                    
                }
            }
        }
    }

    post {
        success {
            echo "${JOB_NAME}-${BUILD_NUMBER} pipeline succeeded"
        }
        failure {
            echo "${JOB_NAME}-${BUILD_NUMBER} pipeline failed"
        }
    }
}
```

Add a GitHub webhook that triggers the Jenkins job on push. Your pipeline script should define the stages for cloning, building, and deploying your application.
![webhook](https://github.com/user-attachments/assets/04daccd4-381c-4f74-8afa-2044980d96c4)


### 5. Health Check Script

Created a bash script to check the status of your services and log the results . Ensure it's scheduled to run hourly using cron for continuous monitoring.
![crontab](https://github.com/user-attachments/assets/d6ad5aac-3d93-48d8-97f6-ebe59f09f50b)
![log file](https://github.com/user-attachments/assets/2253bd62-f72b-4823-8173-7e498d3d7a47)



## Final Result 

![crud app](https://github.com/user-attachments/assets/3762bb18-fa70-4326-bcea-4216822761ad)

## We log into the DB to ensure the users are saved.
```
 sudo docker exec -it crud-app_db_1 mongosh -u root -p example 
```
![insideDB](https://github.com/user-attachments/assets/6766d724-7eb7-4a86-bf63-9b925f945e7a)


## Conclusion

This project sets up a fully automated infrastructure, including EC2, Docker, Jenkins, and health monitoring. It serves as a foundation for deploying scalable, containerized applications with continuous integration and delivery.

Feel free to contribute to improve the deployment process or add new features!

---
