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

        stage('Build App') {
            steps {
                dir('ai-weather-app') {
                    sh 'npm run build'
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

    }
}git add .
