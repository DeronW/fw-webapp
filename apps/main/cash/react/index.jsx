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


const Withdrawals = React.createClass({
	getInitialState: function() {
	    return {
	    	entry : false,
			bankList: [],
	    	jump: false,
	    	less_than: false,
	    	greater_than: false,
	    	inputText: null,
	    	verify_code: null,
	    	alter: false,
	    	enable :this.props.data.isFeeEnable,
            order_state: null,  // 有3种,  处理中, 成功, 失败,
			popShow: false,
			inputBlur: false,
			bankAccountId: "",
			code: null,
			inputVal: "",
			selectBankShow: false,
			createShow: false,
			cashInputShow: false
	    }
	},
	componentDidUpdate: function() {
		if(ReactDOM.findDOMNode(this.refs.withdrawalInput) !== null) {
			ReactDOM.findDOMNode(this.refs.withdrawalInput).focus();
		}
	},
	handleJump: function(){
		this.setState({
			jump: true
		})
	},

	handlerChange: function(e){
	/*	if(e.target.value > this.props.data.accountAmount) {
			$FW.Component.Toast("输入的金额大于可提现的金额");
			return false;
		}*/


		if(e.target.value >= 100000) {
			this.setState({
				inputBlur: true
			});
		}


		if(e.target.value === "0" ) {
			$FW.Component.Toast("第一位不能为0");
			this.setState({
				inputText: ""
			});
			return false;
		} else {
			this.setState({
				inputText: numberFormat.format(e.target.value)
			});
			this.setState({alter: true})

			this.setState({
				inputVal: numberFormat.format(e.target.value),
			});
		}

		if(e.target.value === "") {
			this.setState({
				inputBlur: false
			});
		}

	},
		
	textInput: function(){
		var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
		if(isNum.test(this.state.inputText)){
			if(this.state.inputText.length>=this.props.data.criticalValue){
				this.setState({greater_than: true});
				this.setState({less_than: false})
			}else if(this.state.inputText.length<=this.props.data.minAmt){
				this.setState({less_than: true});
				this.setState({greater_than: false});
			}
		}
	},
	
	submitHandle: function(){
		console.log("submitHandle");

		if(this.props.data.accountAmount === 0) {
			$FW.Component.Toast("可提现金额0元");
			return false;
		}

		if(this.state.inputText < 10) {
			$FW.Component.Toast("提现金额必须大于10元");
			return false;
		}

		var _this = this;
		if(!_this.state.inputText ){
			$FW.Component.Alert("请输入提现金额")
		}else if(!_this.state.code){
			$FW.Component.Alert("请输入验证码")
		}else{
			this.setState({
				popShow: true
			});
		}
	},
	
	getBankIndex: function (data) {
		console.log(data.bankName)
        this.setState({
            bankName: data.bankName,
            bankId: data.bankNo,
            jump: false,
			bankAccountId: data.bankNo
        });
    },
	
	sureHandle: function(){
		if(this.props.data.accountAmount=== 0) {
			return false;
		}

		this.setState({enable: false});

		var inputVal = this.state.inputText;
		var code = this.state.code;

		window.location.href =  API_PATH +"mpwap/api/v1/withDraw.shtml?reflectAmount=" + inputVal + "&validateCode=" + code + "&bankNo=" + this.state.bankAccountId;

		/*$FW.Ajax({
			url: API_PATH +"mpwap/api/v1/withDraw.shtml?reflectAmount=" + inputVal + "&validateCode=" + code + "&bankNo=" + this.state.bankAccountId,
			success: function(data) {
				location.href =  API_PATH +"mpwap/api/v1/withDraw.shtml?reflectAmount=" + inputVal + "&validateCode=" + code + "&bankNo=" + this.state.bankAccountId;
				console.log(API_PATH +"mpwap/api/v1/withDraw.shtml?reflectAmount=" + inputVal + "&validateCode=" + code + "&bankNo=" + this.state.bankAccountId);
			}

		})*/
	},
	
    orderConfirm: function () {
        this.setState({order_state: 'processing'})
    },
    checkRechargeResult: function () {
        this.setState({order_state: 'success'})
    },
    inspectResult: function () {
        this.setState({order_state: 'fail'})
    },
	inputBlur: function() {
		if(this.state.inputText > 10000) {
			this.setState({
				inputBlur: true,
				cashInputShow: true
			});
		}

	},
	colseBtn: function() {
		this.setState({
			popShow: false
		});

	},
	modifyBtn: function() {
		this.setState({
			inputBlur: false,
			selectBankShow: false,
			cashInputShow: false,
			inputVal: ''
		});
	},
	getCallbackCode: function(val) {
		this.setState({
			code: val
		});
	},
	getCreateShow: function(booleanVal) {
		this.setState({
			createShow: booleanVal
		});
	},
	render : function(){
		var _this = this;
		var fee = this.props.data.fee;

		var commissionCharge = ((fee.slice(0, fee.length - 1) * 10) * (this.state.inputText * 100)) / 100000;

		var pop = function() {
			return <div className="cang">
					<div className="masker"></div>
					<div className="taine">
						<div className="his">提示</div>
						<div className="fact">
							<div className="">
								<span className="acti">实际到账金额</span>
								<span className="san">{_this.state.inputText - commissionCharge}</span>
							</div>
							<div className="pot-a">
								<span className="iner">提现金额</span>
								<span className="zeor">{_this.state.inputText}</span>
							</div>
							<div className="pot-b">
								<span className="iner">提现手续费</span>
								<span className="zeor">{commissionCharge}</span>
							</div>
						</div>

						<div className="ton clearfix">
							<div className="xiaoqu" onClick={_this.colseBtn}>取消</div>
							<div className="ding" onClick={_this.sureHandle} >确定</div>
						</div>

					</div>
				</div>
		};

		return (
			<div>
				{
					this.state.popShow ? pop() : null
				}

				{this.state.order_state == 'processing' ?
                    <Withdrawals.OrderProcessing remain={6} checkRechargeResult={this.checkRechargeResult}
                                              inspectResult={this.inspectResult}/> : null}
                {this.state.order_state == 'success' ? <Withdrawals.OrderSuccess /> : null}
                {this.state.order_state == 'fail' ? <Withdrawals.OrderFail /> : null}
				
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
								this.state.cashInputShow ? <div className="">{this.state.inputText}</div> : <input
										value={this.state.inputText}
										onInput={this.textInput}
										ref="withdrawalInput"
										onChange={this.handlerChange}
										onBlur={this.inputBlur}
										className="moneyTxt" type="text" placeholder="请输入提现金额"
								    />
							}

						</div>
						{this.state.alter ? <div className="choice"><div className="pleas" onClick={this.modifyBtn}>修改</div></div> : null}
					</div>
				</div>
				
				{this.state.inputBlur? <Greater
					name={this.state.bankName}
					opt={this.props.opt}
					callbackCreateShow={this.getCreateShow}
					handleJump={this.handleJump} /> : null}
				
				{this.state.greater_than ? <Neg accountAmout={this.props.data.accountAmount} /> : null}
				{this.state.inputVal !== "" ? <Special accountAmout={this.props.data.accountAmount}  callbackCode={this.getCallbackCode}/> : null}
				
				{this.state.createShow ? <Withdrawals.BankAccount
					
					onClear={this.state.handleClear}
					onFocus={this.focusHandler}
					entry={this.state.entry}
					onInput={this.inputHandler}
					value={this.state.value}
					callbackSlectBank={this.getCreateShow}
					callbackBankIndex={this.getBankIndex}
					
					/> : null}
				
				<div className="xt" onClick={this.submitHandle} >提现</div>
				
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
				
			</div>
		)
	}
})

