const del = require('del');
const util = require('gulp-util');

del(['build', 'dest', 'dist', 'cdn']).then(paths => {
    util.log(util.colors.red('删除文件及目录:'))

    paths.forEach(i => util.log(util.colors.gray(i)))
    if (!paths.length) util.log(util.colors.yellow('没有需要删除的目录'))

})