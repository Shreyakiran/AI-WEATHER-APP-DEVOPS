pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                dir('ai-weather-app') {
                    bat 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Build App') {
            steps {
                dir('ai-weather-app') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('ai-weather-app') {
                    bat 'docker build -t ai-weather-app .'
                }
            }
        }

    }
}