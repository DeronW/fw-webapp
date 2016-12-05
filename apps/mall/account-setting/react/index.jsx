const Account = React.createClass({
    render : function(){
        return (
            <div className="account-wrap">
                <div className="account-first-item">
                    <span className="item-title">头像</span>
                    <span className="right-arrow margin-top-space1"></span>
                    <img className="account-img" src="images/boy.jpg"/>
                </div>
                <div className="account-item">
                    <span className="item-title">用户名</span>
                    <span className="right-arrow margin-top-space2"></span>
                    <span className="item-right-info">lanyue</span>
                </div>
                <div className="account-item">
                    <span className="item-title">手机号</span>
                    <span className="right-arrow margin-top-space2"></span>
                    <span className="item-right-info">18612451585</span>
                </div>
                <div className="account-item">
                    <span className="item-title">实名认证</span>
                    <span className="right-arrow margin-top-space2"></span>
                    <span className="item-right-info">蓝月</span>
                </div>
                <a className="account-item">
                    <span className="item-title">收货地址</span>
                    <span className="right-arrow margin-top-space2"></span>
                </a>
                <a className="account-item">
                    <span className="item-title">银行卡</span>
                    <span className="right-arrow margin-top-space2"></span>
                    <span className="item-right-info">已绑定</span>
                </a>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('账户设置');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"账户设置"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<Account/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}