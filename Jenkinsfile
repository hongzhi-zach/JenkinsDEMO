/*Declarative 
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Demo Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Demo Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Demo Deploying....'
            }
        }
    }
}
*/
//scripted
node {
    def app
    stage('Clone repository'){
        //sync
        checkout scm
    }
    stage('Build image'){
        //building image
        sh "docker login"
        sh "docker build -t hongzhizhang/JenkinsDEMO"
        app = docker.build("hongzhizhang/JenkinsDEMO")
    }
    stage('Test image'){
        //test framework
        app.inside{
            echo "Sample tests"
        }
    }
    stage('Push image'){
        //pushing two tags
        //push incremental build number from Jenkins
        //push another 'latest' tag 
        //multiple tags is cheap since layers are reused
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials'){
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
        echo "Trying to Push Docker Build to DockerHub"
    }
}