function gotoHandler(link) {
    location.href = encodeURI(link);
}

class WantLoan extends React.Component{
    constructor(props){
        super(props)
        let query = $FW.Format.urlQuery();
        let loanNum = query.loanNum;
        let creditLine = query.creditLine;
        let orioleOrderGid = query.orioleOrderGid;
        this.state = {
            loanNum: loanNum,
            creditLine: creditLine,
            orioleOrderGid: orioleOrderGid,
            orderGid: null,
            loanGid: null,
            showToZH: false,
            failMsg: '',
            loanShow:false
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.loanHandler = this.loanHandler.bind(this);
    }
    changeHandler(e) {
    let inputNum = e.target.value;
    this.setState({ loanNum: inputNum });
}
    loanHandler() {
        let query = $FW.Format.urlQuery();
        let loanNum = query.loanNum;
        let orioleOrderGid = query.orioleOrderGid;
        let lowestLoan = query.lowestLoan;
        let n = parseInt(this.state.loanNum) || 0, {creditLine} = this.state, err;


        if (n > creditLine){
            err = '不能输入大于可借额度';
            err && $FW.Component.Toast(err);
            return;
        }
        if (n % 100 != 0){
            err = '借款金额必须为100的整数倍';
            err && $FW.Component.Toast(err);
            return;
        }
        if (n < lowestLoan) {
            err = '借款金额必须大于等于' + lowestLoan;
            err && $FW.Component.Toast(err);
            return;
        }

        let format = x => Math.round(Math.max(lowestLoan, Math.min(x, creditLine)) / 100) * 100;

        //err && $FW.Component.Toast(err);
        this.setState({ loanNum: format(n) });


        let cashBank = this.props.userBankList.withdrawBankcard;

        function isRealNameBindCard(ele) {
            return ele.isRealNameBindCard == true;
        }
        let filtered = cashBank.filter(isRealNameBindCard);
        let user = $FW.Store.getUserDict();
        $FXH.Post(`${API_PATH}/api/loan/v1/apply.json`, {
                loanAmount: this.state.loanNum,
                orioleOrderGid: orioleOrderGid,
                productId: 1,
                withdrawCardGid: filtered[0] && filtered[0].cardGid
            }
        ).then((data) => {
            this.setState({ loanGid: data.loanGid, orderGid: data.orderGid });
            if (!err) {
                location.href = `/static/loan/apply-confirm/index.html?loanNum=${this.state.loanNum}&orioleOrderGid=${this.state.orioleOrderGid}&withdrawCardGid=${filtered[0].cardGid}&orderGid=${this.state.orderGid}`;
            }
        },(err) => {
            if (err.code == 24003 || err.code == 24005) return this.setState({loanShow: true, failMsg: err.message})
            $FW.Component.Toast(err.message);
        });
    }

    callbackHandler = () => {
        this.setState({loanShow:false})
    }

    render() {
        const USER = $FW.Store.getUserDict();
        let interest = this.props.baseRateDay * 100;
        let cashBank = this.props.userBankList.withdrawBankcard;

        function isRealNameBindCard(ele) {
            return ele.isRealNameBindCard == true;
        }
        let filtered = cashBank.filter(isRealNameBindCard);

        return (
            <div>
                {this.state.loanShow && <ProductDisplay callbackHandler={this.callbackHandler} errorMessage={this.state.failMsg} popTitle={"审核失败"}/>}
                <div className="loan-box">
                    <div className="loan-box-title">借款金额(元)</div>
                    <input className="loan-num" type="number" name="number" value={this.state.loanNum} onChange={this.changeHandler} />
                    <div className="horizonal-line"></div>
                    <div className="loan-charge"><img className="icon" src="images/icon.png" />日综合费率<span>{this.props.baseRateDayStr}</span>，期限<span>{this.props.productPeriod}天</span></div>
                </div>
                <div className="withdraw-card">
                    <span className="withdraw-card-title">提现卡</span>
                    <span className="withdraw-card-branch">{filtered[0] && filtered[0].bankShortName}({filtered[0] && filtered[0].cardNo.slice(-4)})</span>
                </div>
                {/*<div className="withdraw-tip">审核通过之后，若在24小时之内未确认用钱，视为自动放弃。</div>*/}
                <div className="loan-btn-wrap">
                    <div className="loan-btn" onClick={this.loanHandler}>立即借款</div>
                </div>
                { this.state.showToZH &&
                    <div className="mask">
                        <div className="pop">
                            <span className="tip-1">审核失败</span>
                            <span className="tip-2">{this.state.failMsg}</span>
                            <Nav className="to-zhangzhong" href={`/static/loan/home/index.html`}>尝试其他借款</Nav>
                            <img className="close-icon" src="images/close-icon.jpg" onClick={() => {this.setState({showToZH: false})}}></img>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

$FW.DOMReady(function () {
    NativeBridge.setTitle('我要借款');
    ReactDOM.render(<Header title={"我要借款"} />, HEADER_NODE);
    let query = $FW.Format.urlQuery();
    let orioleOrderGid = query.orioleOrderGid;
    let loanNum = query.loanNum;
    let user = $FW.Store.getUserDict();
    Promise.all([
        $FXH.Post(`${API_PATH}/api/loan/v1/baseinfo.json`,{productId:1}),
        $FXH.Post(`${API_PATH}/api/bankcard/v1/bankcardlist.json`)
    ]).then(d => {
        ReactDOM.render(<WantLoan {...d[0]} {...d[1]} />, CONTENT_NODE);
    });

});
