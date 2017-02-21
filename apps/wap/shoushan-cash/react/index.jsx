function fmOpt(sessionId) {
    window._fmOpt = {
        bd: true,
        partner: 'jrgc',
        appName: 'jrgc_web',
        token: sessionId
    };

    var cimg = new Image(1, 1);

    cimg.onload = function () {
        _fmOpt.imgLoaded = true;
    };

    cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=jrgc&appName=jrgc_web&tokenId=" + _fmOpt.token;

    var fm = document.createElement('script');
    fm.type = 'text/javascript';
    fm.async = true;

    fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0);

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fm, s);
}

var numberFormat = {
    val: "",
    format: function (val) {
        this.val = val.replace(/[^\d.]/g, "").
            //只允许一个小数点
            replace(/^\./g, "").replace(/\.{2,}/g, ".").
            //只能输入小数点后两位
            replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

        return this.val;
    }
};

function isInteger(obj) {
    return Math.floor(obj) === obj
}

//设置光标位置函数
function setCursorPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

const Greater = React.createClass({
    popClickShow: function () {
        this.props.callbackCreateShow(true);
    },
    render: function () {
        return (
            <div className="modify" onClick={this.popClickShow}>
                <div className="wire"></div>
                <div className="pure">
                    <div className="xuanwu" style={{ fontSize: '32px' }}>{this.props.name ? this.props.name : '开户银行'}</div>
                    <div className="choice">
                        <div className="pleas" style={{ color: '#555555' }}>请选择</div>
                    </div>
                </div>
            </div>
        )
    }
})

