node("front") {
   stage('Preparation') {
        // git credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.10.100.106:front/webapp.git'
        sh 'git checkout $BRANCH'
        sh 'git fetch'
        sh 'git diff --stat=400 origin/$BRANCH > /tmp/webapp.$PROJECT.git.diff'
        sh 'git pull'
   }
   stage('Update nodejs lib'){
             sh '''
if [ $FORCE = \'true\' ] ; then
    npm install
fi '''
   }
   stage('Clean workspace'){
       sh 'npm run clean'
   }
   stage('Differential check') {
       sh 'npm run pre-compile -- $PROJECT'
   }
   stage('Build') {
      // 是否强制重新刷新
      sh ''' 
if [ $FORCE = \'true\' ] ; then
    echo 'npm run build:loan'
else
    ~/workspace/front-$PROJECT/differential.compile.$BRANCH.sh
fi '''
   }
   stage('Publish') {
        sh 'mkdir -p cdn/loan/placeholder/'
        // sh 'rsync -arI cdn/loan/ www@10.10.100.158:/static/loan/'
   }
}
