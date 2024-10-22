
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
		          sh "docker-compose up --build"
                    
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
