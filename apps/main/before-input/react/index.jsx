$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"绑定银行卡"} back_handler={backward}/>, document.getElementById('header'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


const Input = React.createClass({
	render : function(){
		return (
			<div className="wrap">
				<div className="name clearfix">
					<img src="images/bf-a.png"/>
					<div className="knight">吕骑士</div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix">
					<img src="images/bf-b.png"/>
					<div className="knight">1101**********6353</div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix">
					<img src="images/bf-c.png"/>
					<div className="knight sr">请输入银行卡号</div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix">
					<div className="khy">开户银行</div>
					<div className="yzt">
						<span className="shang">招商银行</span>
						<img className="bf-d" src="images/bf-d.png"/>
						<img src="images/card-c.png"/>
					</div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix">
					<div className="khy">请输入验证码</div>
					<div className="yzt">
						<span className="gry">|</span>
						<span className="zmy">获取验证码</span>
					</div>
				</div>
				
			</div>
		)
	}
})
ReactDOM.render(<Input />,document.getElementById('inpt'));

const Lv = React.createClass({
	render : function(){
		return (
			<div className="phone">已向手机177****0331发送短信验证码，若收不到，请<a className="dot" href="">点击这里</a>获取语音验证码。</div>
		)
	}
})
ReactDOM.render(<Lv />,document.getElementById('exp'));

const Submit = React.createClass({
	render : function(){
		return (
			<div className="refer">提交</div>
		)
	}
})
ReactDOM.render(<Submit />,document.getElementById('put'));

































































