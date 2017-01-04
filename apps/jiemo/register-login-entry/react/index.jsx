const Register = React.createClass({
	render() {
		return (
			<div className="register-login-cnt">
				<div className="top">
					<span className="title">现金贷</span>
				</div>	

				<div className="logo">
					<img src="images/logo.png" />	
				</div>
				
				<div className="register-login-cnt">
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
					
				</div>

				<div className="register-login-btn">
					<div className="ui-btn">下一步</div>
				</div>

			</div>	
		)
	}
});

ReactDOM.render(
	<Register />,
	document.getElementById('cnt')
);
