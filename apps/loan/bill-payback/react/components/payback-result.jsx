class PayBackResult extends React.Component{
    constructor(props){
        super(props)
        this.state={
            payback_status: null,
            fail_reason:null,
            repaymentGid: this.props.repaymentGid,
            repaymentAmount: null,
            loanLeftAmount: null,
            activityRecomUrl:""
        }
        this.queryResult = this.queryResult.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    this.setState({
        repaymentGid: nextProps.repaymentGid
    }, this.queryResult);
}
    componentDidMount() {
        if (this.state.repaymentGid) this.queryResult()
    }
    queryResult() {
        $FXH.Post(`${API_PATH}/api/repayment/v1/repaymentstatus.json`, {
            repaymentGid: this.state.repaymentGid
        }).then((data) => {
            this.setState({
                payback_status: data.status,
                fail_reason: data.failReason,
                activityRecomUrl:data. activityRecomUrl,
                repaymentAmount: data.repaymentAmount,
                loanLeftAmount: data.loanLeftAmount
            });
            if(this.state.payback_status == 1){
                // if(this.state.activityRecomUrl){
                //     setTimeout(() => {
                //         $FW.Browser.inApp()? NativeBridge.goto(`https://m.easyloan888.com/${this.state.activityRecomUrl}`,false,"放心花"):
                //         location.href  = `${this.state.activityRecomUrl}`;
                //     }, 2000)

                // }
                    setTimeout(() => {
                        $FW.Browser.inApp()? NativeBridge.goto(`https://m.easyloan888.com/static/loan/features/index.html#/invite-activity`,false,"放心花"):
                        location.href  = `/static/loan/features/index.html#/invite-activity`;
                    }, 2000)
            }
        }, e => $FW.Component.Toast(e.message));
    }
    render() {
    let {payback_status,activityRecomUrl} = this.state;

    if (payback_status === null) return null;

    return (
        <div className="payback-result">
            {payback_status == 1 &&
            <div className="payback-result-success-img">
                <img src="images/payback-success.png" />
            </div>}
            {payback_status >= 2 &&
            <div className="payback-result-fail-img">
                <img src="images/payback-fail.png" />
            </div>}
            {payback_status == 0 &&
            <div className="payback-result-ing-img">
                <img src="images/payback-ing.png" />
            </div>}
            {payback_status == 1 &&
            <div className="payback-result-success-tip">
                { this.state.loanLeftAmount == 0 ?
                <div className="tip-top">欢迎再次使用！</div>
                : <div className="tip-top">还有{this.state.loanLeftAmount}元未还，请记得准时还款！</div>
                }
                <div className="tip-bottom"> 还款金额：<span>{this.state.repaymentAmount}</span>元</div>
                <a className="credit-btn" href={`/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`}>
                    提升额度</a>
                <div className="apply-btn" onClick={() => gotoHandler(`/static/loan/fxh/index.html`)}>申请用钱</div>
            </div> }
            {payback_status >= 2 &&
            <div>
                <div className="payback-result-fail-tip">{this.state.fail_reason}</div>
                <div className="payback-customer-service"><img src="images/phone.png" />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
            </div>
            }
            {payback_status == 0 &&
            <div>
                <div className="payback-result-ing-tip">稍后可到账单页面<br />查看具体还款结果。</div>
                <div className="payback-customer-service"><img src="images/phone.png" />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
            </div>
            }

        </div>
    )
}
}