Withdrawals.BankAccount = React.createClass({
	getInitialState: function () {
        return {
        	typing: false,
            entry: false,
            fruit: false,
            bankList: [],
            value: '',
            bankIndex: null,
            jump: false
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
		this.props.callbackSlectBank(false);

        this.props.callbackBankIndex(this.state.bankList[index]);
    },
	
	render : function(){
		
		let list = ()=> {
			var li = (d, index) => <li key={index} onClick={this.bankHandler.bind(this, index)} >{d.bankName} <img src="images/card-c.png"/></li>;
			
			return <ul className="list">{this.state.bankList.map(li)}</ul>;
		};
		
		let icon = <img className="suo" src="images/search.png"/>;
		if(this.state.typing) icon = null;
		
		return (
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
								   onChange={this.changeHandler} placeholder="请输入手机验证码"/></div>
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
			seconds:0
		}
	},
	
	handlerTestClick: function(){
		if(this.props.accountAmout === 0) {
			$FW.Component.Toast("可提现金额0元");
			return false;
		}

		if(this.state.seconds !=0) return;
		
		this.setState({seconds: this.props.countSeconds});
		
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
	inputCodeOnChange: function(e) {
		//e.target.value
		//console.log(e.target.value);
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
					<div className="miaoh">
						{this.state.seconds ? this.state.seconds + "秒后重新获取" : <span className="zmy" onClick={this.handlerTestClick} >获取验证码</span>}
					</div>
				</div>
			</div>
		)
	}
})




Withdrawals.OrderSuccess = React.createClass({
    render: function () {
        return (
            <div className="order-success">
                <img src="images/order-success.png"/>
                <div className="success-btn">
                    <a className="continue-charge">继续充值</a>
                    <a className="continue-invest">去投资</a>
                </div>
            </div>
        )
    }
});

Withdrawals.OrderFail = React.createClass({
    render: function () {
        return (
            <div className="order-fail">
                <img src="images/order-fail.png"/>
                <div className="fail-tip">银行预留手机号错误</div>
                <a className="fail-continue-charge">继续充值</a>
            </div>
        )
    }
});

Withdrawals.OrderProcessing = React.createClass({
    getDefaultProps: function () {
        return {
            remain: 5
        }
    },
    getInitialState: function () {
        return {
            remain: this.props.remain
        }
    },
    componentDidMount: function () {
        this.tick()
    },
    tick: function () {
        if (this.state.remain < 1) {
            this.props.checkRechargeResult()
        } else {
            this.countdown();
            setTimeout(this.tick, 1000);
        }
    },
    countdown: function () {
        this.setState({remain: this.state.remain - 1})
    },
    render: function () {
        return (
            <div className="order-processing">
                <img src="images/order-processing.png"/>
                <div className="text">
                    {this.state.remain}s 后为您呈现投标结果
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"提现"} />, document.getElementById('header'));
	$FW.Ajax({
        url: API_PATH +"mpwap/api/v1/getWithdrawInfo.shtml",
		enable_loading: true,
        success: function (data) {
            ReactDOM.render(<Withdrawals data={data}/>, document.getElementById("cnt"))
        }
    })
});

