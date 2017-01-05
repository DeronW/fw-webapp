const Register = React.createClass({
	render() {
		return (
			<div className="login-cnt">
				<div className="top">
					<span className="icon"></span>
					<span className="title">登录</span>
				</div>	

				<div className="logo">
					<img src="images/logo.png" />	
				</div>

				<div className="get-name-phone">
					<span className="phone-text">13112121123</span>欢迎登录现金贷!	
				</div>
				
				<div className="from-cnt">
					<div className="from">
						<div className="icon"></div>

						<div className="input">
							<input  type="text" placeholder="请输入手机号进行注册登录" />
						</div>
							
						<div className="pwd-icon">
								
						</div>
					</div>
				</div>
						

				<div className="register-login-btn">
					<div className="ui-btn">下一步</div>
				</div>

				<div className="forget-pwd-link">
					<a href="">忘记密码?</a>
				</div>

			</div>	
		)
	}
});

ReactDOM.render(
	<Register />,
	document.getElementById('cnt')
);
