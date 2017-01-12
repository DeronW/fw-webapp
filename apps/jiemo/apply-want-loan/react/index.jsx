const WantLoan = React.createClass({
    getInitialState:function(){
        var query = $FW.Format.urlQuery();
        var loanNum = query.loanNum;
        var creditLine = query.creditLine;
        return {
           loanNum:loanNum
        }
    },
    changeHandler:function(e){
        var inputNum = e.target.value;
        this.setState({loanNum:inputNum});
    },
    render:function(){
        var interest = this.props.data.baseRateDay * 100;
        return (
            <div>
                <div className="loan-box">
                    <div className="loan-box-title">借款金额（元）</div>
                    <input className="loan-num" type="text" value={this.state.loanNum} onChange={this.changeHandler}/>
                    <div className="horizonal-line">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <div className="loan-charge"><img className="icon" src="images/icon.png"/>日综合费率<span>{interest}%</span>，期限<span>{this.props.data.period}天</span></div>
                </div>
                <div className="withdraw-card">
                    <span className="withdraw-card-title">提现卡</span>
                    <span className="withdraw-card-branch">工商银行（1232）</span>
                </div>
                <div className="loan-btn">立即借款</div>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"我要借款"}/>, document.getElementById('header'));
    var query = $FW.Format.urlQuery();
    var orioleOrderGid= query.orioleOrderGid;
    var loanNum = query.loanNum;
    $FW.Ajax({
        url: `${API_PATH}api/loan/v1/tryLoanBudget.json`,
        method: "post",
        data: {token:localStorage.userToken, userGid:localStorage.userGid,userId:localStorage.userId, sourceType:3, orioleOrderGid:orioleOrderGid, loanAmount:loanNum}
    }).then((data) => {
        console.log(data)
        ReactDOM.render(<WantLoan data={data}/>, document.getElementById('cnt'));
    }, (error) => console.log(error));
});
