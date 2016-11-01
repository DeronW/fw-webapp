'use strict';
const API_PATH = document.getElementById('api-path').value;

const Coupon = React.createClass({
    render:function(){
        let ls = this.props.data.coupon;
        let coupon = (l,index) => {
            return (
                <div className="coupon">
                    <div className="l-r-text">
                        <div className="info-block">
                            <span className="text">券码</span>
                            <span className="data-text">{ls[index].cardNum}</span>
                        </div>
                        <div className="info-block">
                            <span className="text">密码</span>
                            <span className="data-text">{ls[index].cardPwd}</span>
                        </div>
                        <div className="info-block">
                            <span className="text">有效期</span>
                            <span className="data-text">{ls[index].tillDate}</span>
                        </div>
                    </div>
                </div>
            )
        };
        return (
            <div>
                {ls.map((l, index) => coupon(l, index)) }
            </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('爱奇艺兑换券');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"爱奇艺兑换券"} back_handler={back_handler}/>, document.getElementById('header'));
    var query = $FW.Format.urlQuery();
    $FW.Ajax({
        url: API_PATH + "mall/api/order/v1/viewCardPass.json",
        enable_loading: true,
        data:{
            bizNo:query.bizNo,
            cardUuid:query.cardUuid
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