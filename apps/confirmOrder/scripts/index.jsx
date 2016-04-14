'use strict';

window.FormaData = {
	count: 1,
	use_bean: false,
	captura:null,
	value:"",
	Usecoupons:["","",],
	CouponPop:false

}

const ConfirmOrder = React.createClass({	
	getInitialState: function(){
		return {
			coupons: [
				{
					name: '',
					id: ''
				}
			]
		}
	},
	changeCoupons: function(coupons){
		this.setState({
			coupons: coupons
		})
	},
    render: function () { 
    	let data=this.props.data;
    	let _this=this;
        return (
        	<div>
	            <div className="confirm-order">
	                <header className="header">确认订单<a href="#" className="btn-back"
	                       style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}> </a>
	                </header>
	                {
	                	data.addr.phone?<Address data={data.addr} />:<NewAddr />
	                }
	               <ProOrder data={data.list} coupons={this.state.coupons} />
	               <AccountBox data={data} />                                                 
	               <Test />
	               <Buy />                
	            </div>	            
            </div>
        )
    }
});
const NewAddr = React.createClass({
	render:function(){
		return (
			<div className="new-adress">
            	<a href="#">收货地址
            		<div className="btn-new-adress" style={{background:"url(../images/ico-add.png) no-repeat center"}}></div>               
            	</a>
            </div>
		)
	}
});
const Address = React.createClass({
	render:function(){
		let data=this.props.data;
		return (
			<div className="goods-adress">
	        	<div className="goods-adress-h">收货地址</div>
	        	<div className="goods-adress-cnt" style={{background:"#fff url(../images/ico-blue-location.png) no-repeat 30px 30px"}}>
	            	<a href="#" style={{background:"url(../images/ico-gray-right.png) no-repeat 671px center"}}>
	            		<div className="inf">
	            			<div className="receiver"><span>收货人：</span><span>{data.username}</span></div>	
	            			<div className="phone">{data.phone}</div>	
	            		</div>
	            		<div className="detail">收货地址：{data.detail}</div>
					</a>
				</div>					
	        </div>
       )
	}
});
const ProOrder = React.createClass({
	render:function(){
		let data=this.props.data;
		let score=data.score?<span className="score"> + {data.score}分</span>:"";
		let totalScore=data.score*data.num;
		let Tscore=totalScore?<span className="total-score"> + {totalScore}工分</span>:""
		return (
			<div className="pro-order">
            	<div className="list">
            		<img src="../images/pro-img1.jpg" className="list-img"/>
            		<div className="title">{data.title}</div>
            		<div className="mark">
            		{
            			data.mark.map(function(d,index){
            				return <div>{d}</div>
            			})
            		}
            		</div>
            		<div className="price-box">
            			<span>&yen;</span><span>{data.price}</span>{score}
            		</div>
            	</div>
            	<div className="num-box">
            		<div className="num-text">商品数量</div>
            		<div className="num">
            			<div className="minus" style={{background:"url(../images/gray-minus.png) no-repeat center"}}></div>
            			<div className="value">{data.num}</div>
            			<div className="plus" style={{background:"url(../images/gray-plus.png) no-repeat center"}}></div>
            		</div>
            	</div>
            	<div className="total-box">               		
            		<div className="total-money">
            			<span>合计：</span>
            			<span>&yen;{data.num*data.price}</span>{Tscore}            			
            		</div>
            		<div className="total-text">
            			共{data.num}件商品
            		</div>
            	</div>
            </div>
		)
	}
});
const AccountBox = React.createClass({
	getInitialState: function(){
		return {
			use_bean: false,
			CouponPop:false,
			coupon_name: 'aaaa'
			
		}
	},
	handlerChangeBean:function(){
		this.setState({
			use_bean: !this.state.use_bean
		})
	},
	handlerCouponPop:function(){
		window.FormaData.CouponPop=true;
		this.setState({
			CouponPop: true
		})
	},
	hideCouponHandler: function(){
		this.setState({CouponPop: false})
	},
	chooseCouponHandler: function(name){
		this.setState({
			coupon_name: name,
			CouponPop: false
		})
	},
	render:function(){
		let data=this.props.data;
		let minusScore=0;
		let totalPrice=0;
		let useBeanClass=this.state.use_bean?"btn-circle-box on":"btn-circle-box";
		let _this = this;
		return (
			<div className="balance-wrap">
				{this.state.CouponPop ? <CouponsPop data={data.couponsList} hide_coupon={this.hideCouponHandler} 
					choose_coupon={function(c){_this.chooseCouponHandler(c)}} /> : null}
				<div className="account-box">
                	<div className="coupons" onClick={this.handlerCouponPop} style={{background:"url(../images/ico-gray-right.png) no-repeat 653px 27px"}}>
                		<div className="coupons-l">兑换券支付</div>
                		<div className="coupons-r">{this.state.coupon_name} X2</div>
                	</div>
                	<div className="bean">
                		<div className="bean1">工豆账户</div>
                		<div className="bean2">&yen;{data.accountBean}</div>
                		<div className="bean3">
                			<div className={useBeanClass}>
                				<div className="btn-circle" onClick={this.handlerChangeBean}>                				
                				</div>
                			</div>
                		</div>
                	</div>
                	<div className="score">
                		<div className="score1">工分账户</div>
                		<div className="score2 red">{data.accountScore}</div>
                		<div className="score3">{minusScore}</div>
                	</div>
                </div>
                <div className="balance-box">
                	<div className="balance1">当前余额</div>
                	<div className="balance2 red">&yen;{data.balance}</div>                	
                	<div className="balance3">&yen;{totalPrice}</div>
                	<div className="balance4">总计：</div>
                </div>
            </div>
		)
	}
});

