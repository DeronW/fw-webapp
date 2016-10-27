'use strict';
const API_PATH = document.getElementById('api-path').value;

const Coupon = React.createClass({
    render:function(){
        return (
            <div className="coupon">
                <div className="l-r-text">
                    <div className="info-block">
                        <span className="text">券码</span>
                        <span className="data-text">57674786896557674786</span>
                    </div>
                    <div className="info-block">
                        <span className="text">密码</span>
                        <span className="data-text">75148523384723264200</span>
                    </div>
                    <div className="info-block">
                        <span className="text">有效期</span>
                        <span className="data-text">2016-09-30</span>
                    </div>
                </div>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('爱奇艺兑换券');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"爱奇艺兑换券"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<Coupon/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}