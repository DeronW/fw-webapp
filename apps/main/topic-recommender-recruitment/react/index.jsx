const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('推荐人招募计划')
    } else {
        ReactDOM.render(<Header title={'推荐人招募计划'}/>, document.getElementById('header'))
    }

    if ($FW.Browser.inIOS()) {
        document.querySelector('apple-limit')[0].style.display = 'block';
    }

    $FW.Ajax({
        url : "${ctx}/parttimeFinancialer/apply.do",
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        cache : false,
        async : false,
        type:'post',
        data : {
            realName : realName,
            mobile : mobile,
            weixin : weixin,
            mail : mail,
            chancl : chancl,
            address : address
        },

        success : function(data) {
            var returnCode = data.returnCode;
            var errMsg="";
            if('0' == returnCode){
                errMsg="申请成功，请耐心等待审核";
            }else if('1' == returnCode){
                errMsg="您的申请已提交，无需再提交申请";
            }else if('2' == returnCode){
                errMsg="尚未登陆";
            }else if('3' == returnCode){
                errMsg="系统异常";
            }
            $('#jzlcsTsInfo').html(errMsg);
            showmasker($(".jzlcs-pop"));
        }
    });





});

function gotoMall() {
    if ($FW.Browser.inApp()) {
        NativeBridge.gotoMall();
    } else {
        location.href = 'http://mmall.9888.cn'
    }
}