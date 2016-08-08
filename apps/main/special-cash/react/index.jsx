$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"提现"} back_handler={backward}/>, document.getElementById('header'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


const Mask = React.createClass({
	render : function(){
		return (
			<div className="cang">
				<div className="masker"></div>
				<div className="taine">
					<div className="zunjz">尊敬的张先生，您好！</div>
					<div className="ynin">由于您的身份信息无法通过系统验证，为了保证您的账户资金安全，您当前无法进行线上充值、投资、更换银行卡等交易。您当前的账户资金安全无虞，若有可用余额，可自行发起提现申请。您发起提现成功之后，资金会于3个工作日内（不含提现申请发起日）到达您的银行卡账户。</div>
					<div className="liueng">
						<div className="uic">提现流程：</div>
						<div className="ziu">1.您发起提现申请。</div>
						<div className="ziu">2.资金提现到安全的银行卡里。</div>
						<div className="ziu">3.审批之后，徽商银行给您转账。</div>
					</div>
					<div className="ialix">有任何问题，请联系客服：<span style={{color:'#4aa1f9'}}>400-0322-988</span></div>
					<div className="ibguan">关闭</div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Mask />,document.getElementById('masker'));


const Recruit = React.createClass({
	render : function(){
		return (
			<div className="stou clearfix">
				<div className="zhaoshang"><img className="ico-zhaoshang" src="images/ico-zhaoshang.jpg"/></div>
				<div className="wz">
					<div className="zh">招商银行</div>
					<div className="nz">6225********1726</div>
				</div>
				<div className="kuaijie"><img src="images/ico-kuaijie.png"/></div>
			</div>
		)
	}
})
ReactDOM.render(<Recruit />,document.getElementById('spet'));

const If = React.createClass({
	render : function(){
		return (
			<div className="txt-a">
				<div className="nin">如果您绑定的银行卡暂不支持手机一键支付请联系客服<a href="tel:400-6766-988" className="c-4aa1f9">400-6766-988</a></div>
				<div className="kx">可提现金额(元)：<span style={{fontSize: '38px',color: '#fd4d4c'}}>3,050.00</span></div>
			</div>
		)
	}
})
ReactDOM.render(<If />,document.getElementById('ts'));

const Special = React.createClass({
	render : function(){
		return (
			<div>
				<div className="intex">
					<div className="yel">120,000</div>
				</div>
				
				<div className="qing clearfix">
					<div className="shyan">
						<div className="mzysq">请输入验证码</div>
					</div>
					<div className="miaoh">120秒后重新获取</div>
				</div>
				
				<div className="xt">提现</div>
				
			</div>
		)
	}
})
ReactDOM.render(<Special />,document.getElementById('bdtx'));

const Single = React.createClass({
	render : function(){
		return (
			<div>
				<div className="hsuo">提现说明</div>
				<div className="danbi">
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">单笔提现金额不低于10元。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">3个工作日之内到账。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">在双休日和法定节假日期间，也可申请提现。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">填写的提现信息不正确导致提现失败，由此产生的提现费用不予退还。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">充值后无投资提现将由第三方平台收取0.4%手续费</span></div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Single />,document.getElementById('xtms'));



































































