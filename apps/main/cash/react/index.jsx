const API_PATH = document.getElementById("api-path").value;

const Withdrawals = React.createClass({
	getInitialState: function() {
	    return {
	    	less_than: false,
	    	greater_than: false,
	    	inputText: null,
	    	verify_code: null,
	    	alter: false
	    }
	},
	
	handlerChange: function(e){
		this.setState({inputText: e.target.value});
		this.setState({alter: true})
		console.log(e.target.value)
	},
		
	textInput: function(){
		var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
		if(isNum.test(this.state.inputText)){
			if(this.state.inputText.length>=6){
				this.setState({greater_than: true});
				this.setState({less_than: false})
			}else{
				this.setState({less_than: true});
				this.setState({greater_than: false});
			}
		}
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
	
	render : function(){
		return (
			<div>
				<div className="cang">
					<div className="masker"></div>
					<div className="taine">
						<div className="his">提示</div>
						<div className="fact">
							<div className="">
								<span className="acti">实际到账金额</span>
								<span className="san">¥33,000.00</span>
							</div>
							<div className="pot-a">
								<span className="iner">提现金额</span>
								<span className="zeor">¥3,003,000.00</span>
							</div>
							<div className="pot-b">
								<span className="iner">提现手续费</span>
								<span className="zeor">¥200.00</span>
							</div>
						</div>
						
						<div className="ton clearfix">
							<div className="xiaoqu">取消</div>
							<div className="ding">确定</div>
						</div>
						
					</div>
				</div>
				
				<div className="stou clearfix">
					<div className="zhaoshang"><img className="ico-zhaoshang" src="{this.props.data.bankLogo}"/></div>
					<div className="wz">
						<div className="zh">{this.props.data.bankName}</div>
						<div className="nz">{this.props.data.cardNumber}</div>
					</div>
					<div className="kuaijie"><img src="images/ico-kuaijie.png"/></div>
				</div>
				
				<div className="txt-a">
					<div className="nin">如果您绑定的银行卡暂不支持手机一键支付请联系客服<a href="tel:400-6766-988" className="c-4aa1f9">400-6766-988</a></div>
					<div className="kx">可提现金额(元)：<span style={{fontSize: '38px',color: '#fd4d4c'}}>3,050.00</span></div>
				</div>
				
				<div className="kunag">
					<div className="pure">
						<div className="xuanwu"><input value={this.state.inputText} onInput={this.textInput} onChange={this.handlerChange} className="moneyTxt" type="text" placeholder="请输入提现金额" /></div>
						{this.state.alter ? <div className="choice"><div className="pleas">修改</div></div> : null}
					</div>
				</div>
				
				{this.state.greater_than ? <Greater /> : null}
				{this.state.greater_than ? <Neg /> : null}
				{this.state.less_than ? <Special /> : null}
				
				<div className="xt" onClick={this.submitHandle} >提现</div>
				
				<div>
					<div className="hsuo">提现说明</div>
					<div className="danbi">
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">充值后无投资提现将由第三方平台收取0.4%手续费。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">10万及以下提现，7*24小时实时到帐；10万元及以上，工作日9:00-17:00实时到帐，其余时间及节假日发起提现，顺延至下一工作日处理。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">单笔提现金额不低于10元。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">3个工作日之内到账。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">在双休日和法定节假日期间，也可申请提现。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">填写的提现信息不正确导致提现失败，由此产生的提现费用不予退还。</span></div>
					</div>
				</div>
				
			</div>
		)
	}
})

const Greater = React.createClass({  
	render : function(){
		return (
			<div className="modify">
				<div className="wire"></div>
				<div className="pure">
					<div className="xuanwu" style={{fontSize:'32px'}}>开户银行</div>
					<div className="choice"><div className="pleas" style={{color:'#555555'}}>请选择</div></div>
				</div>
			</div>
		)
	}
})


const Neg = React.createClass({
	getDefaultProps: function(){
		return {
			countSeconds:3
		}
	},
	
	getInitialState: function() {
		return {
			seconds:0,
			note: false
		}
	},
	
	handlerCodeClick: function(){
		if(this.state.seconds !=0) return;
		
		this.setState({seconds: this.props.countSeconds});
		
		this.setState({note : true});
		
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
				<div className="slip clearfix"><a className="peno">忘记开户行？</a></div>
				<div className="qing clearfix">
					<div className="shyan">
						<div className="mzysq">请输入验证码</div>
					</div>
					<div className="miaoh" style={{background:'#d4d4d4'}}>
						{this.state.seconds ? this.state.seconds + "秒后重新获取" : <span className="zmy" onClick={this.handlerCodeClick} >获取验证码</span>}
					</div>
				</div>
				{this.state.note ? <div className="songfa">已向您输入的手机号码 139****0234 发送短信验证码</div> : null}
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
				<div className="qing clearfix">
					<div className="shyan">
						<div className="mzysq" value={this.props.verify_code} onCodeChange={this.changeHandler}>请输入验证码</div>
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
            ReactDOM.render(<Withdrawals data={data}/>, document.getElementById("cnt"))
        }
    })
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}






































































