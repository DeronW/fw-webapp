'use strict';

const ConfirmOrder = React.createClass({	
    render: function () {  	    	
        return (
            <div className="confirm-order">
                <header className="header">确认订单<a href="#" className="btn-back"
                       style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}> </a>
                </header>
                <div className="new-adress">
                	<a href="#">收货地址
                		<div className="btn-new-adress" style={{background:"url(../images/ico-add.png) no-repeat center"}}></div>               
                	</a>
                </div>
                 <div className="goods-adress">
                	<div className="goods-adress-h">收货地址</div>
                	<div className="goods-adress-cnt" style={{background:"#fff url(../images/ico-blue-location.png) no-repeat 30px 30px"}}>
	                	<a href="#" style={{background:"url(../images/ico-gray-right.png) no-repeat 671px center"}}>
	                		<div className="inf">
	                			<div className="receiver"><span>收货人：</span><span>人名名</span></div>	
	                			<div className="phone">18812345678</div>	
	                		</div>
	                		<div className="detail">收货地址：北京市西城区金融街街道宣武门西大街129号金隅大厦1201室</div>
						</a>
					</div>					
                </div>
                <div className="pro-order">
                	<div className="list">
                		<img src="../images/pro-img1.jpg" className="list-img"/>
                		<div className="title">Apple / 苹果   iPad Air2  128G   WIFI64g 金色</div>
                		<div className="mark"><div>仅限一件</div></div> 
                		<div className="price-box">
                			<span>&yen;</span><span>2,199</span><span className="score"> + 200分</span>
                		</div>
                	</div>
                	<div className="num-box">
                		<div className="num-text">商品数量</div>
                		<div className="num">
                			<div className="minus" style={{background:"url(../images/gray-minus.png) no-repeat center"}}></div>
                			<div className="value">2</div>
                			<div className="plus" style={{background:"url(../images/gray-plus.png) no-repeat center"}}></div>
                		</div>
                	</div>
                	<div className="total-box">               		
                		<div className="total-money">
                			<span>合计：</span>
                			<span>&yen;2199</span><span className="total-score"> + 200工分</span>
                		</div>
                		<div className="total-text">
                			共2件商品
                		</div>
                	</div>
                </div>
                <div className="account-box">
                	<div className="coupons" style={{background:"url(../images/ico-gray-right.png) no-repeat 653px 27px"}}>
                		<div className="coupons-l">兑换券支付</div>
                		<div className="coupons-r">戴森吸尘器V6兑换券</div>
                	</div>
                	<div className="bean">
                		<div className="bean1">工豆账户</div>
                		<div className="bean2">&yen;100.00</div>
                		<div className="bean3">
                			<div className="btn-circle-box on">
                				<div className="btn-circle">                				
                				</div>
                			</div>
                		</div>
                	</div>
                	<div className="score">
                		<div className="score1">工分账户</div>
                		<div className="score2">200</div>
                		<div className="score3">-200</div>
                	</div>
                </div>
                <div className="balance-box">
                	<div className="balance1">
                		当前余额
                	</div>
                	<div className="balance2">
                		&yen;100.00
                	</div>
                	
                	<div className="balance3">
                		&yen;190.00
                	</div>
                	<div className="balance4">
                		总计：
                	</div>
                </div>
                <div className="test">
                	<div className="test-h">手机验证码</div>
                	<div className="test-cnt">
                		<div className="test-input">
                			<input type="text" value="" placeholder="请输入验证码"/>
                		</div>
                		<div className="btn-test-blue btn-test-gray">手机验证码</div>
					</div>
					
                </div>
                <div className="confirm-order-foot">
                	<a href="#" className="btn-red btn-gray">确认购买                	
                	</a>
                </div>
            </div>
        )
    }
});
const CarouselDetail = React.createClass({
	render:function(){
		
	}
})
const CarouselDetail = React.createClass({
	render:function(){
		
	}
})
let data={
	addr:{
		username:"兰玉玉",
		phone:13512345678,
		detail:"收货地址：北京市西城区金融街街道宣武门西大街129号金隅大厦1201室"
	},
	list:{
		title:"Apple / 苹果   iPad Air2  128G   WIFI64g 金色",
		mark:["vip1","限购一件","限购二件","限购三件","限购四件"],
		price:19999,
		score:200,
		num:2
	},
	accountbean:10.00,
	accountscore:100,
	balance:1000
	
	
}


ReactDOM.render(<ConfirmOrder data={data} />, document.getElementById('cnt'));



