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
					<span className="r-text">{this.props.btnText}</span>
				</div>
			</div>
		);
	}
});


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
			var li = (d, index) => <li key={index} onClick={this.bankHandler.bind(this, index)} >{d.bankName} <img src="images/card-c.png"/></li>;

			return <ul className="list">{this.state.bankList.map(li)}</ul>;
		};

		let icon = <img className="suo" src="images/search.png"/>;
		if(this.state.typing) icon = null;

		return (
			<div className="pop-open-bank">

					<TopNav title={"开户支行"} backBtn={true} btnFun={this.callbackOpenBankBtn}/>	
				
				

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
			selectBankName: "",
			selectBankId: "",
			propsAccountAmountVal: this.props.data.accountAmount,
			propsUserInfo: this.props.data
	    }
	},
	componentDidUpdate: function(a, params) {
		if(this.state.moneyInput) {
			if(ReactDOM.findDOMNode(this.refs.refsMoney) !== null) {
				ReactDOM.findDOMNode(this.refs.refsMoney).focus();
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

		if(numberFormat.format(e.target.value) >= 100000) {
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

		if(this.state.modifyShow) {
			if(this.state.selectBankName === "") {
				$FW.Component.Toast("请选择银行");
				return false;
			}
		}

		console.log(this.state.codeVal);

		if(this.state.codeVal === "") {
			$FW.Component.Toast("请输入验证码");
			return false;
		}

		this.setState({
			popShow: true
		});

	},
	handlerSelectPopFun: function() {
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
		var val = this.state.inputVal;
		var codeV = this.state.codeVal;

		window.location.href =  API_PATH +"mpwap/api/v1/withDraw.shtml?reflectAmount=" + val + "&validateCode=" + codeV + "&bankNo=" + this.state.selectBankId;

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
	callbackOpenBankBtn: function() {
		window.history.back();
	},
	render : function(){
		var _this = this;

		var feeVal = this.state.propsUserInfo.fee;

		var commissionCharge = function() {
			console.log(_this.state.propsUserInfo.isFeeEnable);

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

		console.log(this.props.data);

		return (


			<div>
				<TopNav title={"提现"} backBtn={true}  btnFun={this.callbackOpenBankBtn}/>

				<div className="stou clearfix">
					<div className="zhaoshang"><img className="ico-zhaoshang" src={this.props.data.bankInfo.bankLogo}/></div>
					<div className="wz">
						<div className="zh">{this.props.data.bankInfo.bankName}</div>
						<div className="nz">{this.props.data.bankInfo.bankCardNo}</div>
					</div>
					<div className="kuaijie"><img src="images/ico-kuaijie.png"/></div>
				</div>

				<div className="txt-a">
					<div className="nin">如果您绑定的银行卡暂不支持手机一键支付请联系客服<a href="tel:400-6766-988" className="c-4aa1f9">400-6766-988</a></div>
					<div className="kx">可提现金额(元)：<span style={{fontSize: '38px',color: '#fd4d4c'}}>{this.props.data.accountAmount}</span></div>
				</div>

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
					this.state.modifyShow ? <div className="modify" onClick={this.handlerSelectPopFun} >
							<div className="wire"></div>
							<div className="pure">
							<div className="xuanwu" style={{fontSize:'32px'}}>
								{this.state.selectBankName === "" ? this.props.data.bankInfo.bankBranchName : this.state.selectBankName}
							</div>
							<div className="choice">
								<div className="pleas" style={{color:'#555555'}}  >请选择</div></div>
							</div>
						</div> : null
				}

				{
					this.state.specialShow ? <Special
						callbackCode={this.getCode}
					/> : null
				}


				

				<div className="xt" onClick={this.handlerPost}>
						下一步
				</div>
				
				<div>
					<div className="hsuo">提现说明</div>
					<div className="danbi">
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">充值后无投资提现将由第三方平台收取0.4%手续费。</span></div>
						<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">10万及以下提现，7*24小时实时到帐；10万元及以上，工作日9:00-17:00实时到帐，其余时间及节假日发起提现，顺延至下一工作日处理。</span></div>
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
	getDefaultProps: function(){
		return {
			countSeconds: 60
		}
	},
	getInitialState: function() {
		return {
			seconds:0,
			forbid: true
		}
	},
	handlerTestClick: function(){
		var _this = this;

		this.setState({
			forbid: false
		});

		if(this.state.seconds !=0) return;
		
		this.setState({seconds: this.props.countSeconds});
		
		this.timer = setInterval(()=> {
            this.setState({seconds: this.state.seconds - 1});
            if (this.state.seconds < 1) {
				_this.setState({
					forbid: true
				});

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
						{this.state.seconds ? this.state.seconds + "秒后重新获取" : <span className="zmy" onClick={this.handlerTestClick} >获取验证码</span>}
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

