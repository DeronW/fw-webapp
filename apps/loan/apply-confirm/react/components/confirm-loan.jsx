class ConfirmLoan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            checked: true,
            orderGid: null
        }
        this.confirmHandler = this.confirmHandler.bind(this);
        this.checkHandler = this.checkHandler.bind(this);
        this.detailHandler = this.detailHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    confirmHandler() {
        if (this.state.checked == false) {
            $FW.Component.Toast("请同意借款服务协议，借款确认书和代扣服务协议");
        } else {
            let query = $FW.Format.urlQuery();
            let orderGid = query.orderGid;
            $FXH.Post(`${API_PATH}/api/loan/v1/sendSmsverifycode.json`,{
                orderGid: orderGid
            }).then(data => {
                this.props.callbackVerifyCodeShow(true);
                //this.setState({orderGid: data.orderGid});
            }, (err) => $FW.Component.Toast(err.message));
        }
    }
    checkHandler() {
        this.setState({ checked: !this.state.checked });
    }
    detailHandler() {
        this.props.callbackItemShow(true);
    }
    clickHandler() {
        this.props.callbackNoticeShow(true);
    }
    render() {
    return (
        <div>
            <div className="transfer-box">
                <div className="money-get">
                    <div className="transfer-money">{this.props.accountInAmount.toFixed(2)}</div>
                    <div className="transfer-title">到账金额(元)</div>
                </div>
                <div className="loan-info">
                    <div className="transfer-lines">
                        <div className="return-money">
                            <span className="return-money-num">{this.props.shouldRepaymentAmount.toFixed(2)}</span>
                            <span className="return-money-title">应还金额(元)</span>
                        </div>
                        <div className="return-date">
                            <span className="return-date-day">{this.props.dueTime}</span>
                            <span className="return-date-title">应还日期</span>
                        </div>
                    </div>
                    <span className="vertical-line"></span>
                </div>
            </div>
            <div className="transfer-tip">请按时还款，避免<a onClick={this.clickHandler}>逾期费用</a>。</div>
            <div className="loan-fee">
                <span className="loan-fee-num">借款费用{this.props.totalFeeAmount.toFixed(2)}元</span>
                <span className="loan-right-arrow" onClick={this.detailHandler}>详情</span>
            </div>
            <div className="agreement-issue">
                <div className={this.state.checked ? "checked-box" : "unchecked-box"}
                     onClick={this.checkHandler}></div>
                <div className="check-item">同意<a href="/static/loan/protocol-borrowing/index.html">《借款服务协议》</a>、<a
                    href="/static/loan/protocol-partner/index.html">《借款确认书》</a>，<a href="/static/loan/protocol-cost/index.html">《代扣服务协议》</a>，未按时还款将计入信用卡银行的信用报告
                </div>
            </div>
            <div className="confirm-btn" onClick={this.confirmHandler}>确定</div>
        </div>
    )
}
}
