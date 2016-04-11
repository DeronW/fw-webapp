'use strict';

var myAccountData = {
    preferential: {
        number: "2"
    },
    score: {
        number: "600"
    },
    seed: {
        number: "200.20"
    }
};

var myMoney = {
    money: 20000
};


var myDelivery = {
    waitShipNumber: 8,
    waitConductNumber: 0,
    waitCompleteNumber: 2,
};

const HomePage = React.createClass({
    getInitialState: function(){
        console.log(this.props.vip_level)
            return {
            }
    },
	render: function() {
		return (
			<div>
				<UserInfo 
                    userAvatar={this.props.avatar} 
                    userInfo={this.props.vip_level} 
                    userName={this.props.username}
                
                    prepareCount={this.props.prepare_count}
                    shippingCount={this.props.shipping_count}
                    completeCount={this.props.complete_count}
                />

				<MyAccount 
                    money={this.props.money} 

                    voucherCount={this.props.voucher_count}
                    score={this.props.score}
                    bean={this.props.bean}
                />

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
							<img src={this.props.userAvatar}/>
						</div>

						<div className="usr-info-block">
							<div className="user-name">
								<span className="user-name-text">{this.props.userName}</span>
							</div>

							<div className="usr-info-vip">
								<span className="text">会员等级<em className="vip-text">VIP{this.props.userInfo}</em></span>
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

				<DeliveryProcessList 
                    perpareCount={this.props.prepareCount}
                    shippingCount={this.props.shippingCount}
                    completeCount={this.props.completeCount}
                />
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
        let marKion = function(numberText) {
            return (
                <span className="mark-icon">{numberText}</span>
            );
        }

        return (
            <div className="delivery-list clear-fix">
                <ul>
                    <li>
                        <div className="info-block">
                            <i className="icon">
                                <img src="../images/shopping-ship-icon.png"/>
                            </i>
                            
                            {this.props.perpareCount >= 1 ? marKion(this.props.perpareCount) : null }
                            <span className="text">待发货</span>
                        </div>
                    </li>
                    <li>
                        <div className="info-block">
                            <i className="icon">
                                <img src="../images/shopping-conduct-icon.png"/>
                            </i>

                            {this.props.shippingCount >= 1 ? marKion(this.props.shippingCount): null }
                            <span className="text">待收货</span>
                        </div>
                    </li>
                    <li>
                        <div className="info-block">
                            <i className="icon">
                                <img src="../images/shopping-complete-icon.png"/>
                            </i>

                            {this.props.completeCount >= 1 ? marKion(this.props.completeCount) : null }
                            <span className="text">已完成</span>
                        </div>
                    </li>
                </ul>
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
						<span className="r-text money-number">￥{this.props.money}</span>
					</div>

					<div className="my-account-list">
						<ul>
							<li>
								<span className="l-text">优惠券</span>
								<span className="r-text">{this.props.voucher_count}张</span>
							</li>
							<li>
								<span className="l-text">工分</span>
								<span className="r-text">{this.props.score}分</span>
							</li>
							<li>
								<span className="l-text">工豆</span>
								<span className="r-text">￥{this.props.bean}</span>
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
			selectClass: "select-li",
			index: 0,
			voucher: ['normal', 'used', 'dated']
		};
	},

	clickHandler: function(index) {
		this.setState({index: index});
	},

	render: function() {
		var self = this;

		var voucher_name = function(v) {
			switch(v) {
				case 'normal':
					return '未使用'
				case 'used':
					return '已使用'
				case 'dated':
					return '已过期'
			}
		}
			
		var btn_voucher = (v, index) => (
			<li 
				className={index == this.state.index ? "select-li" : ""} 
				onClick={function(){self.clickHandler(index)}}>
				<span className="tab-text">
					{voucher_name(v)}
				</span>
			</li>
		)
		
		let  normal_voucher = function(){
			return (
			<div className="my-voucher-not-used">
				<Voucher />
			</div>)
		}

		let  used_voucher = function(){
			return (
			<div className="my-voucher-not-used">
				<Voucher />
				<Voucher />
			</div>)
		}

		let  dated_voucher = function(){
			return (
			<div className="my-voucher-not-used">
				<Voucher />
				<Voucher />
				<Voucher />
			</div>)
		}
	
		return (
			<div>
				<div className="my-voucher">
					<div className="my-voucher-title">
						<span className="title-text">我的兑换券</span>

						<ul className="my-voucher-tab">
							{this.state.voucher.map(btn_voucher)}
						</ul>
					</div>

					<div className="my-voucher-cont">
						{this.state.index == 0 ? normal_voucher() : null}
						{this.state.index == 1 ? used_voucher() : null}
						{this.state.index == 2 ? dated_voucher() : null}
					</div>	
				</div>
			</div>	
		);
	}
});

const Voucher = React.createClass({
	render: function(){
		return (
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

		)
	}
})

$FW.DOMReady(function(){

    $FW.Ajax({
        url: 'http://10.10.100.112/mockjs/4/api/v1/user/?user_id=',
        success: function(data){
            ReactDOM.render( <HomePage {...data}/>, document.getElementById("cont"));
        }
    })

var str = "123452789";

strN(str);
})

































