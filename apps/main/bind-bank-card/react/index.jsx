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
			<div className="remin">温馨提醒</div>
//			<div className="atpre">
//				
//			
//			</div>
		)
	}
})
ReactDOM.render(<Warm />,document.getElementById('warm'))






































































