pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                dir('ai-weather-app') {
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('ai-weather-app') {
                    sh 'CI=false npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('ai-weather-app') {
                    sh 'docker build -t ai-weather-app .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                dir('ai-weather-app') {
                    sh 'docker rm -f weather-container || true'
                    sh 'docker run -d -p 3000:3000 --name weather-container ai-weather-app'
                }
            }
        }

    }
}