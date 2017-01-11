function verificationNum(val) {
	var reg = new RegExp("^[0-9]*$");
	return reg.test(val)
}

function isMobilePhone (phone) {
    return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}

const Register = React.createClass({
	getInitialState() {
		return {
			val: ''
		}
	},
	changeVal(e) {
		if(verificationNum(e.target.value)) {
			this.setState({
				val: e.target.value	
			});
		}		
	},

	handleGetCode() {
		var _this = this;

		if(!isMobilePhone(this.state.val)) {
			$FW.Component.Toast("手机号格式不对");
		} else {
			$FW.Ajax({
				url: API_PATH + "api/userBase/v1/sendVerifyCode.json",
				method: "POST",
				data: {
					mobile: _this.state.val,
					userOperationType: 3,
					sourceType: 3
				},			
				success: function (data) {
					location.href = location.protocol + "//xjb.9888.cn/static/register/index.html?codeToken=" + data.codeToken + "&phone=" + _this.state.val;
				},
				fail: function(code, mes) {
					if(code == 1029) {
						location.href = location.protocol + "//xjb.9888.cn/static/login/index.html?phone=" + _this.state.val;
						console.log(code);
					}
				}
			})
		}
	},

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
								<input  type="text" value={this.state.val} onChange={this.changeVal} placeholder="请输入手机号进行注册登录" />
							</div>
								
							<div className="pwd-icon">
									
							</div>
						</div>
					</div>
					
				</div>

				<div className="register-login-btn">
					<div className="ui-btn" onClick={() => this.handleGetCode()}>下一步</div>
				</div>

			</div>	
		)
	}
});

ReactDOM.render(
	<Register />,
	document.getElementById('cnt')
);
