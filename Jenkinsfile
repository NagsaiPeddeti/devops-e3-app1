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
                           userRemoteConfigs: [[url: "${CODE_REPO}"]]])  
                        }
                    }
                }
                stage("build scripts checkout"){
                    steps{
                        checkout([$class: 'GitSCM', 
                        branches: [[name: '*/main']], extensions: [[$class: 'CloneOption', depth: 1, noTags: false, 
                        reference: "${STACK}/${SERVICE}/${BRANCH_NAME}", shallow: true]], userRemoteConfigs: [[url: "${SCRIPTS_REPO}"]]])
                    }
                }
                stage("copy to build server and build image"){
                    steps{
                        sshPublisher(publishers: [sshPublisherDesc(configName: 'docker3', 
                        transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "cd ${STACK}/${SERVICE}/${BRANCH_NAME} && sh build.sh ${STACK} ${SERVICE} ${BRANCH_NAME}", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: "${STACK}/${SERVICE}/${BRANCH_NAME}/**/*")], 
                        usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
                    }
                }

                stage("vulnerability accessment"){
                    steps{
                        echo "can be planned in the next sprint"
                    }
                }

                stage("testing"){
                    steps{
                        echo "can be planned in the next sprint"
                    }
                }

                 stage("deploy"){
                    steps{
                        sshPublisher(publishers: [sshPublisherDesc(configName: 'docker3', 
                        transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "cd ${STACK}/${SERVICE}/${BRANCH_NAME} && sh deploy.sh ${STACK} ${SERVICE} ${BRANCH_NAME}", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: "")], 
                        usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
                    }
                }
            }
            
        }
        stage('Deploy for production') {
            when {
                branch 'main'  
            }
            stages{
                stage("code checkout"){
                    steps{
                        dir("${STACK}/${SERVICE}/${BRANCH_NAME}/code"){
                          checkout([$class: 'GitSCM', 
                          branches: [[name: '*/develop']], 
                          extensions: 
                          [[$class: 'CloneOption', depth: 1, noTags: false, reference: '', shallow: true]],
                           userRemoteConfigs: [[url: "${CODE_REPO}"]]])  
                        }
                    }
                }
                stage("build scripts checkout"){
                    steps{
                        checkout([$class: 'GitSCM', 
                        branches: [[name: '*/main']], extensions: [[$class: 'CloneOption', depth: 1, noTags: false, 
                        reference: "${STACK}/${SERVICE}/${BRANCH_NAME}", shallow: true]], userRemoteConfigs: [[url: "${SCRIPTS_REPO}"]]])
                    }
                }

                 stage("deploy"){
                    steps{
                        sshPublisher(publishers: [sshPublisherDesc(configName: 'docker3', 
                        transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "cd ${STACK}/${SERVICE}/${BRANCH_NAME} && sh deploy.sh ${STACK} ${SERVICE} ${BRANCH_NAME}", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: "")], 
                        usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
                    }
                }
        }
    }
}
