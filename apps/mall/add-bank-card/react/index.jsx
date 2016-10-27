'use strict';
const API_PATH = document.getElementById('api-path').value;

const AddBankCard = React.createClass({
    render:function(){
        return (
            <div className="add-bank-card">
                <div className="add-bank-card-tip">请绑定账户本人的银行卡</div>
                <div className="input-box">
                    <span className="card-icon"></span>
                    <input type="text" placeholder="请输入银行卡号" value=""/>
                </div>
                <div className="card-info">招商银行储蓄卡（支付服务由先锋金融提供）</div>
                <a className="next-step">下一步</a>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    NativeBridge.setTitle('添加银行卡');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"添加银行卡"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<AddBankCard/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}