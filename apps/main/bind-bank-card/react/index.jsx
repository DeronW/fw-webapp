$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"绑定银行卡"} back_handler={backward}/>, document.getElementById('header'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}

const Cover = React.createClass({
	render : function(){
		return (
			<div className="black"></div>
		)
	}
})
ReactDOM.render(<Cover  />,document.getElementById('layer'));

//弹层
const Bomb = React.createClass({
	render : function(){
		return (
			<div className="boun">
				<div className="resp">尊敬的张先生，您好！</div>
				<div className="beca">由于您的身份信息无法通过系统验证，为了保证您的账户资金安全，您当前无法进行线上充值、投资、更换银行卡等交易。您当前的账户资金安全无虞，若有可用余额，可自行发起提现申请。</div>
				<div className="ever">有任何问题，请联系客服：<span>400-0322-988</span></div>
				<div className="close">关闭</div>
			</div>
		)
	}
})
ReactDOM.render(<Bomb  />,document.getElementById('box'));

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
ReactDOM.render(<Invalid />,document.getElementById('invad'));

const Attract = React.createClass({
		getInitialState : function(){
			return {
				logo :"",
				bankName :"",
				name : "",
				ID : "",
				validate :""
			};
		},
		
		componentDidMount : function(){
			var _this = this;
			$FW.Ajax({
				url:"http://10.10.100.112/mockjs/12/api/v1/bind/card.json?",
				success : function(data){
					_this.setState({
						logo:data.bankLogo,
						bankName:data.bankName,
						name: data.username,
						ID: data.cardNumber,
						validate: data.validate
					})
				}
				
			});
		},
	
		render : function(){
			var logo=this.state.logo;
			var bankName=this.state.bankName;
			var name=this.state.name;
			var ID=this.state.ID;
			var validate=this.state.validate;
			return (
				<div className="bank">
					<div className="ash clearfix">
						<div className="img"><img src="{logo}" /></div>
						<div className="bankname">{bankName}</div>
					</div>
					<div className="belon">
						<div className="name">{name}</div>
						<div className="num">{ID}</div>
						{validate ? <div className="card-e"></div> : null}
					</div>
				</div>
			)
		}
	})
ReactDOM.render(<Attract />,document.getElementById('bind'));








const Sup = React.createClass({
	render : function(){
		return (
			<div className="port">如果您绑定的银行卡暂不支持手机一键支付请联系客服<span className="blue">400-6766-988</span></div>
		)
	}
})
ReactDOM.render(<Sup />,document.getElementById('support'));

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
ReactDOM.render(<Branch />,document.getElementById('bran'));

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
ReactDOM.render(<Warm />,document.getElementById('warm'))

