pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    skipDefaultCheckout(true)
  }

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'
    DOCKERHUB_USER  = 'kavi2001'

    FRONT_IMAGE = "${DOCKERHUB_USER}/edubook-frontend"
    BACK_IMAGE  = "${DOCKERHUB_USER}/edubook-backend"

    DOCKER_CLIENT_TIMEOUT = '600'
    COMPOSE_HTTP_TIMEOUT  = '600'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
        script {
          // compute TAG after checkout (GIT_COMMIT is available now)
          env.TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          echo "TAG = ${env.TAG}"
        }
      }
    }

    stage('Build Images') {
      steps {
        sh '''
          set -e
          docker version
          docker info

          docker build --pull -t ${FRONT_IMAGE}:${TAG} -t ${FRONT_IMAGE}:latest ./Frontend
          docker build --pull -t ${BACK_IMAGE}:${TAG} -t ${BACK_IMAGE}:latest ./Backend
        '''
      }
    }

    stage('DockerHub Login') {
      steps {
        withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDS,
          usernameVariable: 'DH_USER',
          passwordVariable: 'DH_PASS')]) {

          sh '''
            set -e
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
          '''
        }
      }
    }

    stage('Push Images (Retry + Backoff)') {
      steps {
        script {
          def pushWithRetry = { String imageTag ->
            int maxTries = 5
            for (int i = 1; i <= maxTries; i++) {
              try {
                sh """
                  set -e
                  echo "Pushing: ${imageTag} (try ${i}/${maxTries})"
                  docker push ${imageTag}
                """
                return
              } catch (err) {
                echo "Push failed: ${imageTag} (try ${i})"
                if (i == maxTries) {
                  error("FAILED pushing ${imageTag} after ${maxTries} tries")
                }
                sh "sleep ${i * 10}"
              }
            }
          }

          pushWithRetry("${FRONT_IMAGE}:${TAG}")
          pushWithRetry("${FRONT_IMAGE}:latest")
          pushWithRetry("${BACK_IMAGE}:${TAG}")
          pushWithRetry("${BACK_IMAGE}:latest")
        }
      }
    }
  }

  post {
    always {
      script {
        // prevent post action from failing build
        try {
          sh 'docker logout || true'
        } catch (e) {
          echo "docker logout skipped: ${e}"
        }
      }
    }
    failure {
      echo "Build failed — check Docker Hub connectivity/DNS on Jenkins server."
    }
  }
}
