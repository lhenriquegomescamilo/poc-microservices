// This step should not normally be used in your script. Consult the inline help for details.
podTemplate(
        label: 'poc-microservices',
        namespace: 'devops',
        name: 'poc-microservices',
        containers: [
                containerTemplate(alwaysPullImage: true, args: 'cat', command: '/bin/sh -c', envVars: [], image: 'docker', livenessProbe: containerLivenessProbe(execArgs: '', failureThreshold: 0, initialDelaySeconds: 0, periodSeconds: 0, successThreshold: 0, timeoutSeconds: 0), name: 'docker-container', ports: [], privileged: false, resourceLimitCpu: '', resourceLimitMemory: '', resourceRequestCpu: '', resourceRequestMemory: '', shell: null, ttyEnabled: true, workingDir: '/home/jenkins'),
                containerTemplate(alwaysPullImage: true, args: 'cat', command: '/bin/sh -c', image: 'lachlanevenson/k8s-helm:v2.11.0', name: 'helm-container', ttyEnabled: true)
        ],
        volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]) {
    node('poc-microservices') {
        def repos
        stage('Checkout') {
            echo 'Iniciando clone do Repositorio'
            repos = git credentialsId: 'github', url: 'git@github.com:lhenriquegomescamilo/poc-microservices.git'
            echo repos.toString()
            sh "ls -ltra ./database"
        }

        stage('Package') {
            // This step should not normally be used in your script. Consult the inline help for details.
            container('docker-container') {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USER')]) {
                    echo 'Building com npm repositorio'
                    sh "docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD}"
                    sh "docker build -t lcamilo/gateway_database:0.0.3 ./database"
                    sh "docker push lcamilo/gateway_database:0.0.3 "
                }
            }
        }

        stage('Deploy') {
            container('helm-container') {
                echo 'Deploy com helm'
                sh "ls -ltra ./database/"
                sh "helm init --client-only"
                sh "helm repo add poc-microservice http://helm-chartmuseum:8080"
                sh "helm repo update"
                sh "helm repo list"
                sh "helm search poc-microservice"
                sh "helm upgrade database poc-microservice/database --set image.tag=0.0.3"

            }
        }
    } // end of node
}
