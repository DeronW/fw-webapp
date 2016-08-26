const API_PATH = document.getElementById("api-path").value;

const Particular = React.createClass({
	getInitialState: function() {
	    return {
	    	inputText: null,
	    	verify_code: null,
	    	layer: true
	    }
	},
	
	handlerChange: function(e){
		this.setState({inputText: e.target.value});
		this.setState({alter: true})
		console.log(e.target.value)
	},
	
	changeHandler: function(e){
		this.setState({verify_code:e.target.value});
		console.log(verify_code)
	},
	
	submitHandle: function(){
		var _this = this;
		if(!_this.state.inputText ){
			$FW.Component.Alert("请输入提现金额")
		}else if(!_this.state.verify_code){
			$FW.Component.Alert("请输入验证码")
		}
	},
	
	hideHandle: function(){
		this.setState({layer: false})
	},
	
	render : function(){
		return (
			<div>
				{this.state.layer ? <Mask hide={this.hideHandle} /> : null}
				
				<div className="stou clearfix">
					<div className="zhaoshang"><img className="ico-zhaoshang" src="images/ico-zhaoshang.jpg"/></div>
					<div className="wz">
						<div className="zh">招商银行</div>
						<div className="nz">6225********1726</div>
					</div>
					<div className="kuaijie"><img src="images/ico-kuaijie.png"/></div>
				</div>
				
				<div className="txt-a">
					<div className="nin">如果您绑定的银行卡暂不支持手机一键支付请联系客服<a href="tel:400-6766-988" className="c-4aa1f9">400-6766-988</a></div>
					<div className="kx">可提现金额(元)：<span style={{fontSize: '38px',color: '#fd4d4c'}}>3,050.00</span></div>
				</div>
				
				<Special />
				
				<div className="xt" onClick={this.submitHandle} >提现</div>
				
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
				
			</div>	
		)
	}
})

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
					<div className="ibguan" onClick={this.props.hide} >关闭</div>
				</div>
			</div>
		)
	}
})

const Special = React.createClass({
	getDefaultProps: function(){
		return {
			countSeconds:3
		}
	},
	
	getInitialState: function() {
		return {
			seconds:0
		}
	},
	
	handlerTestClick: function(){
		if(this.state.seconds !=0) return;
		
		this.setState({seconds: this.props.countSeconds});
		
		this.timer = setInterval(()=> {
            this.setState({seconds: this.state.seconds - 1});
            if (this.state.seconds < 1) {
                clearInterval(this.timer)
            }
        }, 1000)
	},
	
	render : function(){
		return (
			<div>
				<div className="intex">
					<div className="yel">
						<input type="text" className="rsxte" placeholder="120,000" value={this.state.inputText} onInput={this.textInput} onChange={this.handlerChange} />
					</div>
				</div>
				
				<div className="qing clearfix">
					<div className="shyan">
						<div className="mzysq">
							<input type="text" className="ymxs" placeholder="请输入验证码" value={this.state.verify_code} onCodeChange={this.changeHandler} />
						</div>
					</div>
					<div className="miaoh">
						{this.state.seconds ? this.state.seconds + "秒后重新获取" : <span className="zmy" onClick={this.handlerTestClick} >获取验证码</span>}
					</div>
				</div>
				
			</div>
		)
	}
})

$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"提现"} back_handler={backward}/>, document.getElementById('header'));
	$FW.Ajax({
        url: "http://10.10.100.112/mockjs/12/api/v1/bind/card.json?",
        success: function (data) {
            ReactDOM.render(<Particular data={data}/>, document.getElementById("cnt"))
        }
    })
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}