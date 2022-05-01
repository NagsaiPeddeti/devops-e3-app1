pipeline {
    agent any;
    environment {
       STACK="demo"
       SERVICE="app1"
       CODE_REPO="https://github.com/NagsaiPeddeti/devops-e3-app1.git"
       SCRIPTS_REPO="https://github.com/NagsaiPeddeti/devops-e3-ops.git"
    }
    stages {
        stage('Deliver for development') {
            when {
                branch 'develop' 
            }
            stages{
                stage("code checkout"){
                    steps{
                        dir("${STACK}/${SERVICE}/${BRANCH_NAME}/code"){
                          checkout([$class: 'GitSCM', 
                          branches: [[name: '*/develop']], 
                          extensions: 
                          [[$class: 'CloneOption', depth: 1, noTags: false, reference: '', shallow: true]],
                           userRemoteConfigs: [[url: '${CODE_REPO}']]])  
                        }
                    }
                }
                stage("build scripts checkout"){
                    steps{
                        checkout([$class: 'GitSCM', 
                        branches: [[name: '*/main']], extensions: [[$class: 'CloneOption', depth: 1, noTags: false, 
                        reference: '${STACK}/${SERVICE}/${BRANCH_NAME}', shallow: true]], userRemoteConfigs: [[url: '${SCRIPTS_REPO}']]])
                    }
                }
                stage("copy to build server"){
                    steps{
                        sshPublisher(publishers: [sshPublisherDesc(configName: 'docker3', 
                        transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'cd ${STACK}/${SERVICE}/${BRANCH_NAME} && sh deploy.sh', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '${STACK}/${SERVICE}/${BRANCH_NAME}/**/*')], 
                        usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                    }
                }
            }
            
        }
        stage('Deploy for production') {
            when {
                branch 'main'  
            }
            steps {
                sh './jenkins/scripts/deploy-for-production.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