const Content = React.createClass({
    getInitialState: function () {
        return {
            modifyShow: false,
            specialShow: false,
            choiceShow: false,
            selectBank: false,
            btn: false, //判断 是否大于10万或小于10万
            popShow: false,
            moneyInput: false,
            inputVal: "",
            selectBankName: this.props.data.data.bankInfo.bankBranchName,
            selectBankId: "",
            propsAccountAmountVal: this.props.data.data.accountAmount,
            propsUserInfo: this.props.data.data,
            promptShow: false,
            voice: null,
            selectCashMethod: true,
            handlerTSShow: false,
            selectWhich: this.props.data.data.bankInfo.isCompanyAgent ? 1 : 0
        }
    },
    componentDidUpdate: function (a, params) {
        if (this.state.moneyInput) {
            if (ReactDOM.findDOMNode(this.refs.refsMoney) !== null) {
                ReactDOM.findDOMNode(this.refs.refsMoney).focus();
                setCursorPosition(ReactDOM.findDOMNode(this.refs.refsMoney), this.state.inputVal.length);
            }
        }
    },
    handlerOnChange: function (e) {
        if (numberFormat.format(e.target.value)[0] === "0") {
            this.setState({ inputVal: "" });
            return false;
        }

        if (numberFormat.format(e.target.value) > this.state.propsAccountAmountVal) {
            this.setState({
                inputVal: this.state.propsAccountAmountVal,
                selectWhich: 1,
                selectCashMethod: !this.state.selectCashMethod
            });
            return false;
        }

        if (numberFormat.format(e.target.value) > this.props.data.data.criticalValue * 10000) {
            this.setState({ selectWhich: 1 });
        }

        if (this.props.data.data.bankInfo.isCompanyAgent || this.props.data.data.bankInfo.isSpecial) {
            this.setState({ selectWhich: 1 });
        }
        if (numberFormat.format(e.target.value) < this.props.data.data.criticalValue * 10000) {
            this.setState({
                inputVal: numberFormat.format(e.target.value),
                selectWhich: 0,
                selectCashMethod: !this.state.selectCashMethod
            });
            return false;
        }

        if (numberFormat.format(e.target.value) !== "") {
            this.setState({ specialShow: true, });
        } else {
            this.setState({
                specialShow: false,
                modifyShow: false
            });
        }

        this.setState({
            inputVal: numberFormat.format(e.target.value)
        });

        if (numberFormat.format(e.target.value) > this.props.data.data.criticalValue * 10000) {
            this.setState({
                modifyShow: true
            });
        } else {
            this.setState({
                modifyShow: false
            });
        }
    },
    handlerOnBlur: function () {
        if (this.state.inputVal !== "") {
            this.setState({
                choiceShow: true,
                moneyInput: true
            });
        }

    },
    handlerOnFocus: function () {
        this.setState({
            choiceShow: false
        });
    },
    handlerPleasBtn: function () {
        this.setState({
            inputVal: this.state.propsAccountAmountVal
        });

        if (this.state.propsAccountAmountVal > this.props.data.data.criticalValue * 10000) {
            this.setState({
                selectWhich: 1,
                selectCashMethod: !this.state.selectCashMethod
            });
        }

    },
    handlerPost: function () {
        var _this = this;

        if (this.state.inputVal < parseInt(this.props.data.data.minAmt)) {
            $FW.Component.Toast("提现金额不能低于10元");
            return false;
        }

        if (this.state.selectWhich == 1) {
            if (this.state.selectBankName === null) {
                $FW.Component.Toast("请选择开户支行");
                return false;
            }
        }

        if (this.state.selectWhich == 0) {
            if (this.state.inputVal > this.props.data.data.criticalValue * 10000) {

                $FW.Component.Toast("您实时提现单笔已超过" + this.props.data.data.criticalValue + "万限制，请使用大额提现！");
                return false;
            }
        }
        _this.setState({ popShow: true });
    },
    handlerSelectPopFun: function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({ selectBank: true });
    },
    handlerColseBtn: function () {
        this.setState({ popShow: false });
    },
    handlerSureBtn: function () {
        var _this = this;

        var val = this.state.inputVal;

        var bankNoVal = () => {
            if (this.state.selectWhich == 1) {
                if (_this.props.data.data.bankInfo.lianhangNo === null) {
                    return _this.state.selectBankId;
                } else {
                    return _this.props.data.data.bankInfo.lianhangNo;
                }
            } else {
                return '';
            }
        };
        window.location.href = "http://apitest.9888.cn/api/sspay/withdraw/v1/withDraw.shtml?reflectAmount=" + val + "&bankNo=" + bankNoVal() + "&withdrawTicket=" + this.props.data.data.withdrawToken;
    },
    handlerVoice: function () {
        this.setState({ voice: +new Date() })
    },
    handlerImmediatelyCashMethod: function (b) {
        if (b) {
            this.setState({
                selectWhich: 0,
                selectCashMethod: !this.state.selectCashMethod
            })
        }
    },
    handlerBlockTradeCashMethod: function (b) {
        if (b) {
            this.setState({
                selectWhich: 1,
                selectCashMethod: !this.state.selectCashMethod
            })
        }
    },
    getOpenBankShow: function (booleanVal) {
        this.setState({
            selectBank: booleanVal
        });
    },
    getSelectBankInfo: function (hide, bankInfo) {
        this.setState({
            selectBank: hide,
            selectBankName: bankInfo.bankName,
            selectBankId: bankInfo.bankNo
        });
    },
    getPromptShow: function (booleanVal) {
        this.setState({
            promptShow: booleanVal
        });
    },
    callbackOpenBankBtn: function () {
        //window.history.back();
        window.location.href = "/mpwap/orderuser/getUserInfo.shtml";
    },
    getInfoBtn: function () {
        location.href = "/static/wap/shoushan-cash-records/index.html";
    },
    handlerTS: function() {
        this.setState({
            handlerTSShow: !this.state.handlerTSShow
        });
    },
    render: function () {
        var _this = this;

        var feeVal = this.state.propsUserInfo.fee;
        var bankId = this.props.data.data.bankInfo.bankCardNo || '';
        var phone = this.props.data.data.bankInfo.phoneNo;
        var phoneVal = phone.substring(0, 3) + "****" + phone.substring(phone.length - 4, phone.length);

        var commissionCharge = function () {

            if (_this.state.propsUserInfo.isFeeEnable == true) {
                return parseFloat(feeVal) * 10 * (_this.state.inputVal * 100) / 100000;
            } else {
                return 0;
            }
        };

        var pop = function () {
            var commissionChargeVal = _this.state.inputVal - commissionCharge();
            var commissionChargeText = commissionCharge();


            return <div className="cang">
                <div className="masker"></div>
                <div className="taine">
                    <div className="his">提示</div>
                    <div className="fact">
                        <div className="">
                            <span className="acti">实际到账金额</span>
                            <span
                                className="san">¥{isInteger(parseFloat(commissionChargeVal)) ? commissionChargeVal + ".00" : commissionChargeVal.toFixed(2)}</span>
                        </div>
                        <div className="pot-a">
                            <span className="iner">提现金额</span>
                            <span className="zeor">¥{_this.state.inputVal}</span>
                        </div>
                        <div className="pot-b">
                            <span className="iner">提现手续费</span>
                            <span
                                className="zeor">¥{isInteger(parseFloat(commissionChargeText)) ? commissionChargeText + ".00" : commissionChargeText.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="ton clearfix">
                        <div className="xiaoqu" onClick={_this.handlerColseBtn}>取消</div>
                        <div className="ding" onClick={_this.handlerSureBtn}>确定</div>
                    </div>

                </div>
            </div>
        };

        var immediatelyCashMethodEml = function (b) {

            var valText = _this.props.data.data.perDayRealTimeAmountLimit;

            return <div className="info-list">
                <div className="info-select-btn">
                    <span onClick={() => _this.handlerImmediatelyCashMethod(b)} className={
                        "select-icon " + (_this.state.selectWhich == 0 || !b ? "select-icon select-btn" : "")
                    } >
                    </span>
                </div>
                <div className="info-text">
                    <div className="subhead-text"> 实时提现 </div>
                    <div className="detail-text">
                        单笔金额&le;{_this.props.data.data.criticalValue}万，
                        { _this.props.data.data.perDayRealTimeAmountLimit && "单日"+ "≥" + valText + "万，"}
                        7*24小时实时到账
                    </div>
                </div>
            </div>
        };

        var blockTradeCashMethodEml = function (b) {
            return <div className="info-list">
                <div className="info-select-btn">
                    <span
                        onClick={() => _this.handlerBlockTradeCashMethod(b)}
                        className={
                            "select-icon " + (_this.state.selectWhich == 1 || !b ? "select-icon select-btn" : "")
                        }
                    >
                    </span>
                </div>
                <div className="info-text">
                    <div className="subhead-text"> 大额提现 </div>
                    <div className="detail-text">
                        工作日9:00-16:30受理，最快30分钟之内到账。
                    </div>
                </div>
            </div>
        }


        var blockEml = function () {
            if (_this.props.data.data.bankInfo.isCompanyAgent || _this.props.data.data.bankInfo.isSpecial) {
                return blockTradeCashMethodEml(false);
            } else if (_this.props.data.data.bankInfo.bankName == undefined || _this.props.data.data.bankInfo.bankName == "") {
                return immediatelyCashMethodEml(true);
            } else {
                return <div>{immediatelyCashMethodEml(true)} {blockTradeCashMethodEml(true)}</div>
            }
        }

        return (
            <div>
                <div>
                    <TopNav title={"提现"} backBtn={false} btnFun={this.callbackOpenBankBtn}
                        btnText={"提现记录"} callbackInfoBtn={this.getInfoBtn} />

                    <div className="stou clearfix">
                        <div className="zhaoshang"><img className="ico-zhaoshang"
                            src={this.props.data.data.bankInfo.bankLogo} /></div>
                        <div className="wz">
                            <div className="zh">{this.props.data.data.bankInfo.bankName}</div>
                            <div className="nz">
                                {
                                    bankId.substring(0, 4) + "********" + bankId.substring(bankId.length - 4, bankId.length)
                                }
                            </div>
                        </div>
                        <div className="kuaijie"><img src="images/ico-kuaijie.png" /></div>
                    </div>

                    <div className="txt-a">
                        <div className="nin">如果您绑定的银行卡暂不支持手机快捷支付请联系客服<a href="tel:400-0322-988" className="c-4aa1f9">400-0322-988</a>
                        </div>
                        <div className="kx">可提现金额(元)：
                            <span style={{ fontSize: '38px', color: '#fd4d4c' }}>{this.props.data.data.accountAmount}</span></div>
                    </div>

                    <div className="select-bank-area">
                        <div className="kunag">
                            <div className="pure">
                                {
                                    !this.state.selectBank ? <div className="xuanwu">
                                        <input className="moneyTxt"
                                            value={this.state.inputVal}
                                            onChange={this.handlerOnChange}
                                            onBlur={this.handlerOnBlur}
                                            onFocus={this.handlerOnFocus}
                                            ref="refsMoney"
                                            type="text" placeholder="请输入提现金额"
                                        />
                                    </div> : ''
                                }

                                <div className="choice">
                                    <div className="pleas" onClick={this.handlerPleasBtn}>全提</div>
                                </div>
                            </div>
                        </div>

                        {
                            this.state.selectWhich == 1 || (_this.props.data.data.bankInfo.isCompanyAgent || _this.props.data.data.bankInfo.isSpecial) ?
                                <div className="modify" onClick={this.handlerSelectPopFun}>
                                    <div className="wire"></div>
                                    <div className="pure">
                                        <div className="xuanwu" style={{ fontSize: '32px' }}>
                                            {this.state.selectBankName === null ? "开户支行" : this.state.selectBankName}
                                        </div>
                                        <div className="choice">
                                            <div className="pleas" style={{ color: '#555555' }}>请选择开户支行</div>
                                        </div>
                                    </div>
                                </div> : null
                        }


                    </div>

                    {
                        this.state.promptShow ?
                            <div className="old-user-prompt-text">已向手机{phoneVal}发送短信验证码，若收不到，请 <span className="c"
                                onClick={this.handlerVoice}>点击这里</span>获取语音验证码。
                            </div> : null
                    }

                    <div className="cash-method-block">
                        <div className="title">
                            提现方式
                        </div>

                        <div className="info">
                            {blockEml()}
                        </div>
                    </div>

                    <div className="xt" onClick={this.handlerPost}>
                        下一步
                    </div>

                    <div>
                        <div className="hsuo" onClick={this.handlerTS}>温馨提示</div>

                        {
                            this.state.handlerTSShow ?  <div className="danbi" >

                                    <div className="atpr"><img className="card-d" src="images/card-d.png" /><span
                                        className="online">单笔提现金额不低于10元，提现申请成功后不可撤回；</span></div>
                                    <div className="atpr">
                                        <img className="card-d" src="images/card-d.png" />
                                        <span className="online">
                                            徽商电子账户采用原卡进出设置，为了您的资金安全，只能提现至您绑定的银行卡；
                                        </span>
                                    </div>
                                    <div className="atpr">
                                        <img className="card-d" src="images/card-d.png" />
                                        <span className="online">
                                            如遇问题请与客服联系，客服电话：<span className="c-b">400-0322-988</span>
                                        </span>
                                    </div>
                                </div> : null
                        }


                    </div>

                </div>

                {
                    this.state.selectBank && <BankAccount
                        callbackSelectBankInfo={this.getSelectBankInfo}
                        callbackOpenBank={this.getOpenBankShow}
                    />
                }
                { this.state.popShow && pop() }
            </div>
        )
    }
})


$FW.DOMReady(function () {
    $FW.Ajax({
        url: `http://apitest.9888.cn/api/sspay/withdraw/v1/getWithdrawInfo.shtml`,
        enable_loading: 'mini'
    }).then(data => {
        ReactDOM.render(<Content data={data} />, CONTENT_NODE)
        fmOpt(data.sessionId);
    })
});
