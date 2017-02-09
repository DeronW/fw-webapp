function gotoHandler(link) {
    location.href = encodeURI(link);
}

function isMobilePhone (phone) {
    return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}

var numberFormat = {
    val: "",
    format: function (val) {
        if (!isNaN(val.replace(/[0-9]/g, ""))) {
            this.val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
        }

        return this.val;
    }
};

function verificationNum(val) {
	var reg = new RegExp("^[0-9]*$");
	return reg.test(val)
}

function space(str) {
    return str.replace(/ /g, "");
}

const WithholdServer = React.createClass({
	handlerBack(ble) {
		this.props.getWithholdServerPop(false);
	},
	render() {
		return (
			<div className="withhold-server">
				<div className="title-nav">
					<div className="icon" onClick={this.handlerBack}></div>
					<div className="title-text">
						代扣服务协议
					</div>
				</div>

				<div className="withhold-server-cnt">
					<div className="title">
						借款协议
					</div>

					<div className="text">
						欢迎阅读金融工场（以下简称本公司）用户协议。本协议将详述您在域名为 www.9888.cn 的互联网网站（备案号为：京ICP证130046号，以下简称金融工场）使用本公司服务所须遵守的条款和条件。
					</div>
					<div className="text">
						您成为金融工场用户前，必须阅读、同意并接受本协议中所含的所有条款和条件，包括以下明示载明的及因被提及而纳入的文件、条款和条件。本公司强烈建议：您阅读本协议时，也应阅读本协议所提及的其他网页中所包含的资料，因为其可能包含对作为金融工场用户的您适用的进一步条款和条件。请注意：点击划有底线的词句即可链接到相应网页。
					</div>
					<div className="text">
			您申请注册为金融工场用户，表明您已经充分阅读、理解并无任何附加条件的接受了本协议中含有的所有条款和条件，包括本协议中载明的及因被提及而纳入的所有文件、条款和条件。
					</div>

					<div className="text">
						<div className="q">
							一、用户资格
						</div>
						<div className="a">
							1.1 本公司的服务仅向适用法律规定的能够签订有法律约束力文件的个人、企业及其他组织提供并由其使用。
						</div>
					</div>
				</div>
			</div>
		)
	}
});

