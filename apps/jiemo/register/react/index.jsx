const Register = React.createClass({
	render() {
		return (
			<div className="register-cnt">
				<div className="prompt-text">
					已发送短信验证码到号码<span>1234532</span>
				</div>

				<div className="ui-froms">
					<div className="list code-list">
						<span className="icon"></span>
						<div className="input">
							<input type="text" placeholder="输入手机验证码" />
						</div>

						<div className="get-code-btn">获取验证码</div>
					</div>
					<div className="list pwd-list">
						<span className="icon"></span>
						<div className="input">
							<input type="text" placeholder="设置8-16位的字母及数字组合密码" />
						</div>

						<span className="icon-pwd"></span>
					</div>
				</div>		

				<div className="determine-btn">
					<div className="ui-btn">确定</div>
				</div>
			</div>	
		)
	}
});

ReactDOM.render(
	<Register />,
	document.getElementById('cnt')
)