const Test = React.createClass({
    getInitialState: function () {
    return {
        value:window.FormaData.value
    }
    },
    changeHandler: function(e){
    	window.FormaData.value = e.target.value;
    	this.setState({
    		value:e.target.value
    	});
    },
	render:function(){
		let btnBuyClass=1?"btn-test-blue":"btn-test-blue btn-test-gray";
		return (
				<div className="test">
	            	<div className="test-h">获取验证码</div>
	            	<div className="test-cnt">
	            		<div className="test-input">
	            			<input type="text" value={this.state.value} onChange={this.changeHandler} placeholder="请输入验证码"/>
	            		</div>
	            		<div className={btnBuyClass}>手机验证码</div>
					</div>					
                </div>
            )
		}
});
const Buy = React.createClass({
	render:function(){
		let data=this.props.data;
		let btnClass=1?"btn-red":"btn-red btn-gray"
		return (
				<div className="confirm-order-foot">
                	<a href="#" className={btnClass}>确认购买</a>
                </div>
            )
		}
}); 
const CouponsPop = React.createClass({
	getInitialState: function () {
	    return {
	    	checked_coupons: {
	    		'1': true,
	    		'2': true
	    	}
	    }
    },    
    chooseCoupon: function(){
    	this.props.choose_coupon(this.state.checked_coupons)
    },    
    toggleHandler: function(id){
    	var checked_coupons = this.state.checked_coupons;
	    	checked_coupons[id] = !this.state.checked_coupons[id];	    	
    	this.setState({
    		checked_coupons: checked_coupons
    	})
    },
  
	render:function(){
				
		let data=this.props.data;
		let btnClass=1?"btn-red":"btn-red btn-gray";
		let choseImg= "gray-block";
		let CouponPopClass= "coupon-pop-box";	
		let _this=this;
		
		return (
				<div className={CouponPopClass}>
	            	<div className="masker"></div>
		            <div className="coupon-pop">
		            	<div className="coupon-pop-h">使用兑换券</div>
		            	<div className="coupon-pop-cont">
		            		<div className="head">
		            			<div className="chose" style={{background:"url(../images/gray-block.png) no-repeat 0 center"}}></div>
		            			<div className="name">兑换券名称</div>
		            			<div className="date">有效期</div>
		            		</div>
		            		<div className="list-wrap">
		            			<div className="list">
		            				{
		            					data.map(function(data){
		            						console.log(data);
		            						let img = _this.state.checked_coupons[data.couponId] ? 'red-right' : 'gray-block';
			            					return (
			            						<div className="li" onClick={function(){
			            							_this.toggleHandler(data.couponId)
			            						}}>
					            					<div className="chose" style={{background:"url(../images/"+img+".png) no-repeat 0 center"}}></div>
							            			<div className="name">{data.name}</div>
							            			<div className="date">{data.dated}</div>
					            				</div>
			            					)
		            					}		            					
		            				)}		            					
		            			</div>
		            		</div>	            		
						</div>
						<div className="btn">
							<div className="btn-cancel" onClick={this.props.hide_coupon}>取消</div>
							<div className="btn-confirm" onClick={this.chooseCoupon}>确认</div>
						</div>
		            </div>
		        </div>
            )
		}
}); 
let data={
	addr:{
		username:"兰玉玉",
		phone:13512345678,
		detail:"收货地址：北京市西城区金融街街道宣武门西大街129号金隅大厦1201室"
	},
	list:{
		proId:"1223",
		title:"Apple / 苹果   iPad Air2  128G   WIFI64g 金色",
		mark:["vip1","限购一件","限购二件","限购三件","限购四件"],
		price:19999,
		score:200,
		num:2
	},
	accountBean:10.00,
	accountScore:100,
	balance:1000,
	couponsList:[
		{	couponId:"1",
			name:"中秋节中秋节中秋节券",
			dated:"2015-05-03"		
		},
		{ 	
			couponId:"2",
			name:"中秋节中秋节中秋节券",
			dated:"2015-05-03"		
		},
		{	couponId:"3",
			name:"中秋节中秋节中秋节券",
			dated:"2015-05-03"		
		}
	]
}


window.order = ReactDOM.render(<ConfirmOrder data={data} />, document.getElementById('cnt'));




