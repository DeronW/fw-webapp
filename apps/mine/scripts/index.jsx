'use strict';

const HomePage = React.createClass({
	render: function() {
		return (
			<div>
				<UserInfo/>
				<MyAccount/>

				<MyVoucher/>
			</div>
			);
		}
	});

const UserInfo = React.createClass({
	render: function() {
		return (
			<div>
				<div className="user-area">
					<div className="user-info">
						<div className="user-portrait">
							<img src="../images/pro-img3.jpg"/>
						</div>

						<div className="usr-info-block">
							<div className="user-name">
								<span className="user-name-text">张克中</span>
							</div>

							<div className="usr-info-vip">
								<span className="text">会员等级<em className="vip-text">VIP2</em></span>
							</div>
						</div>
					</div>

					<div className="user-info-r">
						<div className="user-get-adders">
							<i className="adders-icon">
								<img src="../images/address-icon.png"/>
							</i>
							<span className="text">收货地址</span>
						</div>	
					</div>	
				</div>
				<MyOderBlock/>

				<DeliveryProcessList/>
			</div>
		);
	}	
});

const MyOderBlock = React.createClass({
	render: function() {
		return (
			<div>
				<div className="my-oder-block">
					<span className="title">我的订单</span>
					<a href="" className="oder-lick-text">
						查看全部订单
						<i>
							<img src=""/>
						</i>
					</a>
				</div>
			</div>
		);		
	}
});

const DeliveryProcessList = React.createClass({
	render: function() {
		return (
			<div>
				<div className="delivery-list clear-fix">
					<ul>
						<li>
							<div className="info-block">
								<i className="icon">
									<img src="../images/shopping-ship-icon.png"/>
								</i>

								<span className="text">待发货</span>
							</div>
						</li>
						<li>
							<div className="info-block">
								<i className="icon">
									<img src="../images/shopping-conduct-icon.png"/>
								</i>

								<span className="text">待收货</span>
							</div>
						</li>
						<li>
							<div className="info-block">
								<i className="icon">
									<img src="../images/shopping-complete-icon.png"/>
								</i>

								<span className="text">已完成</span>
							</div>
						</li>
					</ul>
				</div>
			</div>	
		);
	}
});

const MyAccount = React.createClass({
	render: function() {
		return (
			<div>
				<div className="my-account-block">
					<div className="my-account-title">
						<span className="l-text">我的账户</span>
						<span className="r-text money-number">￥900000</span>
					</div>

					<div className="my-account-list">
						<ul>
							<li>
								<span className="l-text">优惠券</span>
								<span className="r-text">2张</span>
							</li>
							<li>
								<span className="l-text">优惠券</span>
								<span className="r-text">2张</span>
							</li>
							<li>
								<span className="l-text">优惠券</span>
								<span className="r-text">2张</span>
							</li>
							<li>
								<span className="l-text">优惠券</span>
								<span className="r-text">2张</span>
							</li>
						</ul>	
					</div>
				</div>
			</div>
		);
	}
});

const MyVoucher = React.createClass({
	getInitialState: function() {
		return {
			tabNumber: [0, 1, 2],
			stateNone: ["block", "none", "none"],
			tabTitle: ["未使用", "已使用", "已过期"],
		};
	},

	handlerClick: function(item) {
		var displayState = ["none", "none", "none"];
		displayState[item] = "block";

		this.setState({
			stateNone: displayState,
		});
	},

	render: function() {
		var self = this;
			
		
		var newLi = this.state.tabNumber.map(function(comment) {
			return <li onClick={self.handlerClick.bind(this, comment)}>{self.state.tabTitle[comment]}</li>
		});		
	
		return (
			<div>
				<div className="my-voucher">
					<div className="my-voucher-title">
						<span className="title-text">我的兑换券</span>

						<ul className="my-voucher-tab">
							{newLi}
						</ul>
					</div>

					<div className="my-voucher-cont">
						<div className="my-voucher-not-used" style={{display: this.state.stateNone[0]}}>
							<div className="my-voucher-cont-list">
								<div className="t-info">
									<div className="title-info">
										<h2 className="title-text">乐视超级电视S50 Air全配版</h2>
										<span className="money-text">￥3,999</span>
									</div>
									<div className="clear-info">
										<span className="text">来源市场活动</span>
										<span className="text-timer">有效目期<em>2016-10.03 16.22.45</em></span>
									</div>
								</div>

								<div className="b-info">
									<span className="text">备注:<em>满￥3000送加湿器</em></span>
								</div>
								
								<div className="my-vorcher-mark">
									<img src="../images/mark-delete.png"/>
								</div>
							</div>
							<div className="my-voucher-cont-list">
								<div className="t-info">
									<div className="title-info">
										<h2 className="title-text">S50 Air全配版</h2>
										<span className="money-text">￥3,999</span>
									</div>
									<div className="clear-info">
										<span className="text">来源市场活动</span>
										<span className="text-timer">有效目期<em>2016-10.03 16.22.45</em></span>
									</div>
								</div>

								<div className="b-info">
									<span className="text">备注:<em>满￥3000送加湿器</em></span>
								</div>
								
								<div className="my-vorcher-mark">
									<img src="../images/mark-delete.png"/>
								</div>
							</div>
						</div>

						<div className="bb" style={{display: this.state.stateNone[1]}}>

						</div>

						<div className="aaaaa" style={{display: this.state.stateNone[2]}}>


						</div>
					</div>	
				</div>
			</div>	
		);
	}
});

ReactDOM.render(
	<HomePage/>,
	document.getElementById("cont")
);





























