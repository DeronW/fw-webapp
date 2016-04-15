'use strict';



const Success = React.createClass({
    render: function () {
    	let data=this.props.data;
        return (
            <div>
                <header className="header">
                    交易成功
                    <a href="#" className="btn-back"
                       style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}> </a>
                </header>
                <div className="success-banner" style={{background:"url(../images/success-banner.jpg) no-repeat center 99px"}}>
                	<div className="success-text" style={{background:"url(../images/circle-white-right.png) no-repeat 80px 80px"}}>订单状态:已付款</div>
                </div>
                <div className="success-addr">
                	<div className="addr-box" style={{background:"url(../images/ico-blue-location.png) no-repeat 10px 27px"}}>
          				<div className="addr">
          					<div className="receiver">收货人:{data.name}</div>
          					<div className="phone">{data.phone}</div>
          				</div>
          				<div className="detail">收货地址：{data.addr}</div>
                	</div>
                	<div className="pay">
                		支付：<span>&yen;{data.price}</span>{data.score?<span className="score"> + {data.score}工分</span>:""}{data.coupon?<span className="coupons"> + 兑换券 X{data.coupon}</span>:""}
                	</div>
                </div>
               	<div className="success-btn">
               		<a href="#" className="success-btn1">查看订单</a>
               		<a href="#" className="success-btn2">返回商城</a>
               	</div>
            </div>
        )
    }
});
var data={
	receiver:"阿卡了解到",
	phone:13512345678,
	addr:"北京市西城区金融街街道宣武门西大街129号金隅大厦1201室",
	price:100,
	score:200,
	coupon:4
}

$FW.DOMReady(function () {
    $FW.BatchGet(
        [
            'http://10.10.100.112/mockjs/4/api/v1/activity?activity_id=12'
            //API_PATH + 'mall/api/v1/activity?activity_id=12',
        ], function (arr) {
            ReactDOM.render(<Success data={data} />, document.getElementById('cnt'));
        });
});