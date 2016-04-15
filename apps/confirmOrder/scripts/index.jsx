'use strict';

window.FormaData = {
	count: 1,
	use_bean: false,
	captura:null,
	value:"",
	couponsUsed:[],
	CouponPop:false

}
const ConfirmOrder = React.createClass({	
	
	getInitialState: function(){
		let check_coupons = {};				
		this.props.data.couponsList.forEach(function(i){
			check_coupons[i.couponId] = true;
		});
		let couponsUsed=[];
		for(var x in check_coupons){
			if(check_coupons[x]){
				couponsUsed.push(x);
			}			
		}		
		window.FormaData.couponsUsed=couponsUsed;		
		return {
			couponsPop:false,
			use_bean:false,
			value:"",
			check_coupons:check_coupons
		}
	},
	chooseBean: function (index) {
        this.setState({
        	use_bean:!this.state.use_bean
        })
    },
    showCouponPop: function (index) {
        this.setState({
        	couponsPop:true
        })
    },
    cancleCouponPop: function (index) {
        this.setState({
        	couponsPop:false
        })
    },
    confimCouponPop: function (index) {
        this.setState({
        	couponsPop:false
        })
    },
    changeValue:function (e) {
        this.setState({
        	value:e.target.value
        })
    },
    ToggleCoupons: function (id) {
    	var check_coupons = this.state.check_coupons;
    	this.state.check_coupons[id]=!this.state.check_coupons[id];
    	let couponsUsed=[];
        this.setState({
        	check_coupons:check_coupons
        });
        for(var x in check_coupons){
			if(check_coupons[x]){
				couponsUsed.push(x);
			}			
		}		
		window.FormaData.couponsUsed=couponsUsed;		
    },
    
    render: function () { 
    	let data=this.props.data;
    	let list=this.props.data.list;
    	let couponsList=this.props.data.couponsList;
    	let _this=this;    
    	let btnTestClass=1?"btn-test-blue":"btn-test-blue btn-test-gray";
    	let confirmBuyBtn=1?"btn-red":"btn-red btn-gray";
    	let btnCircleClass=this.state.use_bean?"btn-circle-box on":"btn-circle-box";
    	let couponsUsedId=window.FormaData.couponsUsed;
    	let minusScore=(list.num-couponsUsedId.length)>0?(list.num-couponsUsedId.length)*list.score:0;
    	let accountScoreClass=(data.accountScore-minusScore)<0?"score2 red":"score2";
    	let totalPrice=0;
    	if(list.num-couponsUsedId.length<=0){
    		totalPrice=0;
    	}else if(list.num-couponsUsedId.length>0){
    		
    		if(this.state.use_bean)
    		{
    			if((list.num-couponsUsedId.length)*list.price-data.accountBean<=0){
    				totalPrice=0;
    			}else{
    				totalPrice=(list.num-couponsUsedId.length)*list.price-data.accountBean;
    			}
    		}else{
    			totalPrice=(list.num-couponsUsedId.length)*list.price;
    		}
    	};
    	let balanceClass=data.balance<totalPrice?"balance2 red":"balance2";
    	
    	
    	
    	//window.FormaData.couponsUsed
        return (
        	<div>
	            <div className="confirm-order">
	                <header className="header">确认订单<a href="#" className="btn-back"
	                       style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}> </a>
	                </header>
	                {
	                	data.addr.phone?<Address data={data.addr} />:<NewAddr />
	                }
	               <div className="pro-order">
		            	<div className="list">
		            		<img src={list.img} className="list-img"/>
		            		<div className="title">{list.title}</div>
		            		<div className="mark">
		            		{
		            			list.mark.map(function(d,index){
		            				return <div>{d}</div>
		            			})
		            		}
		            		</div>
		            		<div className="price-box">
		            			<span>&yen;</span><span>{list.price}</span>{
		            				list.score?<span> + {list.score}</span>:""
		            			}
		            		</div>
		            	</div>
		            	<div className="num-box">
		            		<div className="num-text">商品数量</div>
		            		<div className="num">
		            			<div className="minus" style={{background:"url(../images/gray-minus.png) no-repeat center"}}></div>
		            			<div className="value">{list.num}</div>
		            			<div className="plus" style={{background:"url(../images/gray-plus.png) no-repeat center"}}></div>
		            		</div>
		            	</div>
		            	<div className="total-box">               		
		            		<div className="total-money">
		            			<span>合计：</span>
		            			<span>&yen;{list.num*list.price}</span>
		            			{list.score?<span> + {list.score*list.num}</span>:""}
		            		</div>
		            		<div className="total-text">
		            			共{list.num}件商品
		            		</div>
		            	</div>
		            </div>
		            <div className="balance-wrap">
						<div className="account-box">
		                	<div className="coupons" onClick={this.showCouponPop} style={{background:"url(../images/ico-gray-right.png) no-repeat 653px 27px"}}>
		                		<div className="coupons-l">兑换券支付</div>
		                	{couponsUsedId.length?
		                		<div className="coupons-r">{data.couponsList[0].name} X{window.FormaData.couponsUsed.length}</div>
		                	:""
		                	}
		                	</div>
		                	<div className="bean">
		                		<div className="bean1">工豆账户</div>
		                		<div className="bean2">&yen;{data.accountBean}</div>
		                		<div className="bean3">
		                			<div className={btnCircleClass}>
		                				<div className="btn-circle" onClick={this.chooseBean}>                				
		                				</div>
		                			</div>
		                		</div>
		                	</div>
		                	<div className="score">
		                		<div className="score1">工分账户</div>
		                		<div className={accountScoreClass}>{data.accountScore}</div>
		                		<div className="score3">-{minusScore}</div>
		                	</div>
		                </div>
		                <div className="balance-box">
		                	<div className="balance1">当前余额</div>
		                	<div className={balanceClass}>&yen;{data.balance}</div>                	
		                	<div className="balance3">&yen;{totalPrice}</div>
		                	<div className="balance4">总计：</div>
		                </div>
		            </div>
		            <div className="test">
		            	<div className="test-h">获取验证码</div>
		            	<div className="test-cnt">
		            		<div className="test-input">
		            			<input type="text" value={this.state.value} onChange={this.changeValue} placeholder="请输入验证码"/>
		            		</div>
		            		<div className={btnTestClass}>手机验证码</div>
						</div>					
	                </div>
	                <div className="confirm-order-foot">
	                	<a href="#" className={confirmBuyBtn}>确认购买</a>
	                </div>
	                { this.state.couponsPop?
		                <div className="coupon-pop-box">
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
				            					couponsList.map(function(data){
				            						let checkImg = _this.state.check_coupons[data.couponId] ? 'red-right' : 'gray-block';
					            					return (
					            						<div className="li" onClick={function(){_this.ToggleCoupons(data.couponId) }}>
							            					<div className="chose" style={{background:"url(../images/"+checkImg+".png) no-repeat 0 center"}}></div>
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
									<div className="btn-cancel" onClick={this.cancleCouponPop}>取消</div>
									<div className="btn-confirm" onClick={this.confimCouponPop}>确认</div>
								</div>
				            </div>
				        </div>
			        :""}
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
let data={
	addr:{
		username:"兰玉玉",
		phone:13512345678,
		detail:"收货地址：北京市西城区金融街街道宣武门西大街129号金隅大厦1201室"
	},
	list:{
		img:"../images/pro-img1.jpg",
		proId:"1223",
		title:"Apple / 苹果   iPad Air2  128G   WIFI64g 金色",
		mark:["vip1","限购一件","限购二件","限购三件","限购四件"],
		price:19999,
		score:200,
		num:4
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


ReactDOM.render(<ConfirmOrder data={data} />, document.getElementById('cnt'));




