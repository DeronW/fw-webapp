// support 2 nodes
// major node is : front
// backup node is : front-virtual

def node_name = 'front'

if(params.JENKINS_NODE == 'front-virtual') {
    node_name = 'front-virtual'
}

node(node_name) {
    stage('check ENV'){
        sh 'node -v'
        sh 'npm -v'
    }

    stage('Preparation') {
        if(params.INITIALIZE) {
            // 初始化项目用, jenkins创建job时需要先pull代码库
            git credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.105.101.118:front/technology-finance.git'
            // 第一次发布新分支, 需要设置本地与origin分支关联
            sh 'git branch --set-upstream-to=origin/$BRANCH $BRANCH'
        }
        sh 'git checkout $BRANCH'

        if(!params.FORCE) {
            sh 'git fetch'
            sh 'git diff --stat=400 origin/$BRANCH > /tmp/webapp.$CLUSTER.$PROJECT.git.diff'
        }
        
        git branch: BRANCH, credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.105.101.118:front/webapp.git'
    }

    stage('Update nodejs lib'){
        if(params.FORCE || params.INITIALIZE) {
            sh 'npm install'
        } else {
            // 忽略掉 npm 的更新
            echo 'no need force update npm'
        }
    }

    stage('Clean workspace'){
        sh 'npm run clean'
    }

    stage('Differential check') {
        if(!params.FORCE) {
            sh 'npm run pre-compile -- $CLUSTER $PROJECT'
        }
    }

    stage('Build') {
        // 是否强制重新刷新
        if(params.FORCE) {
            if(params.CLUSTER != 'default') {
                sh 'npm run build:$CLUSTER:$PROJECT'
            } else {
                sh 'npm run build:$PROJECT'
            }
        }
        if(!params.FORCE) {
            sh '${WORKSPACE}/differential.compile.$CLUSTER.$PROJECT.sh'
        }
    }
    
    stage('Publish') {
        sh 'mkdir -p ${WORKSPACE}/cdn/$PROJECT/placeholder/'
        sh 'mkdir -p ${WORKSPACE}/cdn/$CLUSTER/placeholder/'

        sh 'rsync -arI ${WORKSPACE}/cdn/$PROJECT/ /srv/static/$PROJECT/'
        sh 'rsync -arI ${WORKSPACE}/cdn/$CLUSTER/ /srv/static/$CLUSTER/'

        if(params.EXTRA_SERVER_IP) {
            sh 'rsync -arI ${WORKSPACE}/cdn/$PROJECT/ www@$EXTRA_SERVER_IP:/static/$PROJECT/'
            sh 'rsync -arI ${WORKSPACE}/cdn/$CLUSTER/ www@$EXTRA_SERVER_IP:/static/$CLUSTER/'
        }
        if(params.EXTRA_SERVER_IP_2) {
            sh 'rsync -arI ${WORKSPACE}/cdn/$PROJECT/ www@$EXTRA_SERVER_IP_2:/static/$PROJECT/'
            sh 'rsync -arI ${WORKSPACE}/cdn/$CLUSTER/ www@$EXTRA_SERVER_IP_2:/static/$CLUSTER/'
        }
    }
    
}