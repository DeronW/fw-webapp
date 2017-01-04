const VerifyPhone = React.createClass({
	render() {
		return (
			<div className="verify-phone-cnt">
				<div className="prompt-text">
					验证码已发送到尾号<span>3456</span> 的手机上
				</div>

				<div className="ui-froms">
					<div className="list code-list">
						<span className="text">手机验证码</span>
						<div className="input">
							<input type="text" placeholder="请输入验证码" />
						</div>

						<div className="get-code-btn">获取验证码</div>
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
	<VerifyPhone />,
	document.getElementById('cnt')	
);
