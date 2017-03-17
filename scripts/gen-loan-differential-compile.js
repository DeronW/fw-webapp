let fs = require('fs')

// const sourceF = '/tmp/webapp.loan.git.diff'
const targetF = 'differential.compile.tmp.sh'

const sourceF = './test.diff'


fs.readFile(sourceF, (err, data) => {
    if (err) throw err;
    let lines = data.toString().split('\n');
    let r = {
        lib: false,
        pages: {}
    }

    lines.forEach(line => {
        if (line.startsWith('lib')) r.lib = true;
        let m = line.match(/apps\/loan\/([-\w]+)\//);
        if (m) r.pages[m[0]] = true;
    })
    console.log(JSON.stringify(r))
});
