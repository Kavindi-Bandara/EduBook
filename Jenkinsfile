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

    // Clean workspace safely
    stage('Clean Workspace') {
      steps {
        cleanWs()
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          echo "TAG = ${env.TAG}"
        }
      }
    }

    stage('Debug - Workspace') {
      steps {
        sh '''
          set -e
          echo "=== PWD ==="
          pwd
          echo "=== LS (root) ==="
          ls -la
          echo "=== Find folders (depth 2) ==="
          find . -maxdepth 2 -type d -print
          echo "=== Check expected folders ==="
          ls -la Frontend || true
          ls -la Backend  || true
        '''
      }
    }

    stage('Validate Project Folders') {
      steps {
        sh '''
          set -e
          test -d "Frontend" || (echo "ERROR: Frontend folder not found in Jenkins workspace" && exit 1)
          test -d "Backend"  || (echo "ERROR: Backend folder not found in Jenkins workspace" && exit 1)
          test -f "Frontend/Dockerfile" || (echo "ERROR: Frontend/Dockerfile not found" && exit 1)
          test -f "Backend/Dockerfile"  || (echo "ERROR: Backend/Dockerfile not found" && exit 1)
          echo "✅ Folder validation OK"
        '''
      }
    }

    stage('Build Images') {
      steps {
        sh '''
          set -e
          docker version
          docker info

          echo "Building Frontend from ./Frontend"
          docker build --pull -t ${FRONT_IMAGE}:${TAG} -t ${FRONT_IMAGE}:latest ./Frontend

          echo "Building Backend from ./Backend"
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

    stage('Deploy to EC2 (Ansible)') {
      steps {
        sshagent(credentials: ['ec2-ssh-key']) {
          sh '''
            set -e
            ansible --version

            export ANSIBLE_HOST_KEY_CHECKING=False

            ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
              --ssh-common-args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null'
          '''
        }
      }
    }

    stage('Health Check (Deploy Status)') {
      steps {
        script {
          def host = sh(script: "grep -oP 'ansible_host=\\K\\S+' ansible/inventory.ini | head -n 1", returnStdout: true).trim()
          echo "Checking http://${host}/"

          sh """
            set -e
            for i in 1 2 3 4 5; do
              if curl -fsS --max-time 10 http://${host}/ > /dev/null; then
                echo "✅ Deploy OK"
                exit 0
              fi
              echo "Waiting... attempt \$i"
              sleep 5
            done
            echo "❌ Deploy Failed"
            exit 1
          """
        }
      }
    }
  }

  post {
    always {
      script {
        try { 
          sh 'docker logout || true' 
        } catch (e) { 
          echo "docker logout skipped: ${e}" 
        }
      }
    }
    failure {
      echo "Pipeline failed — check logs (Build/Push/Deploy/HealthCheck)."
    }
  }
}