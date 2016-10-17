'use strict';

const API_PATH = document.getElementById("api-path").value;

var numberFormat = {
	val: "",
	format: function(val) {
		this.val = val.replace(/[^\d.]/g, "").
		//只允许一个小数点
		replace(/^\./g, "").replace(/\.{2,}/g, ".").
		//只能输入小数点后两位
		replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

		return this.val;
	}
};

function isInteger(obj) {
	return Math.floor(obj) === obj
}

var TopNav = React.createClass({
	getInitialState: function () {
		return {
			backBtn: false
		}
	},
	backBtnClick: function () {

	},
	render: function () {
		return (
			<div className="top-nav">
				<div className="info">
					{
						this.props.backBtn ?
							<div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png"/>
							</div> : null
					}

					<div className="title">{this.props.title}</div>
					<span className="r-text" onClick={this.props.callbackInfoBtn}>{this.props.btnText}</span>
				</div>
			</div>
		);
	}
});

//设置光标位置函数
function setCursorPosition(ctrl, pos){
    if(ctrl.setSelectionRange){
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}


var BankAccount = React.createClass({
	getInitialState: function () {
		return {
			typing: false,
			entry: false,
			fruit: false,
			bankList: [],
			value: '',
			bankIndex: null,
			jump: false,
			promptBankNoShow: false
		}
	},

	refreshBankList: function(value){
		console.log(value);
		let fn = () => {
			$FW.Ajax({
				url:API_PATH +　"mpwap/api/v1/getBankList.shtml",
				data:{
					index: "0",
					keyword: value,
					size: "10000"
				},
				success : (data) => {
					console.log(data);
					this.setState({bankList: data.bankList})

					if(data.bankList.length === 0) {
						this.setState({
							promptBankNoShow: true
						});
					} else {
						this.setState({
							promptBankNoShow: false
						});
					}
				}
			})
		}

		clearTimeout(this._timer);
		if(value) this._timer = setTimeout(fn, 500);
	},

	inputHandler: function(){
		this.setState({entry : true});
	},

	handleChange: function(e) {
		var val=e.target.value;
		this.setState({value: val});
		this.refreshBankList(val);
	},

	handleClear: function(){
		this.setState({value: '', fruit: false});
	},

	typingHandler: function(){
		this.setState({typing:　true})
	},

	bankHandler: function (index) {
		this.props.callbackSelectBankInfo(false, this.state.bankList[index]);

		//this.props.callbackBankIndex(this.state.bankList[index]);
	},

	callbackOpenBankBtn: function() {
		this.props.callbackOpenBank(false);
	},


	render : function(){

		let list = ()=> {
			var li = (d, index) => <li key={index} onClick={this.bankHandler.bind(this, index)} ><span className="">{d.bankName}</span> <img src="images/card-c.png"/></li>;

			return <ul className="list">{this.state.bankList.map(li)}</ul>;
		};

		let icon = <img className="suo" src="images/search.png"/>;
		if(this.state.typing) icon = null;

		return (
			<div className="pop-open-bank">

					<TopNav title={"开户支行"} backBtn={true} btnFun={this.callbackOpenBankBtn}

					/>
				
				<div className="select-bank">
					<div className="search">
						{icon}

						<input type="text"
							   className="hunt"
							   onClear={this.props.handleClear}
							   onFocus={this.typingHandler}
							   entry={this.state.entry}
							   onInput={this.inputHandler}
							   onChange={this.handleChange}
							   value={this.state.value}
							   placeholder="请输入开户支行的关键词" />

						{this.state.entry ? <img className="false" onClick={this.handleClear}  src="images/false.jpg"/> : null}
					</div>

					{this.state.bankList.length ? list() : null}

					{
						this.state.promptBankNoShow ? <div className="promptBankNo">请尝试更换搜索关键词或拨打客服电话<span className="number-text">400-0322-988</span>寻求帮助</div> :null
					}

				</div>
			</div>
		)
	}
})



const Withdrawals = React.createClass({
	getInitialState: function() {
	    return {
			modifyShow: false,
			specialShow: false,
			choiceShow: false,
			selectBank: false,
			btn: false, //判断 是否大于10万或小于10万
			popShow: false,
			moneyInput: false,
			inputVal: "",
			codeVal: "",
			selectBankName: this.props.data.bankInfo.bankBranchName,
			selectBankId: "",
			propsAccountAmountVal: this.props.data.accountAmount,
			propsUserInfo: this.props.data,
			promptShow: false,
			voice: null
	    }
	},
	componentDidUpdate: function(a, params) {
		if(this.state.moneyInput) {
			if(ReactDOM.findDOMNode(this.refs.refsMoney) !== null) {

				ReactDOM.findDOMNode(this.refs.refsMoney).focus();
				setCursorPosition(ReactDOM.findDOMNode(this.refs.refsMoney), this.state.inputVal.length);
			}
		}
	},
	handlerOnChange: function(e) {
		if(numberFormat.format(e.target.value)[0] === "0") {
			console.log("a");
			this.setState({
				inputVal: ""
			});

			return false;
		}


		if(e.target.value > this.state.propsAccountAmountVal) {
			$FW.Component.Toast("可提现余额不足");
			return false;
		}

		if(numberFormat.format(e.target.value) !== "") {
			this.setState({
				specialShow: true,
			});
		} else {
			this.setState({
				specialShow: false,
				modifyShow: false
			});
		}

		this.setState({
			inputVal: numberFormat.format(e.target.value)
		});

		if(numberFormat.format(e.target.value) > 100000) {
			this.setState({
				modifyShow: true
			});
		} else {
			this.setState({
				modifyShow: false
			});
		}
	},
	handlerOnBlur: function() {
		if(this.state.inputVal !== "") {
			this.setState({
				choiceShow: true,
				moneyInput: true
			});
		}

	},
	handlerOnFocus: function() {
		this.setState({
			choiceShow: false
		});
	},
	handlerPleasBtn: function() {
		this.setState({
			specialShow: false,
			modifyShow: false,
			choiceShow: false,
			btn: true,
			codeVal: ""
		});
	},
	handlerPost: function() {
		if(this.state.inputVal < 10) {
			$FW.Component.Toast("提现金额不能低于10元");
			return false;
		} else {

		}

		if(this.state.inputVal >= 100000) {
			if(!this.state.modifyShow) {
				this.setState({
					specialShow: true,
					modifyShow: true
				});
				console.log("1");
				return false;
			}

		} else {
			if(!this.state.specialShow) {
				this.setState({
					specialShow: true,
				});
				return false;
			}
		}

		if(this.state.modifyShow || this.props.data.bankInfo.isSpecial) {
			if(this.state.selectBankName == null) {
				$FW.Component.Toast("请选择开户支行");
				return false;
			}
		}

		if(this.state.codeVal === "") {
			$FW.Component.Toast("请输入验证码");
			return false;
		}

		this.setState({
			popShow: true
		});

	},
	handlerSelectPopFun: function() {
		document.body.scrollTop  = 0;
		document.documentElement.scrollTop  = 0;

		this.setState({
			selectBank: true
		});
	},
	handlerColseBtn: function() {
		this.setState({
			popShow: false
		});
	},
	handlerSureBtn: function() {
		var _this = this;

		var val = this.state.inputVal;
		var codeV = this.state.codeVal;

		var bankNoVal = function() {
			if(_this.state.inputVal < 100000) {
				if(_this.props.data.bankInfo.isSpecial) {
					return _this.state.selectBankId;
				} else {
					return "";
				}

			} else {
				if(_this.props.data.bankInfo.lianhangNo == null) {
					return _this.state.selectBankId;
				}else {
					if(_this.state.selectBankId == "") {
						return _this.props.data.bankInfo.lianhangNo;
					} else {
						return _this.state.selectBankId;
					}
				}
			}
		};
		

		window.location.href =  API_PATH +"mpwap/api/v1/withDraw.shtml?reflectAmount=" + val + "&validateCode=" + codeV + "&bankNo=" + bankNoVal() + "&withdrawTicket=" + this.props.data.withdrawToken;

	},
	handlerVoice: function() {
		this.setState({
			voice: +new Date()
		})
	},
	getCode: function(code) {
		this.setState({
			codeVal: code
		});
	},
	getOpenBankShow: function(booleanVal) {
		this.setState({
			selectBank: booleanVal
		});
	},
	getSelectBankInfo: function(hide, bankInfo) {
		this.setState({
			selectBank: hide,
			selectBankName: bankInfo.bankName,
			selectBankId: bankInfo.bankNo
		});
	},
	getPromptShow: function(booleanVal) {
		this.setState({
			promptShow: booleanVal
		});
	},
	callbackOpenBankBtn: function() {
		//window.history.back();
		window.location.href = "http://m.9888.cn/mpwap/orderuser/getUserInfo.shtml";
	},
	getInfoBtn: function() {
		window.location.href = "http://m.9888.cn/static/wap/cash-records/index.html";
	},
	render : function(){
		var _this = this;

		var feeVal = this.state.propsUserInfo.fee;
		var bankId = this.props.data.bankInfo.bankCardNo||'';
		var phone = this.props.data.bankInfo.phoneNo;
		var phoneVal = phone.substring(0, 3) + "****" + phone.substring((phone.length - 4), phone.length);

		var commissionCharge = function() {

			if(_this.state.propsUserInfo.isFeeEnable == true) {
				return ((parseFloat(feeVal) * 10) * (_this.state.inputVal * 100)) / 100000;
			} else {
				return 0;
			}
		};

		var pop = function() {
			var commissionChargeVal = _this.state.inputVal - commissionCharge();
			var commissionChargeText = commissionCharge();


			return <div className="cang">
				<div className="masker"></div>
				<div className="taine">
					<div className="his">提示</div>
					<div className="fact">
						<div className="">
							<span className="acti">实际到账金额</span>
							<span className="san">¥{isInteger(parseFloat(commissionChargeVal)) ? commissionChargeVal + ".00" : commissionChargeVal.toFixed(2)}</span>
						</div>
						<div className="pot-a">
							<span className="iner">提现金额</span>
							<span className="zeor">¥{_this.state.inputVal}</span>
						</div>
						<div className="pot-b">
							<span className="iner">提现手续费</span>
							<span className="zeor">¥{isInteger(parseFloat(commissionChargeText)) ? commissionChargeText + ".00" : commissionChargeText.toFixed(2)}</span>
						</div>
					</div>

					<div className="ton clearfix">
						<div className="xiaoqu" onClick={_this.handlerColseBtn}>取消</div>
						<div className="ding" onClick={_this.handlerSureBtn} >确定</div>
					</div>

				</div>
			</div>
		};


		return (


			<div>
				<TopNav title={"提现"} backBtn={true}  btnFun={this.callbackOpenBankBtn}  btnText={"提现记录"}
						callbackInfoBtn={this.getInfoBtn}
				/>

				<div className="stou clearfix">
					<div className="zhaoshang"><img className="ico-zhaoshang" src={this.props.data.bankInfo.bankLogo}/></div>
					<div className="wz">
						<div className="zh">{this.props.data.bankInfo.bankName}</div>
						<div className="nz">
							{
								bankId.substring(0, 4) + "********" + bankId.substring((bankId.length - 4), bankId.length)
							}
						</div>
					</div>
					<div className="kuaijie"><img src="images/ico-kuaijie.png"/></div>
				</div>

				<div className="txt-a">
					<div className="nin">如果您绑定的银行卡暂不支持手机一键支付请联系客服<a href="tel:400-6766-988" className="c-4aa1f9">400-6766-988</a></div>
					<div className="kx">可提现金额(元)：<span style={{fontSize: '38px',color: '#fd4d4c'}}>{this.props.data.accountAmount}</span></div>
				</div>

				<div className="select-bank-area">
					<div className="kunag">
						<div className="pure">
							<div className="xuanwu">
								{
									!this.state.choiceShow ? <input className="moneyTxt"
																	value={this.state.inputVal}
																	onChange={this.handlerOnChange}
																	onBlur={this.handlerOnBlur}
																	onFocus={this.handlerOnFocus}
																	ref="refsMoney"
																	type="text" placeholder="请输入提现金额"
									/> : <div className="input-text">{this.state.inputVal}</div>
								}

							</div>
							<div className="choice">
								{
									this.state.choiceShow ? <div className="pleas" onClick={this.handlerPleasBtn}>修改</div> : null
								}

							</div>
						</div>
					</div>

					{
						this.state.modifyShow || this.props.data.bankInfo.isSpecial || this.props.data.bankInfo.isCompanyAgent ? <div className="modify" onClick={this.handlerSelectPopFun} >
							<div className="wire"></div>
							<div className="pure">
								<div className="xuanwu" style={{fontSize:'32px'}}>
									{this.state.selectBankName === null ? "开户支行" : this.state.selectBankName}
								</div>
								<div className="choice">
									<div className="pleas" style={{color:'#555555'}}  >请选择</div></div>
							</div>
						</div> : null
					}

					{
						this.state.specialShow ? <Special
							callbackCode={this.getCode}
							callbackPromptShow={this.getPromptShow}
							callbackVoice={this.state.voice}
							propsMoneyValue={this.state.inputVal}
							propsPhone={phone}
						/> : null
					}


				</div>

				{
					this.state.promptShow ?
						<div className="old-user-prompt-text">已向手机{phoneVal}发送短信验证码，若收不到，请 <span className="c" onClick={this.handlerVoice}>点击这里</span>获取语音验证码。</div> : null
				}

				<div className="xt" onClick={this.handlerPost}>
						下一步
				</div>
				
				<div>
					<div className="hsuo">提现说明</div>
					<div className="danbi">
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">充值后无投资提现将由第三方平台收取0.4%手续费。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">10万及以下提现，7*24小时实时到帐；10万元及以上，工作日9:00-17:00实时到帐，其余时间及节假日发起提现不予受理。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">单笔提现金额不低于10元。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">3个工作日之内到账。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">在双休日和法定节假日期间，也可申请提现。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">填写的提现信息不正确导致提现失败，由此产生的提现费用不予退还。</span></div>
					</div>
				</div>


				{
					this.state.selectBank ? <BankAccount
						callbackSelectBankInfo={this.getSelectBankInfo}
						callbackOpenBank={this.getOpenBankShow}

					/> : null
				}

				{
					this.state.popShow ? pop() : null
				}

			</div>
		)
	}
})


const Greater = React.createClass({  
	popClickShow: function() {
		this.props.callbackCreateShow(true);
	},
	render : function(){
		return (
			<div className="modify" onClick={this.popClickShow} >
				<div className="wire"></div>
				<div className="pure">
					<div className="xuanwu" style={{fontSize:'32px'}}>{this.props.name ? this.props.name : '开户银行'}</div>
					<div className="choice"><div className="pleas" style={{color:'#555555'}}  >请选择</div></div>
				</div>
			</div>
		)
	}
})


const Neg = React.createClass({
	getDefaultProps: function(){
		return {
			countSeconds: 60,
			verify_code: null
		}
	},
	
	getInitialState: function() {
		return {
			seconds:0,
			note: false
		}
	},
	
	changeHandler: function (e) {
        this.setState({verify_code: e.target.value});
        console.log(e.target.value)
        
    },
	
	handlerCodeClick: function(){
		console.log("a");
		if(this.state.seconds !=0) return;

		if(this.props.accountAmout === 0) {
			return false;
		}

		this.setState({seconds: this.props.countSeconds});
		
		this.setState({note : true});
		
		this.timer = setInterval(()=> {
            this.setState({seconds: this.state.seconds - 1});
            if (this.state.seconds < 1) {
                clearInterval(this.timer)
            }
        }, 1000)
		
		$FW.Ajax({
	        url: API_PATH +"mpwap/api/v1/sendCode.shtml?isVms=SMS&type=1",
            success: function (data) {
				console.log(data);
            }
	    })
		
	},
	
	render : function(){
		return (
			<div>
				<div className="slip clearfix"><a href="http://www.lianhanghao.com/index.php" className="peno">忘记开户行？</a></div>
				<div className="qing clearfix">
					<div className="shyan">
						<div className="mzysq">
							<input className="odec" type="text"
								value={this.state.verify_code}
								onChange={this.changeHandler} placeholder="请输入手机验证码"/>
						</div>
					</div>
					<div className="miaoh" style={{background:'#d4d4d4'}}>
						{this.state.seconds ? this.state.seconds + "秒后重新获取" : <span className="zmy" onClick={this.handlerCodeClick} >获取验证码</span>}
					</div>
				</div>
				{this.state.note ? <div className="songfa">已向您输入的手机号码 139****0234 发送短信验证码</div> : null}
			</div>
		)
	}
})


const Special = React.createClass({
	getInitialState: function() {
		this._timing = false;

		return {
			seconds: null,
			forbid: true,
			codeType: 5,
			isVmsType: "SMS"
		}
	},
	componentWillReceiveProps: function(nextProps) {
		if(!this._timing && (+new Date()) - nextProps.callbackVoice < 10 ) {
			console.log("a");
			this.setState(
				{
					codeType: 3,
					isVmsType: "VMS"
				},
				this.handlerTestClick
			);
		} else {
			if((+new Date())　-　nextProps.callbackVoice  < 10) {
				if(this.state.seconds > 0 && this.state.seconds !== 60) {
					$FW.Component.Toast(this.state.seconds + "s后才能获取");
				}
			}
		}

	},
	componentWillUnmount: function() {
		clearInterval(this.timer);
	},
	handlerTestClick: function(){
		var _this = this;

		$FW.Ajax({
			url: API_PATH + "/mpwap/api/v1/validate.shtml?reflectAmount=" + this.props.propsMoneyValue,
			success: function (data) {
				_this.props.callbackPromptShow(true);

				_this.setState({
					forbid: false,
					seconds: 60
				});

				_this._timing = true;
				_this.timer = setInterval(()=> {
					_this.setState(
						{
							seconds: _this.state.seconds - 1
						}
					);

					if (_this.state.seconds == 0) {
						clearInterval(_this.timer)

						_this._timing = false;
						_this.setState({
							seconds: null,
							forbid: true
						});
					}
				}, 1000);

				console.log("1");

				$FW.Ajax({
					url: API_PATH + "mpwap/api/v1/sendCode.shtml?type="+ _this.state.codeType +"&destPhoneNo=" + _this.props.propsPhone + "&isVms=" + _this.state.isVmsType,
					success: function (data) {
						console.log(data);
					},
					fail: function() {
						_this.setState(
							{
								seconds: null,
								forbid: true
							}
						);

						clearInterval(_this.timer);
						_this.timer = null;
					}
				})

				console.log("2");
			},
			fail: function() {

			}
		})



	},
	inputCodeOnChange: function(e) {
		this.props.callbackCode(e.target.value);
	},
	
	render : function(){
		return (
			<div>
				<div className="qing clearfix">

					<div className="shyan">
						<div className="mzysq" value={this.props.verify_code} onCodeChange={this.changeHandler}>
							<input className="odec" type="text" onChange={this.inputCodeOnChange} placeholder="请输入手机验证码"/>
						</div>
					</div>
					<div className={this.state.forbid ? "miaoh" : "miaoh c"}>
						{
							this.state.seconds !== null ?
								this.state.seconds + "秒后重新获取" :
								<span className="zmy" onClick={this.handlerTestClick} ><span className="text">获取验证码</span></span>
						}
					</div>
				</div>
			</div>
		)
	}
})





$FW.DOMReady(function(){

	$FW.Ajax({
        url: API_PATH +"mpwap/api/v1/getWithdrawInfo.shtml",
		enable_loading: true,
        success: function (data) {
            ReactDOM.render(<Withdrawals data={data}/>, document.getElementById("cnt"))
        }
    })
});

