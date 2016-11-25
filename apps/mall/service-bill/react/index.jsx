'use strict';
const API_PATH = document.getElementById('api-path').value;

const Bill = React.createClass({
    render:function(){
        return (
            <div>
                <div className="pay-item"><img src="images/water-icon.png"/><span>水费</span></div>
                <div className="pay-details">
                    <div className="pay-detail-list"><span className="left-item">姓名</span><span className="right-item">北京朝阳丰联广场1105</span></div>
                    <div className="pay-detail-list"><span className="left-item">缴费单位</span><span className="right-item">北京自来水费</span></div>
                    <div className="pay-detail-list"><span className="left-item">本次欠费</span><span className="right-item">75.00元</span></div>
                    <div className="pay-detail-list"><span className="left-item">账期</span><span className="right-item">201610</span></div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('账单');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"账单"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<Bill/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}