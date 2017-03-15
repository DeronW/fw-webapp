function isMobilePhone(phone) {
    return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}

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
            loading: false,
            canVerify: ''
        }
    },
    componentDidUpdate() {
        this.refs.cardNumberInput.setSelectionRange(99, 99)
    },
    changeBankNum(e) {
        let input = e.target, v = input.value;
        // 把银行卡号, 每隔4个数字添加一个空格
        v = v.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
        if (v.length < 19 + 5)
            this.setState({ bankNum: v });
    },
    blurBankNum(e) {
        let { bankNum } = this.state, len = space(this.state.bankNum).length;
        if (len < 16 || len > 19) return $FW.Component.Toast("储蓄卡格式不对");

        $FW.Post(`${API_PATH}api/bankcard/v1/cardinfo.json`, {
            bankCardNo: space(bankNum),
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            sourceType: SOURCE_TYPE
        }).then(data => {
            let ci = data.cardInfo;
            this.setState({
                cardinfoBankName: ci.bankName,
                cardinfoLogoUrl: ci.logoUrl,
                cardType: ci.cardType,
                canVerify: ci.canVerify,
                bankName: ci.bankName
            });
        })
    },
    changePhone(e) {
        let v = e.target.value;
        verificationNum(v) && v.length <= 11 && this.setState({ phone: space(v) });
    },
    handlerClause() {
        this.setState({
            selectClause: !this.state.selectClause
        });
    },
    handlerNext() {
        let err, { bankNum, phone, selectClause, cardType, canVerify } = this.state;

        if (bankNum == '') err = "储蓄卡不能为空";
        if (space(bankNum).length > 19 || space(bankNum).length < 16) err = "储蓄卡格式不对";
        if (phone == '') err = "手机号不能为空";
        if (!isMobilePhone(phone)) err = "手机号格式不对";
        if (!selectClause) err = "请勾选代扣服务协议";
        if (cardType == 1) err = "请绑定借记卡";
        if (canVerify == 0) err = "不支持绑定此类卡";

        err ?
            $FW.Component.Toast(err) :
            $FW.Post(`${API_PATH}api/bankcard/v1/commitinfo.json`, {
                bankName: this.state.bankName,
                cardNo: space(bankNum),
                cardType: cardType,
                mobile: phone,
                operatorType: USER.status < 2 ? 1 : 2,
                token: USER.token,
                userGid: USER.gid,
                userId: USER.id,
                sourceType: SOURCE_TYPE
            }).then(data => {
                let gid = data.bindBankInfo.operatorBankcardGid;
                window.location.href = `/static/loan/user-verify-phone/index.html?operatorBankcardGid=${gid}&phone=${phone}`;
            }, e => $FW.Component.Toast(e.message));
    },
    render() {

        let { phone, bankNum, cardinfoBankName } = this.state;

        return (
            <div className="set-cash-card-cnt">
                <div className="ui-froms">
                    <div className="list prompt-list">
                        <span className="text">储蓄卡号</span>
                        <div className="input">
                            <input onChange={this.changeBankNum} ref="cardNumberInput"
                                onBlur={this.blurBankNum}
                                value={bankNum} type="text" placeholder="输入储蓄卡号" />
                        </div>

                        <div className="list-bank-li">
                            <a className="prompt-text" href='/static/loan/user-bank-support/index.html'>
                                支持银行
								<img src="images/prompt-icon.png" />
                            </a>
                            {cardinfoBankName != '' &&
                                <span className="bank">{cardinfoBankName}</span>}
                        </div>
                    </div>
                </div>

                <div className="ui-froms">
                    <div className="list">
                        <span className="text">手机号</span>
                        <div className="input">
                            <input onChange={this.changePhone} value={phone}
                                type="number" placeholder="银行卡预留手机号" />
                        </div>
                    </div>
                </div>

                <div className="clause">
                    <span className={"icon " + (this.state.selectClause ? "select-icon" : "icon")} onClick={this.handlerClause}></span>
                    <span className="text">
                        同意
						<a href='/static/loan/protocol-cost/index.html'>《代扣服务协议》</a>
                    </span>
                </div>

                <div className="next-btn">
                    <div onClick={this.handlerNext} className="ui-btn">下一步</div>
                </div>
            </div>
        )
    }
});

const USER = $FW.Store.getUserDict();

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"添加储蓄卡"} />, HEADER_NODE);
    ReactDOM.render(<SetCashCard />, CONTENT_NODE)
})
