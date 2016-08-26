const BindCard = React.createClass({
	render : function(){
		return(
			<div>
				<Attract item={this.props.item}/>
				<Sup item={this.props.item}/>
				<Branch item={this.props.item}/>
				<Warm item={this.props.item}/>
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
						<div className="card-e"></div>
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
				<div className="pure">
					<div className="xuanwu">修改绑定银行卡</div>
					<div className="choice"><div className="pleas">申请修改</div></div>
				</div>
				<div className="wire"></div>
				<div className="pure">
					<div className="xuanwu">北京招商银行宣武门支行</div>
					<div className="choice"><div className="pleas">请选择</div></div>
				</div>
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
	ReactDOM.render(<Header title={"绑定银行卡"} back_handler={backward}/>, document.getElementById('header'));
	$FW.Ajax({
		url:"http://10.10.100.112/mockjs/12/api/v1/bind/card.json?",
		success : function(data){
			if(data.validate){
				ReactDOM.render(<Invalid />,document.getElementById("tie-wrap"))
			}
			ReactDOM.render(<BindCard item={data}/>,document.getElementById("cnt"))
		}
	})
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}




































































