function gotoHandler(link) {
    location.href = encodeURI(link);
}

function isMobilePhone(phone) {
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
            canVerify: ''
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

        if (!space(this.state.bankNum).length > 19 || !space(this.state.bankNum).length < 16) {
            $FW.Ajax({
                url: `${API_PATH}api/bankcard/v1/cardinfo.json`,
                method: "POST",
                enable_loading: "mini",
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
                    canVerify: data.cardInfo.canVerify,
                    bankName: data.cardInfo.bankName

                });
            }, (error) => {

            })
        } else {
            $FW.Component.Toast("储蓄卡格式不对");
        }
    },
    changePhone(e) {
        let val = e.target.value;

        if (verificationNum(val)) {
            if (val.length <= 11) {
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
        if (this.state.name == '') {
            $FW.Component.Toast("姓名不能为空");
        } else if (this.state.name.length > 20) {
            $FW.Component.Toast("姓名不能超过20个字符");
        } else if (this.state.id == '') {
            $FW.Component.Toast("身份证不能为空");
        } else if (!isCardNo(this.state.id)) {
            $FW.Component.Toast("身份证格式不对");
        } else if (this.state.bankNum == '') {
            $FW.Component.Toast("储蓄卡不能为空");
        } else if (space(this.state.bankNum).length > 19 || space(this.state.bankNum).length < 16) {
            $FW.Component.Toast("储蓄卡格式不对");
        } else if (this.state.phone == '') {
            $FW.Component.Toast("手机号不能为空");
        } else if (!isMobilePhone(this.state.phone)) {
            $FW.Component.Toast("手机号格式不对");
        } else if (!this.state.selectClause) {
            $FW.Component.Toast("请勾选代扣服务协议");
        } else if (this.state.cardType == 1) {
            $FW.Component.Toast("请绑定借记卡");
        } else if (this.state.canVerify == 0) {
            $FW.Component.Toast("该银行卡暂不支持绑定");
        } else {
            $FW.Ajax({
                url: `${API_PATH}api/bankcard/v1/commitinfo.json`,
                method: 'POST',
                enable_loading: "mini",
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

                window.location.href = `/static/loan/user-verify-phone/index.html?bankCardGid=${bankCardGid}&operatorBankcardGid=${operatorBankcardGid}`;
            });
        }
    },
    render() {

        return (
            <div className="set-cash-card-cnt">
                {
                    this.state.withholdServerPop &&
                    <WithholdServer getWithholdServerPop={this.callbackWithholdServerPop} />
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
                                    <span className="bank">{/*<img className="logo-icon" src={this.state.cardinfoLogoUrl} />*/}{this.state.cardinfoBankName}</span> : null
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


$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"设置提现卡"} />, HEADER_NODE);
    ReactDOM.render(<SetCashCard />, CONTENT_NODE)
})
