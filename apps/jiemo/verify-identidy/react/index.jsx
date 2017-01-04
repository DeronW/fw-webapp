// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}

function verificationNum(val) {
	var reg = new RegExp("^[0-9]*$");
	return reg.test(val)
}


const VerifyIdentidy = React.createClass({
	getInitialState() {
		return {
			countdown: 0,
			underWayCode: true,
			idVal: '',
			codeVal: ''
		}
	},
	idChange(e) {
		this.setState({
			idVal: e.target.value
		});
	},
	changeCode(e) {
		if(e.target.value.length <= 6) {
			if (verificationNum(e.target.value)) {
				this.setState({
					codeVal: e.target.value 
				});
			}	
		}
	},
	handleCode() {
		this.setState({
			countdown: 5,
			underWayCode: false 
		});


		if(this.state.underWayCode) {
			console.log(this.state.countdown)
			console.log(this.state.underWayCode)

			this.time = setInterval(() => {
				console.log(this.state.countdown)
				/*this.setState({
					countdown: this.state.countdown - 1
				});*/	
			}, 1000);		
		} else {
			
		}
	},
	handleSetPws() {
		if(this.state.idVal == '') {
			console.log("id 1");
		} else if(!isCardNo(this.state.idVal)) {
			console.log("id 2");	
		} else if(this.state.codeVal == '') {
			console.log("验证码不能为空");
		}	
	},

	render() {
		return (
			<div className="verify-identidy-cnt">
				<div className="ui-froms">
					<div className="list">
						<span className="text">真实姓名</span>
						<div className="input">
							<div className="input-text">周先生</div>
						</div>
					</div>
					<div className="list">
						<span className="text">身份证号</span>
						<div className="input">
							<input type="text" onChange={this.idChange} placeholder="请输入身份证号码" />
						</div>
					</div>
					<div className="list">
						<span className="text">手机号码</span>
						<div className="input">
							<div className="input-text">136****5928</div>
						</div>
					</div>
					<div className="list code-list">
						<span className="text">手机验证码</span>
						<div className="input">
							<input type="text" value={this.state.codeVal} onChange={this.changeCode} placeholder="请输入验证码" />
						</div>

						<div className="get-code-btn" onClick={() => this.handleCode()}>获取验证码</div>
					</div>
				</div>		

				<div className="set-pws-btn">
					<div className="ui-btn" onClick={() => this.handleSetPws()}>设置交易密码</div>
				</div>
			</div>
		)
	}	
});

ReactDOM.render(
	<VerifyIdentidy />,
	document.getElementById('cnt')
)
