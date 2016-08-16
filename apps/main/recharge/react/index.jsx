$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"充值"} back_handler={backward}/>, document.getElementById('header'));
	$FW.Ajax({
		url:"http://10.10.100.112/mockjs/12/api/v1/bind/card.json?",
		success : function(data){
			ReactDOM.render(<CashRech item={data} />,document.getElementById("cnt"))
		}
	})
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


const CashRech = React.createClass({
	render : function(){
		return (
			<div>
				<Mask item={this.props.item}/>
				<Attract item={this.props.item}/>
				<Sup item={this.props.item}/>
				<Branch item={this.props.item}/>
				<Warm item={this.props.item}/>
			</div>
		)
	}
})

const Mask = React.createClass({
	render : function(){
		return (
			<div className="cang">
				<div className="masker"></div>
				<div className="boun">
					<div className="resp">尊敬的张先生，您好！</div>
					<div className="beca">由于您的身份信息无法通过系统验证，为了保证您的账户资金安全，您当前无法进行线上充值、投资、更换银行卡等交易。您当前的账户资金安全无虞，若有可用余额，可自行发起提现申请。</div>
					<div className="ever">有任何问题，请联系客服：<span>400-0322-988</span></div>
					<div className="close">关闭</div>
				</div>
			</div>
		)
	}
})



const Attract = React.createClass({
		render : function(){
			var logo=this.props.item.bankLogo;
			var bankName=this.props.item.bankName;
			var name=this.props.item.username;
			var ID=this.props.item.cardNumber;
			var validate=this.props.item.validate;
			return (
				<div className="bank">
					<div className="ash clearfix">
						<div className="img"><img src={logo} /></div>
						<div className="bankname">{bankName}</div>
					</div>
					<div className="belon">
						<div className="name">{name}</div>
						<div className="num">{ID}</div>
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


const Branch = React.createClass({
	render : function(){
		return (
			<div className="modify">
				<div className="money"><input className="recha" type="text" placeholder="输入充值金额，最低1元" /></div>
				<div className="money hao"><input className="recha" type="text" placeholder="输入银行预留手机号"/></div>
				<div className="form clearfix">
					<div className="srcode"><input type="text" className="code" placeholder="请输入验证码"/></div>
					<div className="gqm">获取验证码</div>
				</div>
				<div className="credit">充值</div>
			</div>
		)
	}
})


const Warm = React.createClass({
	render : function(){
		return (
			<div className="rmd">
				<div className="remin">温馨提醒</div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">使用快捷支付充值最低金额应大于等于1元；</span></div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">对充值后无投资的提现，由第三方平台收取0.4%的手续费；</span></div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">充值/提现必须为银行借记卡，不支持存折、信用卡充值；</span></div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">充值需开通银行卡网上支付功 能，如有疑问请咨询开户行客服；</span></div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">单笔充值不可超过该银行充值限额，<span className="colr">查看各银行充值限额；</span></span></div>
				<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">如果充值金额没有及时到账，请<span className="colr">拨打客服</span>查询。</span></div>
			</div>
		)
	}
})







































































