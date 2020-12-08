/*scripted
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
*/

pipeline { 
    environment { 
        registry = "hongzhizhangzach/JenkinsDEMO" 
        registryCredential = 'dockerhub-credentials' 
        dockerImage = '' 
    }
    agent any 
    stages { 
        stage('Cloning our Git') { 
            steps { 
                checkout scm 
            }
        } 
        stage('Building our image') { 
            steps { 
                script { 
                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 
                }
            } 
        }
        stage('Deploy our image') { 
            steps { 
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                } 
            }
        } 
        stage('Cleaning up') { 
            steps { 
                sh "docker rmi $registry:$BUILD_NUMBER" 
            }
        } 
    }
}