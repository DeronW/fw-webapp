$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"绑定银行卡"} back_handler={backward}/>, document.getElementById('header'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


const Attract = React.createClass({
		render : function(){
			return (
				<div className="bank">
					<div className="name">{this.props.name}</div>
					<div className="num">{this.props.num}</div>
				</div>
			)
		}
	})
ReactDOM.render(<Attract name="张克川" num="6225********1726" />,document.getElementById('bind'));

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






































































