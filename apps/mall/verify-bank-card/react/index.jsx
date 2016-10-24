'use strict';
const API_PATH = document.getElementById('api-path').value;

const BankInfo = React.createClass({
    render : function(){
        return (
            <div className="bank-info">
                <div className="bank-item">
                    <img className="bank-icon" src="images/bank-icon.png"/>
                    <span className="bank-name">招商银行</span>
                    <span className="bank-number">6225880141558412</span>
                </div>
                <div className="verify-wrap">
                    <div className="verify-item">
                        <span className="verify-icon1"></span>
                        <input type="text" value="" placeholder="请输入姓名"/>
                    </div>
                    <div className="verify-item">
                        <span className="verify-icon2"></span>
                        <input type="text" value="" placeholder="请输入身份证号"/>
                    </div>
                    <div className="verify-item">
                        <span className="verify-icon3"></span>
                        <input type="text" value="" placeholder="请输入手机号"/>
                    </div>
                </div>
                <a className="next-step">下一步</a>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    NativeBridge.setTitle('验证银行卡信息');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"验证银行卡信息"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<BankInfo/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}