const runInCatch = function () {
    typeof (Raven) === 'object' && Raven.isSetup() && Raven.captureException(e);

    // 如果是 _vds 相关错误, 不捕捉, 这是growing io的错误
    if (e && e.toString().indexOf('_vds_hybrid') > -1) return;
    // typeof (Raven) === 'object' && Raven.isSetup() && Raven.captureException(e);
    window.console && console.error && console.error(e);
}

export default runInCatch
