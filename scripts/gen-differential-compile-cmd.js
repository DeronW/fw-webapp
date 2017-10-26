let fs = require('fs')
const util = require('gulp-util');

// 需要传入一个参数是表示差量编译检测项目名称
// example : npm run pre-compile -- jrgc manager
let CLUSTER = process.argv[2];
let PROJ = process.argv[3];

if (!PROJ) {
    PROJ = CLUSTER
    CLUSTER = 'default'
}

const sourceF = `/tmp/webapp.${CLUSTER}.${PROJ}.git.diff`
const targetF = `differential.compile.${CLUSTER}.${PROJ}.sh`

if (!PROJ) throw new Error('缺少参数, 待编译项目名称');

fs.readFile(sourceF, (err, data) => {
    if (err) throw err;
    let lines = data.toString().split('\n');
    let r = {
        lib: false,
        npm: false,
        pages: {}
    }

    let reg_page

    if (CLUSTER == 'default') {
        reg_page = new RegExp(`apps/${PROJ}/([-\\w]+)/`)
    } else {
        reg_page = new RegExp(`apps/${CLUSTER}/(${PROJ})/*`)
    }

    lines.forEach(line => {
        ['Jenkinsfile', 'lib', 'public', 'tasks', 'scripts',
            `gulpfiles/${PROJ}`, `gulpfiles/${CLUSTER}.${PROJ}`
        ].forEach(i => {
            if (line.trim().startsWith(i)) r.lib = true
        });

        let m = line.match(reg_page);
        if (m) {
            if (m[1] == 'lib') {
                r.lib = true
            } else {
                r.pages[m[1]] = true;
            }
        }

        if (line.match('package.json')) r.npm = true;
    })

    let sh_script = [];
    if (r.npm) sh_script.push('npm install')
    if (r.npm || r.lib) {
        CLUSTER == 'default' ?
            sh_script.push(`npm run build:${PROJ}`) :
            sh_script.push(`npm run build:${CLUSTER}:${PROJ}`)

    } else {
        let tmp_sh_script = []

        for (let i in r.pages) {
            if (r.pages.hasOwnProperty(i)) {
                if (CLUSTER == 'default') {
                    tmp_sh_script.push(`npm run gulp ${PROJ}:pack:${i}:revision`)
                } else {
                    tmp_sh_script.push(`npm run gulp ${CLUSTER}:pack:${PROJ}:revision`)
                }
            }
        }

        if (tmp_sh_script.length > 0) {
            if (CLUSTER == 'default') {
                sh_script.push(`npm run gulp ${PROJ}:common_js`)
            }

            sh_script.push(...tmp_sh_script)
        }
    }

    fs.writeFile(targetF, sh_script.join('\n'), (err) => {
        if (err) throw err;
        let t = r.lib || r.npm ?
            '需要完全编译' :
            sh_script.length ?
                '可以差量编译' :
                '无更新, 不需要编译';
        util.log(util.colors.yellow(`完成差量编译检测:${t}`));
        util.log(util.colors.yellow(r.npm ? '需要' : '不用', '更新 npm'))

        fs.chmod(targetF, parseInt('755', 8));
    });
});
