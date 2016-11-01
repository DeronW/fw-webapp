'use strict';
const API_PATH = document.getElementById('api-path').value;

const Coupon = React.createClass({
    render:function(){
        return (
            <div className="coupon">
                <div className="l-r-text">
                    <div className="info-block">
                        <span className="text">券码</span>
                        <span className="data-text">{data.coupon.cardNum}</span>
                    </div>
                    <div className="info-block">
                        <span className="text">密码</span>
                        <span className="data-text">{data.coupon.cardPwd}</span>
                    </div>
                    <div className="info-block">
                        <span className="text">有效期</span>
                        <span className="data-text">{data.coupon.tillDate}</span>
                    </div>
                </div>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('爱奇艺兑换券');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"爱奇艺兑换券"} back_handler={back_handler}/>, document.getElementById('header'));
    $FW.Ajax({
        url: API_PATH + "mall/api/order/v1/viewCardPass.json",
        enable_loading: true,
        data:{
            bizNo:"56500117085",
            cardUuid:"12cece4f27b64fa5b907c9b057fa615f"
        },
        success: function (data) {
            console.log(data);
            ReactDOM.render(<Coupon data={data}/>, document.getElementById('cnt'));
        }
    });
});

function back_handler() {
    location.href = '/static/mall/order-list/index.html';
}