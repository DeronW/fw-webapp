const API_PATH = document.getElementById("api-path").value;

const BindBankCard = React.createClass({
//	hideHandler: function(){
//		var item = this.state;
//		this.props.item.validate = false;
//		this.setState({item: this.props.item.validate})
//	},
	
	render : function(){
		let prohibited = this.props.item.openStatus;
		let bankCardNum = this.props.item.userInfo.bankCard;
		let idCarNoNntercept = bankCardNum.substring(0, 4) + "********" + bankCardNum.substring((bankCardNum.length - 4), bankCardNum.length);
		return (
			<div>
				{prohibited < 3 ? <Invalid  /> : null}
				{prohibited == 5 ? <Cover hide={this.hideHandler} /> : null}
				{prohibited == 5 ? <Bomb hide={this.hideHandler} username={this.props.item.realName} /> : null}
				
				<div className={prohibited < 3 ? "bank bank-top1" : "bank bank-top2"}>
					<div className="ash clearfix">
						<div className={prohibited < 3 ? "img gray-img" : "img"}><img src={this.props.item.userInfo.bankLogo}/></div>
						<div className="bankname">{this.props.item.userInfo.bankName}</div>
					</div>
					<div className="belon">
						<div className="name">{this.props.item.userInfo.realName}</div>
						<div className="num">{idCarNoNntercept}</div>
						{prohibited < 3 ? <div className="card-e"></div> : null}
					</div>
					<div className={prohibited < 3 ? "instant-icon gray-img" : "instant-icon"}></div>
				</div>
				<Sup/>
				{prohibited == 3 || prohibited == 4 ? <Bran /> : null}
				{prohibited < 3 ? <Branch /> : null}
				<Warm />
			</div>
		)
	}
})

const Cover = React.createClass({
	render : function(){
		return (
			<div className="black"></div>
		)
	}
})

//弹层
const Bomb = React.createClass({
	render : function(){
		return (
			<div className="boun">
				<div className="resp">尊敬的{this.props.username}，您好！</div>
				<div className="beca">由于您的身份信息无法通过系统验证，为了保证您的账户资金安全，您当前无法进行线上充值、投资、更换银行卡等交易。您当前的账户资金安全无虞，若有可用余额，可自行发起提现申请。</div>
				<div className="ever">有任何问题，请联系客服：<span>400-0322-988</span></div>
				<div className="close"><a onClick={this.props.hide} >关闭</a></div>
			</div>
		)
	}
})


const Invalid = React.createClass({
	render : function(){
		return (
			<div className="upgrade">
				<div className="dep clearfix">
					<div className="pdlf">银行卡已失效，升级银行存管账户重新激活</div>
					<div className="pdrt"><a href=""><img src="images/card-a.png"/></a></div>
				</div>
			</div>
		)
	}
})

const Sup = React.createClass({
	render : function(){
		return (
			<div className="port">如果您绑定的银行卡暂不支持手机一键支付请联系客服<span className="blue">400-6766-988</span></div>
		)
	}
})

const Bran = React.createClass({
	render : function(){
		return (
			<div className="modify">
				<div className="pure-a">
					<div className="xuanwu-a">修改绑定银行卡</div>
					<div className="choice-a"><div className="pleas-a">申请修改</div></div>
				</div>
				<div className="wire-a"></div>
				<div className="pure-a">
					<div className="xuanwu-a">北京招商银行宣武门支行</div>
					<div className="choice-a"><div className="pleas-a">请选择</div></div>
				</div>
			</div>
		)
	}
})

const Branch = React.createClass({
	render : function(){
		return (
			<div className="pure">
				<div className="xuanwu">北京招商银行宣武门支行</div>
				<div className="choice"><div className="pleas">请选择</div></div>
			</div>
		)
	}
})

const Warm = React.createClass({
	render : function(){
		return (
			<div className="rmd">
				<div className="remin">温馨提醒</div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">目前官网上可绑定的部分银行暂不支持手机一键支付。</span></div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">银行卡账户信息一旦提交绑定，不可自行修改。</span></div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">开户行名称填写错误将无法提现,请拨打银行客服电话查询后进行修改。</span></div>
			</div>
		)
	}
})

$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"绑定银行卡"}/>, document.getElementById('header'));
	$FW.Ajax({
		url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
		success : function(data){
			console.log(data)
		    ReactDOM.render(<BindBankCard item={data} />,document.getElementById('cnt'));			
		}
	});
});
