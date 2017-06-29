class Redpacket extends React.Component{
    constructor(props){
        super(props)
        this.state={
            maskShow:false,
            withdrawNum:'',
            frozenNum:'',
            batchGid:'',
            cashCard:[],
            borrowBtnStatus:'',
            value:'',
            remain:0
        }
    }
    componentDidMount(){
        $FXH.Post(`${API_PATH}/api/loan/v1/baseinfo.json`)
            .then(data => this.setState({borrowBtnStatus:data.borrowBtnStatus}));

        $FXH.Post(`${API_PATH}/api/redbag/v1/summary.json`)
            .then(data => this.setState({withdrawNum:data.hasWithdrawAmt,frozenNum:data.freezeAmt,batchGid:data.batchGid}));

        $FXH.Post(`${API_PATH}/api/bankcard/v1/bankcardlist.json`)
            .then(data => this.setState({cashCard:data.userBankList.withdrawBankcard}));
    }
    withdrawHandler = () => {
        $FXH.Post(`${API_PATH}/api/redbag/v1/veriftycode.json`, {
            batchGid:this.state.batchGid
        }).then(data => {
            this.setState({maskShow:true});
            this.tick();
        }, e => $FW.Component.Toast(e.message))
    }
    tick = () => {
        this.setState({remain: 60});
        window.clearInterval(this._timer);
        this._timer = setInterval(this.countingDown, 1000);
    }
    countingDown = () => {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({remain: this.state.remain - 1});
    }
    getSMSCode = () => {
        if (this.state.remain <= 0) {
            this.tick();
            $FXH.Post(`${API_PATH}/api/redbag/v1/veriftycode.json`,{
                batchGid:this.state.batchGid
            }).then(() => {}, e => $FW.Component.Toast(e.message));
        }
    }
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    closePopHandler = () => {
        this.setState({maskShow:false})
    }
    confirmBtnHandler = () => {
        function isRealNameBindCard(ele) {
            return ele.isRealNameBindCard == true;
        }
        let filtered = this.state.cashCard.filter(isRealNameBindCard)[0];
        $FXH.Post(`${API_PATH}/api/redbag/v1/apply.json`,{
            batchGid:this.state.batchGid,
            verifyCode:this.state.value,
            withdrawAmt:this.state.withdrawAmt,
            withdrawCardUuid:filtered.uuid
        }).then(data => {
            location.href = `/static/loan/user-red-packet-result/index.html`;
        }, e => $FW.Component.Toast(e.message));
    }
    changeValueHandler = (e) => {
        this.setState({value: e.target.value});
    }
    render(){
        let cardNoInfo;
        let borrowBtnStatus = this.state.borrowBtnStatus;
        if (borrowBtnStatus >= 2){
            function isRealNameBindCard(ele) {
                return ele.isRealNameBindCard == true;
            }
            let filtered = this.state.cashCard.filter(isRealNameBindCard)[0];
            cardNoInfo = `农行(尾号${filtered.cardNo.slice(-4)})`;
        }else{
            cardNoInfo = '暂未设置'
        }
        return (
            <div className="red-packet-wrapper">
                 <div className="header">
                     <div className="arrow" onClick={()=>{$FW.Browser.inApp()?NativeBridge.close():gotoHandler('/static/loan/user/index.html')}}></div>红包账户<a className="details-entry" href="/static/loan/user-red-packet-detail/index.html">红包明细</a>
                 </div>
                 <div className="red-packet-area">
                     <div className="packet-title">可提现(元)</div>
                     <div className="packet-num">{this.state.withdrawNum}</div>
                     <div className="packet-frozen">冻结(元)：{this.state.frozenNum}</div>
                 </div>
                 <div className="withdraw-card">
                     <div className="card-title">银行卡</div>
                     <div className="card-branch">{cardNoInfo}</div>
                 </div>
                 <div className="withdraw-btn" onClick={this.withdrawHandler}>提现</div>
                 <div className="packet-tips">
                     <div className="packet-tips-title">温馨提示</div>
                     <div className="packet-rule">单笔提现金额不低于50元，单日提现次数不超过3次；</div>
                     <div className="packet-rule">7*24小时可以提现；</div>
                     <div className="packet-rule">提现后1-3个工作日到账；</div>
                     <div className="packet-rule">若有问题，请咨询<span>400-102-0066</span>。</div>
                 </div>
                {this.state.maskShow && <div className="mask">
                    <div className="verify-popup">
                        <div className="verify-popup-wrap">
                            <div className="verify-popup-close" onClick={this.closePopHandler}></div>
                            <div className="verify-popup-title">短信验证</div>
                            <div className="verify-popup-tip">
                                已向手机号(尾号{$FW.Store.get('phone').slice(-4)})发送短信验证码
                            </div>
                            <div className="verify-input">
                                <input className="sms-input" type="number" name="number" value={this.state.value}
                                       placeholder="输入验证码" onChange={this.changeValueHandler}/>
                                <span className="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                            </div>
                            <div className="btn-list">
                                <div className="cancel-btn" onClick={this.closePopHandler}>取消</div>
                                <div className="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inFXHApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

$FW.DOMReady(() => {
    ReactDOM.render(<Redpacket />, CONTENT_NODE)
})