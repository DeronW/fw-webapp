'use strict';
const API_PATH = document.getElementById('api-path').value;

var numberFormat = {
    val: "",
    format: function (val) {
        if (!isNaN(val.replace(/[0-9]/g, ""))) {
            this.val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
        }

        return this.val;
    }
};

function space(str) {
    return str.replace(/ /g, "");
}

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{19}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}



const SendCode = React.createClass({
    render : function(){
        return (
            <div>
                <div className="phone-tip">验证码已发送至手机<span>17756650331</span></div>
                <div className="input-wrap">
                    <input type="text" value="" placeholder="请输入验证码"/>
                    <span className="msg-tip">获取验证码</span>
                    <span className="vertical-line"></span>
                </div>
                <a className="next-step">完成</a>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('手机验证码');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"手机验证码"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<SendCode/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}