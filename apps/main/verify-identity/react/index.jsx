$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"验证身份"} back_handler={backward}/>, document.getElementById('header'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


const Verification = React.createClass({
	render : function(){
		return (
			<div className="inld">
				<div className="eri">
					<div className="dream clearfix">
						<img className="fc" src="images/bf-a.png"/>
						<div className="kgt">吕骑士</div>
					</div>
					<div className="dream drm clearfix">
						<img className="fc icno" src="images/bf-b.png"/>
						<div className="good">请输入身份证号</div>
					</div>
					<div className="qing clearfix">
						<div className="shyan">
							<div className="mzysq">请输入验证码</div>
						</div>
						<div className="miaoh">获取验证码</div>
					</div>
					<div className="voice">已向手机177****0331发送短信验证码，若收不到，请<a href="" className="geanc">点击这里</a>获取语音验证码。</div>
					<div className="trade">修改交易密码</div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Verification />,document.getElementById('contain'));





































































