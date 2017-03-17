import 'fs'

// const sourceF = '/tmp/webapp.loan.git.diff'
const targetF = 'differential.compile.tmp.sh'

const sourceF = './test.diff'


fs.readFile(sourceF, (err, data) => {
    if (err) throw err;
    console.log(data);
});
