
const ConfirmLoan = React.createClass({
    getInitialState: function () {
        return {
            checked: false,
            orderGid: null
        }
    },
    confirmHandler: function () {
        if (this.state.checked == false) {
            $FW.Component.Toast("请同意借款服务协议和借款确认书");
        } else {
            let query = $FW.Format.urlQuery();
            let orderGid = query.orderGid;
            $FW.Post(`${API_PATH}api/loan/v1/sendSmsverifycode.json`,{
                    token: USER.token,
                    userGid: USER.gid,
                    userId: USER.id,
                    sourceType: SOURCE_TYPE,
                    orderGid: orderGid
            }).then(data => {
                this.props.callbackVerifyCodeShow(true);
                //this.setState({orderGid: data.orderGid});
            }, (err) => $FW.Component.Toast(err.message));
        }
    },
    checkHandler: function () {
        this.setState({ checked: !this.state.checked });
    },
    detailHandler: function () {
        this.props.callbackItemShow(true);
    },
    clickHandler: function () {
        this.props.callbackNoticeShow(true);
    },
    render: function () {
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
                        href="/static/loan/protocol-partner/index.html">《借款确认书》</a>，未按时还款将计入信用卡银行的信用报告
                    </div>
                </div>
                <div className="confirm-btn" onClick={this.confirmHandler}>确定</div>
            </div>
        )
    }
});
