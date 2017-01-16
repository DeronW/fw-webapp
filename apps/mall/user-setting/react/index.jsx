const Account = React.createClass({
    render : function(){
        var data = $FW.Format.urlQuery();
        return (
            <div className="account-wrap">
                <div className="account-first-item">
                    <div className="item-title">头像</div>
                    <div className="right-arrow"></div>
                    <img className="account-img" src={`${data.avatar}`}/>
                </div>
                <div className="account-item">
                    <div className="item-title">姓名</div>
                    <div className="right-arrow"></div>
                    <div className="item-right-info">{`${data.username}`}</div>
                </div>
                <div className="account-item">
                    <div className="item-title">手机号</div>
                    <div className="right-arrow"></div>
                    <div className="item-right-info">18612451585</div>
                </div>
                <a className="account-item" href="/static/mall/user-deliver-address/index.html?preview=true">
                    <div className="item-title">收货地址</div>
                    <div className="right-arrow"></div>
                </a>
                <a className="account-item" href="/static/mall/pay-bank-card/index.html">
                    <div className="item-title">银行卡</div>
                    <div className="right-arrow"></div>
                    <div className="item-right-info">已绑定</div>
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
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/static/mall/user/index.html';
}
