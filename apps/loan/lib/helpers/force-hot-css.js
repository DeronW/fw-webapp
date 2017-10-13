
function forceHotCSS() {

    console.log('this page, force use hotcss, and reset viewport')
    // 先改变 <meta name="viewport" /> 中的content
    let meta = document.querySelector('[name=viewport]')
    meta.setAttribute('content', "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no")

    // 再动态设置基础字体大小
    let deviceWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = deviceWidth / 720 * 40 + 'px';
}

export default forceHotCSS