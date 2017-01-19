const Register = React.createClass({
	getInitialState() {
		return {
			pwdVal: ''
		}
	},
	changePwd(e) {
		this.setState({
			pwdVal: e.target.value
		});
	},
	loadingBtn() {
		let _this = this;

		$FW.Ajax({
			url: API_PATH + "/api/userBase/v1/login.json",
			method: "POST",
			enable_loading: true,
			data: {
				mobile: location.search.split("=")[1],
				password: _this.state.pwdVal,
				sourceType: 3
			},
			success: function (data) {
				localStorage.userGid = data.userLogin.userGid;
				localStorage.userId = data.userLogin.userId;
				localStorage.userToken = data.userLogin.userToken;
				localStorage.userStatus = data.userLogin.userStatus;

				//location.href = `${location.protocol}\/\/${location.host}/static/apply-loan/index.html`;
			},
			fail: function(code, mes) {

			}
		})
	},
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
					<span className="phone-text">{location.search.split("=")[1]}</span>欢迎登录现金贷!
				</div>

				<div className="from-cnt">
					<div className="from">
						<div className="icon"></div>

						<div className="input">
							<input
								type="passwold"
		   						placeholder="请输入登录密码"
								onChange={this.changePwd}
							/>
						</div>

						<div className="pwd-icon">

						</div>
					</div>
				</div>


				<div className="register-login-btn">
					<div className="ui-btn" onClick={this.loadingBtn}>下一步</div>
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
