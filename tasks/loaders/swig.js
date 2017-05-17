const loaderUtils = require("loader-utils")
const Swig = new require('swig').Swig

module.exports = function (source) {
    let plugin = this;
    plugin.cacheable && plugin.cacheable();

    const options = loaderUtils.getOptions(this);

    let content, swig = new Swig({});
    try {
        content = swig.render(source, {
            locals: options.locals,
            filename: plugin.resourcePath
        })
    } catch (e) {
        plugin.emitError('Could not resolve swig template. Cause: ' + e);
        return '';
    }
    
    return 'module.exports = ' + JSON.stringify(content) + ';';
};