const SetCashCard = React.createClass({
	getInitialState() {
		return {
			name: '',
			id: '',
			bankNum: '',
            bankName: '',
			phone: '',
			cardinfoBankName: '',
			cardinfoLogoUrl: '',
            cardType: '',
            selectClause: false,
			withholdServerPop: false,
            loading: false,
            canVerify:''
		}
	},
	changeName(e) {
		let val = e.target.value;

		this.setState({
			name: space(val)
		});
	},
	changeId(e) {
		let val = e.target.value;

		this.setState({
			id: space(val)
		});
	},
	changeBankNum(e) {
		let val = e.target.value;

		this.setState({
			bankNum: numberFormat.format(val)
		});
	},
	blurBankNum(e) {

		if(!space(this.state.bankNum).length > 19 || !space(this.state.bankNum).length < 16) {
			$FW.Ajax({
				url: `${API_PATH}api/bankcard/v1/cardinfo.json`,
            	method: "POST",
				data: {
					bankCardNo: space(this.state.bankNum),
					token: localStorage.userToken,
					userGid: localStorage.userGid,
					userId: localStorage.userId,
					sourceType: 3
				}
			}).then((data) => {
				this.setState({
					cardinfoBankName: data.cardInfo.bankName,
					cardinfoLogoUrl: data.cardInfo.logoUrl,
                    cardType: data.cardInfo.cardType,
                    canVerify:data.cardInfo.canVerify,
                    bankName: data.cardInfo.bankName

				});
			}, (error) => {

			})
		} else {
			$FW.Component.Toast("储蓄卡格式不对");
		}
	},
	changePhone (e) {
		let val = e.target.value;

		if(verificationNum(val)) {
			if(val.length <= 11) {
				this.setState({
					phone: space(val)
				});
			}
		}
	},
	handlerClause() {
		this.setState({
			selectClause: !this.state.selectClause
		});
	},
	handlerWithholdServer() {
		this.setState({
			withholdServerPop: true
		});
	},
	callbackWithholdServerPop(ble) {
		this.setState({
			withholdServerPop: ble
		});
	},
	handlerNext() {
        if(this.state.name == '') {
			$FW.Component.Toast("姓名不能为空");
		} else if(this.state.name.length > 20) {
			$FW.Component.Toast("姓名不能超过20个字符");
		}else if (this.state.id == '') {
			$FW.Component.Toast("身份证不能为空");
		} else if(!isCardNo(this.state.id)) {
			$FW.Component.Toast("身份证格式不对");
		} else if (this.state.bankNum == '') {
			$FW.Component.Toast("储蓄卡不能为空");
		} else if(space(this.state.bankNum).length > 19 || space(this.state.bankNum).length < 16) {
			$FW.Component.Toast("储蓄卡格式不对");
		} else if (this.state.phone == '') {
			$FW.Component.Toast("手机号不能为空");
		} else if (!isMobilePhone(this.state.phone)) {
			$FW.Component.Toast("手机号格式不对");
		} else if(!this.state.selectClause) {
			$FW.Component.Toast("请勾选代扣服务协议");
		} else if(this.state.cardType == 1){
            $FW.Component.Toast("请绑定借记卡");
        } else if(this.state.canVerify == 0){
            $FW.Component.Toast("该银行卡暂不支持绑定");
        }else {
			$FW.Ajax({
				url: `${API_PATH}api/bankcard/v1/commitinfo.json`,
				method: 'POST',
                data: {
                    bankName: this.state.bankName,
                    cardHolderName: this.state.name,
                    cardNo: space(this.state.bankNum),
                    cardType: this.state.cardType,
                    idCard: this.state.id,
                    mobile: this.state.phone,
                    operatorType: localStorage.userStatus,
                    token: localStorage.userToken,
                    userGid: localStorage.userGid,
                    userId: localStorage.userId,
                    sourceType: 3
                }

			}).then((data) => {
				let bankCardGid = data.bindBankInfo.bankCardGid;
				let operatorBankcardGid = data.bindBankInfo.operatorBankcardGid;

				window.location.href = `/static/loan/user-verify-phone/index.html?bankCardGid=${bankCardGid }&operatorBankcardGid=${operatorBankcardGid}`;
            },(error) => {
                console.log(error);
            });
		}
	},
	render() {

		return (
			<div className="set-cash-card-cnt">
				{
					this.state.withholdServerPop ? <WithholdServer getWithholdServerPop={this.callbackWithholdServerPop} /> : null
				}
				<div className="ui-froms">
					<div className="list">
						<span className="text">姓名</span>
						<div className="input">
							<input onChange={this.changeName} value={this.state.name} type="text" placeholder="请输入姓名" />
						</div>
					</div>
					<div className="list">
						<span className="text">身份证号</span>
						<div className="input">
							<input onChange={this.changeId} value={this.state.Id} type="text" placeholder="请输入身份证号码" />
						</div>
					</div>
				</div>

				<div className="ui-froms">
					<div className="list prompt-list">
						<span className="text">储蓄卡号</span>
						<div className="input">
							<input onChange={this.changeBankNum} onBlur={this.blurBankNum} value={this.state.bankNum} type="text" placeholder="输入储蓄卡号" />
						</div>

						<div className="list-bank-li">
							<span className="prompt-text" onClick={() => gotoHandler(`/static/loan/user-bank-support/index.html`)}>
								支持银行
								<img src="images/prompt-icon.png" />
							</span>
							{
								this.state.cardinfoBankName != '' ?
                                    <span className="bank"><img className="logo-icon" src={this.state.cardinfoLogoUrl} />{this.state.cardinfoBankName}</span> : null
							}
						</div>
					</div>
				</div>

				<div className="ui-froms">
					<div className="list">
						<span className="text">手机号</span>
						<div className="input">
							<input onChange={this.changePhone} value={this.state.phone} type="text" placeholder="银行卡预留手机号" />
						</div>
					</div>
				</div>

				<div className="clause">
					<span className={"icon " + (this.state.selectClause ? "select-icon" : "icon")} onClick={this.handlerClause}></span>
					<span className="text">
						同意
						<span onClick={this.handlerWithholdServer}>《代扣服务协议》</span>
					</span>
				</div>

				<div className="next-btn">
					<div onClick={this.handlerNext} className="ui-btn">下一步</div>
				</div>
			</div>
		)
	}
});



ReactDOM.render(<Header title={"设置提现卡"}/>, document.getElementById('header'));

ReactDOM.render(<SetCashCard />, document.getElementById('cnt'))
