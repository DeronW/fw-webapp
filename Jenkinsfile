node("front") {
   stage('Preparation') {
        // git credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.10.100.106:front/webapp.git'
        sh 'git checkout $BRANCH'
        sh 'git fetch'
        sh 'git diff --stat=400 origin/$BRANCH > /tmp/webapp.loan.git.diff'
        sh 'git pull'
   }
   stage('Update compile env'){
             sh '''
if [ $FORCE = \'true\' ] ; then
    npm install
fi '''
       // sh 'npm install' // 时而打开时而关闭
   }
   stage('Clean workspace'){
       sh 'npm run clean'
   }
   stage('Build') {
      // 是否强制重新刷新
      sh ''' 
if [ $FORCE = \'true\' ] ; then
echo 'npm run build:loan'
fi '''
   }
   stage('Publish') {
        sh 'mkdir -p cdn/loan/placeholder/'
        // sh 'rsync -arI cdn/loan/ www@10.10.100.158:/static/loan/'
   }
}
