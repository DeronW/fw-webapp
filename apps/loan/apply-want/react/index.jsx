function gotoHandler(link) {
    location.href = encodeURI(link);
}

const WantLoan = React.createClass({
    getInitialState:function(){
        let query = $FW.Format.urlQuery();
        let loanNum = query.loanNum;
        let creditLine = query.creditLine;
        let orioleOrderGid = query.orioleOrderGid;
        return {
           loanNum:loanNum,
           creditLine:creditLine,
           orioleOrderGid:orioleOrderGid
        }
    },
    changeHandler:function(e){
        let inputNum = e.target.value;
        this.setState({loanNum:inputNum});
    },
    loanHandler:function(){
        let n = parseInt(this.state.loanNum) || 0, {creditLine} = this.state, err;


        if(n > creditLine) err = '不能输入大于可借额度';
        if(n % 100 != 0) err = '借款金额必须为100的整数倍';
        if(n < 500) err = '借款金额必须大于等于500';

        let format = x => Math.round(Math.max(500, Math.min(x, creditLine)) / 100) * 100;

        err &&  $FW.Component.Toast(err);
        this.setState({loanNum:format(n)});


        let cashBank = this.props.userBankList.withdrawBankcard;

        function isRealNameBindCard(ele){
            return ele.isRealNameBindCard == true;
        }
        let filtered = cashBank.filter(isRealNameBindCard);

        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/apply.json`,
            method: "post",
            data: {
                token:$FW.Store.getUserToken(),
                userGid:$FW.Store.getUserGid(),
                userId:$FW.Store.getUserId(),
                sourceType:3,
                orioleOrderGid:orioleOrderGid,
                loanAmount:loanNum
            }
        }).then(d => {
            if(!err){
                location.href = `/static/loan/apply-confirm/index.html?loanNum=${this.state.loanNum}&orioleOrderGid=${this.state.orioleOrderGid}&withdrawCardGid=${filtered[0].cardGid}`;
            }
        }, (error) => console.log(error));

    },
    render:function(){
        let interest = this.props.baseRateDay * 100;
        let cashBank = this.props.userBankList.withdrawBankcard;

        function isRealNameBindCard(ele){
            return ele.isRealNameBindCard == true;
        }
        let filtered = cashBank.filter(isRealNameBindCard);

        return (
            <div>
                <div className="loan-box">
                    <div className="loan-box-title">借款金额（元）</div>
                    <input className="loan-num" type="number" name="number" value={this.state.loanNum} onChange={this.changeHandler}/>
                    <div className="horizonal-line">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <div className="loan-charge"><img className="icon" src="images/icon.png"/>日综合费率<span>{this.props.baseRateDayStr}</span>，期限<span>{this.props.period}天</span></div>
                </div>
                <div className="withdraw-card">
                    <span className="withdraw-card-title">提现卡</span>
                    <span className="withdraw-card-branch">{filtered[0].bankShortName}（{filtered[0].cardNo.slice(-4)}）</span>
                </div>
                <div className="loan-btn" onClick={this.loanHandler}>立即借款</div>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"我要借款"}/>, document.getElementById('header'));
    let query = $FW.Format.urlQuery();
    let orioleOrderGid= query.orioleOrderGid;
    let loanNum = query.loanNum;
    Promise.all([
        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/tryLoanBudget.json`,
            method: "post",
            data: {
                token:$FW.Store.getUserToken(),
                userGid:$FW.Store.getUserGid(),
                userId:$FW.Store.getUserId(),
                sourceType:3,
                orioleOrderGid:orioleOrderGid,
                loanAmount:loanNum
            }
        }),
        $FW.Ajax({
            url: `${API_PATH}api/bankcard/v1/bankcardlist.json`,
            method: "post",
            data: {token:$FW.Store.getUserToken(), userGid:$FW.Store.getUserGid(),userId:$FW.Store.getUserId(), sourceType:3}
        })
    ]).then(d => {
        console.log(d);
        ReactDOM.render(<WantLoan {...d[0]} {...d[1]}/>, document.getElementById('cnt'));
    }, (error) => console.log(error));

});
