// pipeline {
//   agent any

//   environment {
//     DOCKERHUB_CREDS = 'dockerhub-creds'
//     DOCKERHUB_USER  = 'kavi2001'

//     FRONT_IMAGE = "${DOCKERHUB_USER}/edubook-frontend"
//     BACK_IMAGE  = "${DOCKERHUB_USER}/edubook-backend"

//     TAG = "${env.GIT_COMMIT?.take(7)}"
//   }

//   stages {
//     stage('Checkout') {
//       steps {
//         checkout scm
//       }
//     }

//     stage('Build Images') {
//       steps {
//         sh '''
//           docker build -t ${FRONT_IMAGE}:${TAG} -t ${FRONT_IMAGE}:latest ./Frontend
//           docker build -t ${BACK_IMAGE}:${TAG} -t ${BACK_IMAGE}:latest ./Backend
//         '''
//       }
//     }

//     stage('Push Images') {
//       steps {
//         withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDS,
//           usernameVariable: 'DH_USER',
//           passwordVariable: 'DH_PASS')]) {

//           // Increase timeouts for slow networks / Docker Hub
//           sh '''
//             export DOCKER_CLIENT_TIMEOUT=300
//             export COMPOSE_HTTP_TIMEOUT=300

//             echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
//           '''

//           // Retry pushing if Docker Hub times out
//           retry(3) {
//             sh '''
//               docker push ${FRONT_IMAGE}:${TAG}
//               docker push ${FRONT_IMAGE}:latest
//               docker push ${BACK_IMAGE}:${TAG}
//               docker push ${BACK_IMAGE}:latest
//             '''
//           }
//         }
//       }
//     }

//     stage('Deploy') {
//       steps {
//         sh '''
//           docker compose pull
//           docker compose up -d
//         '''
//       }
//     }
//   }

//   post {
//     always {
//       sh 'docker logout || true'
//     }
//   }
// }


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

    TAG = "${env.GIT_COMMIT?.take(7)}"
    DOCKER_CLIENT_TIMEOUT = '600'
    COMPOSE_HTTP_TIMEOUT  = '600'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
        sh 'git rev-parse --short HEAD'
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
          // Push each tag with retries + sleep backoff
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
                // exponential-ish backoff
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

    stage('Deploy') {
      steps {
        sh '''
          set -e

          # If your compose file is in repo root
          docker compose pull
          docker compose up -d

          docker compose ps
        '''
      }
    }
  }

  post {
    always {
      sh '''
        docker logout || true
      '''
    }
    failure {
      echo "Build failed — check Docker Hub connectivity/DNS on Jenkins server."
    }
  }
}

