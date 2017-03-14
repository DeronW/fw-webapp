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
        let v = e.target.value;
        v = v.replace(/[0-9a-z]/gi, '');
        v.length < 21 && this.setState({ name: $FW.Format.trim(v) });
    },
    changeIdHandler(e) {
        let v = e.target.value;
        v = v.replace(/[a-w|y|z]/gi, '');
        v.length <= 18 && this.setState({ id: v });
    },
    changeBankNum(e) {
        let v = e.target.value;
        v.length < 19 + 5 && this.setState({ bankNum: numberFormat.format(v) });
    },
    blurBankNum(e) {

        let {bankNum} = this.state, len = space(this.state.bankNum).length;
        if (len < 16 || len > 19) return $FW.Component.Toast("储蓄卡格式不对");

        $FW.Post(`${API_PATH}api/bankcard/v1/cardinfo.json`, {
            bankCardNo: space(this.state.bankNum),
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            sourceType: SOURCE_TYPE
        }).then(data => {
            let ci = data.cardInfo;
            if (ci.cardType == -1) $FW.Component.Toast('不支持该银行卡号');

            this.setState({
                cardinfoBankName: ci.bankName,
                cardinfoLogoUrl: ci.logoUrl,
                cardType: ci.cardType,
                canVerify: ci.canVerify,
                bankName: ci.bankName
            });
        }, e => $FW.Component.Toast(e.message))
    },
    changePhone(e) {
        let val = e.target.value;
        verificationNum(val) &&
            val.length <= 11 &&
            this.setState({ phone: space(val) });
    },
    handlerClause() {
        this.setState({ selectClause: !this.state.selectClause });
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
        let err, {name, id, bankName, bankNum, phone, selectClause, cardType, canVerify} = this.state;

        if (name == '') err = "姓名不能为空";
        if (name.length > 20) err = "姓名不能超过20个字符";
        if (id == '') err = "身份证不能为空";
        if (!isCardNo(id)) err = "身份证格式不对";
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
                bankName: bankName,
                cardHolderName: name,
                cardNo: space(bankNum),
                cardType: cardType,
                idCard: id,
                mobile: phone,
                operatorType: USER.status < 2 ? 1 : 2,
                token: USER.token,
                userGid: USER.gid,
                userId: USER.id,
                sourceType: SOURCE_TYPE
            }).then((data) => {
                let oGid = data.bindBankInfo.operatorBankcardGid;
                alert(USER.status)
                window.location.href = `/static/loan/user-verify-phone/index.html?phone=${phone}&operatorBankcardGid=${oGid}`;
            }, e => $FW.Component.Toast(e.message));
    },
    render() {

        let {withholdServerPop, cardinfoBankName, selectClause} = this.state;

        return (
            <div className="set-cash-card-cnt">
                {withholdServerPop &&
                    <WithholdServer getWithholdServerPop={this.callbackWithholdServerPop} />}
                <div className="ui-froms">
                    <div className="list">
                        <span className="text">姓名</span>
                        <div className="input">
                            <input onChange={this.changeName} value={this.state.name}
                                type="text" placeholder="请输入姓名" />
                        </div>
                    </div>
                    <div className="list">
                        <span className="text">身份证号</span>
                        <div className="input">
                            <input onChange={this.changeIdHandler} value={this.state.id}
                                type="text" placeholder="请输入身份证号码" />
                        </div>
                    </div>
                </div>

                <div className="ui-froms">
                    <div className="list prompt-list">
                        <span className="text">储蓄卡号</span>
                        <div className="input">
                            <input onChange={this.changeBankNum} onBlur={this.blurBankNum}
                                value={this.state.bankNum} type="text" placeholder="输入储蓄卡号" />
                        </div>

                        <div className="list-bank-li">
                            <a className="prompt-text" href="/static/loan/user-bank-support/index.html">
                                支持银行
								<img src="images/prompt-icon.png" />
                            </a>
                            {cardinfoBankName != '' && <span className="bank"> {cardinfoBankName}</span>}
                        </div>
                    </div>
                </div>

                <div className="ui-froms">
                    <div className="list">
                        <span className="text">手机号</span>
                        <div className="input">
                            <input onChange={this.changePhone} value={this.state.phone}
                                type="number" placeholder="银行卡预留手机号" />
                        </div>
                    </div>
                </div>

                <div className="clause">
                    <span className={`icon ${selectClause ? "select-icon" : "icon"}`}
                        onClick={this.handlerClause}></span>
                    <span className="text">
                        同意
						<a href={`/static/loan/protocol-cost/index.html`}>《代扣服务协议》</a>
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
    ReactDOM.render(<Header title={"设置提现卡"} />, HEADER_NODE);
    ReactDOM.render(<SetCashCard />, CONTENT_NODE)
})
