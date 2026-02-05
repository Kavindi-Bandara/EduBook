pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'
    DOCKERHUB_USER  = 'kavi2001'

    FRONT_IMAGE = "${DOCKERHUB_USER}/edubook-frontend"
    BACK_IMAGE  = "${DOCKERHUB_USER}/edubook-backend"

    TAG = "${env.GIT_COMMIT?.take(7)}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Images') {
      steps {
        sh '''
          docker build -t ${FRONT_IMAGE}:${TAG} -t ${FRONT_IMAGE}:latest ./Frontend
          docker build -t ${BACK_IMAGE}:${TAG} -t ${BACK_IMAGE}:latest ./Backend
        '''
      }
    }

    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDS,
          usernameVariable: 'DH_USER',
          passwordVariable: 'DH_PASS')]) {

          // Increase timeouts for slow networks / Docker Hub
          sh '''
            export DOCKER_CLIENT_TIMEOUT=300
            export COMPOSE_HTTP_TIMEOUT=300

            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
          '''

          // Retry pushing if Docker Hub times out
          retry(3) {
            sh '''
              docker push ${FRONT_IMAGE}:${TAG}
              docker push ${FRONT_IMAGE}:latest
              docker push ${BACK_IMAGE}:${TAG}
              docker push ${BACK_IMAGE}:latest
            '''
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          docker compose pull
          docker compose up -d
        '''
      }
    }
  }

  post {
    always {
      sh 'docker logout || true'
    }
  }
}
