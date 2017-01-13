function gotoHandler(link) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }else {
        location.href = encodeURI(link);
    }
}

const ConfirmLoanWrap = React.createClass({
    getInitialState:function(){
        return {
            itemShow:false,
            verifyCodeShow:false
        }
    },
    itemShow:function(val){
        this.setState({itemShow:val});
    },
    itemDetailHide:function(val){
        this.setState({itemShow:val});
    },
    getVerifyCodeShow:function(val){
        this.setState({verifyCodeShow:val});
    },
    closeHandler:function(booleanVal){
        this.setState({verifyCodeShow:booleanVal});
    },
    render:function(){
        return (
            <div>
                <ConfirmLoan callbackItemShow={this.itemShow} callbackVerifyCodeShow={this.getVerifyCodeShow} accountInAmount
                ={this.props.accountInAmount} shouldRepaymentAmount={this.props.shouldRepaymentAmount} dueTime={this.props.dueTimeStr}  totalFeeAmount={this.props.totalFeeAmount}/>
                {this.state.itemShow?<ItemDetail callbackItemDetailHide={this.itemDetailHide} feeExtList={this.props.feeExtList}/>:null}
                {this.state.verifyCodeShow?<VerifyCode callbackCloseHanler={this.closeHandler}/>:null}
            </div>
        )
    },
});

const ConfirmLoan = React.createClass({
    getInitialState:function(){
        return {
            checked:false
        }
    },
    confirmHandler:function(){
        if(this.state.checked == false){
            $FW.Component.Toast("请同意芥末借款服务协议和芥末借款协议");
        }else{
            this.props.callbackVerifyCodeShow(true);
        }
    },
    checkHandler:function(){
        this.setState({checked:!this.state.checked});
    },
    detailHandler:function(){
        this.props.callbackItemShow(true);
    },
    render:function(){
        return (
            <div>
                <div className="transfer-box">
                    <div className="transfer-title">到账金额（元）</div>
                    <div className="transfer-money">{this.props.accountInAmount}</div>
                    <div className="loan-info">
                        <div className="transfer-lines">
                            <div className="return-money">
                                <span className="return-money-title">应还金额（元）</span>
                                <span className="return-money-num">{this.props.shouldRepaymentAmount}</span>
                            </div>
                            <div className="return-date">
                                <span className="return-date-title">应还日期</span>
                                <span className="return-date-day">{this.props.dueTime}</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>
                </div>
                <div className="transfer-tip">请按时还款，避免<a href="">逾期费用</a>。</div>
                <div className="loan-fee">
                    <span className="loan-fee-num">借款费用{this.props.totalFeeAmount}元</span>
                    <span className="loan-right-arrow" onClick={this.detailHandler}>详情</span>
                </div>
                <div className="agreement-issue">
                    <div className={this.state.checked?"checked-box":"unchecked-box"} onClick={this.checkHandler}></div>
                    <div className="check-item">同意<a href="">《芥末借款服务协议》</a>、<a href="">《芥末借款协议》</a>，未按时还款将计入信用卡银行的信用报告</div>
                </div>
                <div className="confirm-btn" onClick={this.confirmHandler}>确定</div>
           </div>
        )
    }
});

const Notice = React.createClass({
    getInitialState:function(){
        return {
            noticeShow:this.props.code = 10000 ? true : false
        }
    },
    render:function(){
        return (
            <div className={this.state.noticeShow?"mask":"mask dis"}>
                <div className="notice-pop">
                    <div className="notice-close"></div>
                    <div className="notice-title">逾期费用说明</div>
                    <div className="notice-content">第三届互联网金融全球峰会北大论坛于4月19-21日在北京召开。近期，互联网金融行业风险频发，很多平台陷入兑付危机，在这样的大环境下，导致很多P2P平台开始逐渐退出市场。金融工场副总裁李建光在接受央广网财经记者的采访时指出，2016年是监管落地的元年，在监管的因素落地之前，一定会有一个大浪淘沙的过程，之前的爆发式野蛮增长的过程中，发展出来的平台里面必然会有沙子，但是总体上看，随着监管的落地，互联网金融行业的趋势一定是良币驱逐劣币。</div>
                    <div className="notice-btn">知道了</div>
                </div>
            </div>
        )
    }
});

const VerifyCode = React.createClass({
    confirmBtnHandler:function(){
        this.props.callbackResultShow(true,false);
    },
    closePopHandler:function(){
        this.props.callbackCloseHanler(false);
    },
    getSMSCode:function(){
        let query = $FW.Format.urlQuery();
        let loanNum = query.loanNum;
        let orioleOrderGid = query.orioleOrderGid;
        let withdrawCardGid = query.withdrawCardGid;
        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/sendSmsverifycode.json`,
            method: "post",
            data: {token:localStorage.userToken, userGid:localStorage.userGid,userId:localStorage.userId, sourceType:3, productId:1, orioleOrderGid:orioleOrderGid, loanAmount:loanNum, withdrawCardGid:withdrawCardGid}
        }).then(d => {
            console.log(d);
        }, (error) => console.log(error));
    },
    render:function(){
        return (
            <div className="mask">
                <div className="verify-popup">
                    <div className="verify-popup-wrap">
                        <div className="verify-popup-close" onClick={this.closePopHandler}></div>
                        <div className="verify-popup-title">短信验证</div>
                        <div className="verify-popup-tip"> 已向尾号（2233）发送短信验证码。</div>
                        <div className="verify-input">
                            <input className="sms-input" type="text" value="" placeholder="输入验证码"/>
                            <span className="btn-countdown" onClick={this.getSMSCode}>获取验证码</span>
                        </div>
                        <div className="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                    </div>
                </div>
            </div>
        )
    }
});

const ItemDetail = React.createClass({
    itemHideHandler:function(){
        this.props.callbackItemDetailHide(false);
    },
    render:function(){
        console.log(this.props.feeExtList)
        let item_list = (item,index) => {
            return (
                    <div className="item-list" key={index}><span className="item-left">{item.feeName}</span><span className="item-right">{item.feeAmoutStr}元</span></div>
                )
        };
        return (
            <div className="mask">
                <div className="detail-pop">
                    <div className="close-icon" onClick={this.itemHideHandler}></div>
                    <div className="item-wrap">
                        {this.props.feeExtList.map(item_list)}
                    </div>
                    <div className="know-btn" onClick={this.itemHideHandler}>知道了</div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"确认信息"}/>, document.getElementById('header'));
    let query = $FW.Format.urlQuery();
    let loanNum = query.loanNum;
    let orioleOrderGid = query.orioleOrderGid;
    let withdrawCardGid = query.withdrawCardGid;
        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/tryLoanBudget.json`,
            method: "post",
            data: {token:localStorage.userToken, userGid:localStorage.userGid,userId:localStorage.userId, sourceType:3, orioleOrderGid:orioleOrderGid, loanAmount:loanNum}
        }).then(d => {
        console.log(d);
        ReactDOM.render(<ConfirmLoanWrap {...d}/>, document.getElementById('cnt'));
    }, (error) => console.log(error));

        $FW.Ajax({
            url: `${API_PATH}api/oriole/v1/indexnotice.json`,
            method: "post",
            fail: ()=>true,
            data: {token:localStorage.userToken, userGid:localStorage.userGid,userId:localStorage.userId, sourceType:3}
        }).then(d => {
        console.log(d);
        ReactDOM.render(<Notice {...d}/>, document.getElementById('notice'));
    }, (error) => console.log(error));

});
