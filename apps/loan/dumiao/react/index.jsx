const TITLE = [
    '申请条件',
    '所需资料',
    '授权认证',
    '审核方式',
    '还款方式'
]

const INFO = [
    [
        '中国大陆公民，年龄22-55周岁；手机号实名认证且在网时间超过6个月；有正常使用的信用卡；芝麻信用分600分以上。'
    ],
    [
        '用户基本信息、信用卡、手机号、芝麻信用分。'
    ],
    [
        '手机运营商、银行卡、芝麻信用分。'
    ],
    [
        '纯线上审核。'
    ],
    [
        '用户可选择自动扣款，也可主动还款。'
    ]
]

class BorrowMoneyDatailList extends React.Component {
    render() {
        let item = (data, index) => {
            return <div className="datail-list" key={index}>
                <div className="title">
                    <div className="icon" style={
                        { backgroundImage: `url(images/icon-${index}.png)` }}>
                    </div>
                    <div className="text">{data}</div>
                </div>
                <div className="info-block">{INFO[index]} </div>
            </div>
        }
        return <div className=""> {TITLE.map(item)} </div>
    }
}

class BorrowMoney extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            borrowStatus: '',
            ableEnter: '',
            detailPopShow: false,
            dumiaoEnterPopShow: false,
            tryOtherLoanPopShow: false,
            canMessageShow: false,
            tryOtherLoanMsg: '',
            canStatus: null,
            canMessage: '',
            loanUuid: null,
            loanShow:false,
            failMsg: '',
            title:'',
            errCode:null
        }
    }
    componentDidMount = () => {
        let pid = $FW.Format.urlQuery().pid;

        $FXH.Post(`${API_PATH}/api/product/v1/productDetail.json?productId=${pid}`)
            .then(data => this.setState({ product: data }));

        $FXH.Post(`${API_PATH}/api/loan/v1/baseinfo.json`, {
            productId: pid
        }).then(data => this.setState({ borrowStatus: data.borrowBtnStatus })).then(() => {

            $FXH.Post(`${API_PATH}/api/loan/v1/dmStatus.json`)
                .then(data => {
                    if (data.canStatus == 0) {
                        this.setState({
                            canStatus: 0, canMessage: data.canMessage, loanUuid: data.loanUuid
                        });
                        // this.setState({
                        //     canStatus: 0
                        // });
                    } else if (data.canStatus == 1) {
                        // this.setState({
                        //     canStatus: 1, loanUuid: data.loanUuid, canMessage: data.canMessage
                        // });
                        this.setState({
                            canStatus: 1, failMsg:data.message
                        });
                    } else if (data.canStatus == 2) {
                        this.setState({ canStatus: 2 });
                    }
                }, err => {
                    if(err.code == 20013){
                        this.setState({errCode:err.code, failMsg:"您的用户信息与分期不匹配无法授权登录分期", title:"审核未通过"})
                    }else if(err.code == 1001003){
                        this.setState({errCode:err.code, failMsg:"您无法申请分期借款", title:"提示"})
                    }else if(err.code == 10001){
                        this.setState({errCode:err.code, failMsg:err.message});
                    }else{
                        this.setState({ ableEnter: err.code, tryOtherLoanMsg: err.message })
                    }
                });
        })
    }

    callbackHandler = () => {
        this.setState({loanShow:false})
    }

    clickHandler = () => {
        let { canStatus, borrowStatus, errCode} = this.state;
        // 初始化数据没有完成, 稍后再试
        if (canStatus === null && errCode != 20013 && errCode !=1001003 && errCode !=10001) return;
        if (borrowStatus == 1 || borrowStatus == 101) {
            gotoHandler('/static/loan/user-card-set/index.html');
        } else if (canStatus == 2) {
            let link = `/static/loan/dumiao-put-in/index.html?pid=${$FW.Format.urlQuery().pid}`;
            gotoHandler(link);
        } else if (canStatus === 0) {
            this.setState({ dumiaoEnterPopShow: true });
            //this.setState({loanShow:true, failMsg:"您无法申请读秒借款", title:"提示"});
        } else if (canStatus == 1) {
            //this.setState({ canMessageShow: true });
            this.setState({loanShow:true, failMsg:"您无法申请分期借款", title:"提示"});
        } else if(errCode == 20013 || errCode == 1001003){
            this.setState({loanShow:true});
        } else if(errCode == 10001){
            $FW.Component.Toast(this.state.failMsg)
        }else {
            this.setState({ tryOtherLoanPopShow: true });
        }
    }
    imgClickHandler = () => {
        this.setState({ detailPopShow: true });
    }
    detailClickHandler = () => {
        this.setState({ detailPopShow: false })
    }
    dumiaoCloseHandler = () => {
        this.setState({ dumiaoEnterPopShow: false })
    }
    tryOtherLoanCloseHandler = () => {
        this.setState({ tryOtherLoanPopShow: false })
    }
    canMessageCloseHandler = () => {
        this.setState({ canMessageShow: false })
    }
    render() {
        let labelList = this.state.product.productLabelList;
        let link = `${API_PATH}/api/order/v1/jump.shtml?sourceType=${SOURCE_TYPE}&token=${$FW.Browser.inFXHApp() ? getCookie().token : USER.token}&uid=${$FW.Browser.inFXHApp() ? getCookie().uid : USER.uid}&loanUuid=${this.state.loanUuid == null ? '' : this.state.loanUuid}`;
        let app_link = `https://m.easyloan888.com/api/order/v1/jump.shtml?token=${$FW.Browser.inFXHApp() ? getCookie().token : USER.token}&uid=${$FW.Browser.inFXHApp() ? getCookie().uid : USER.uid}&loanUuid=${this.state.loanUuid == null ? '' : this.state.loanUuid}`;
        let goDumiao = () => {
            return <div className="mask" style={{ zIndex: 100 }}>
                <div className="detail-pop">
                    <div className="pop-close" onClick={this.dumiaoCloseHandler}></div>
                    <div className="pop-tip">{this.state.canMessage}</div>
                    <div className="know-btn" onClick={() => { $FW.Browser.inApp() ? NativeBridge.goto(app_link, false, "分期") : gotoHandler(link) }}>
                        点击查看详情</div>
                </div>
            </div>
        }

        return <div className="">
            {this.state.loanShow && <ProductDisplay callbackHandler={this.callbackHandler} errorMessage={this.state.failMsg} popTitle={this.state.title}/>}
            <div className="">
                <div className="borrow-money-list">
                    <div className="icon-block">
                        <img src={this.state.product.productLogo} /> </div>
                    <div className="info">
                        <div className="t">
                            <span className="title-text">{this.state.product.productName}</span>
                            <div className="text"> 借款范围（{this.state.product.amountStr}） </div>
                        </div>
                        <div className="b">
                            <div className="tag" >
                                {labelList && labelList.map((data, index) => {
                                    return <img src={"images/tag-" + data.labelType + ".png"} key={index} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="borrow-money-detail-data">
                    <div className="list">
                        <div className="name-text">{this.state.product.monthRateStr}</div>
                        <div className="data-text">
                            每月费用
							<img src="images/icon-6.png" onClick={this.imgClickHandler} />
                        </div>
                    </div>
                    <div className="list">
                        <div className="name-text">{this.state.product.termRangeStr}个月</div>
                        <div className="data-text">
                            期限范围
						</div>
                    </div>
                    <div className="list">
                        <div className="name-text">{this.state.product.fastLoanValue}</div>
                        <div className="data-text">
                            最快放款
						</div>
                    </div>
                </div>
            </div>
            <BorrowMoneyDatailList product={this.props.product} />
            <div className="footer">
                <div className="btn" onClick={this.clickHandler}>马上拿钱</div>
            </div>
            {this.state.detailPopShow && <div className="mask" style={{ zIndex: 100 }}>
                <div className="detail-pop">
                    <div className="pop-title">费用说明</div>
                    <div className="pop-close" onClick={this.detailClickHandler}></div>
                    <div className="pop-item">
                        <div className="pop-item-wrap"><span className="pop-item-name">月利率</span><span className="pop-item-num">{this.state.product.loanRateStr}</span></div>
                        <div className="pop-item-desc">贷款机构收取的贷款利率,按月收取</div>
                    </div>
                    <div className="pop-item">
                        <div className="pop-item-wrap"><span className="pop-item-name">月服务利率</span><span className="pop-item-num">{this.state.product.serviceRateStr}</span></div>
                        <div className="pop-item-desc">贷款机构收取的贷款服务费,按月收取</div>
                    </div>
                    <div className="pop-item">
                        <div className="pop-item-wrap"><span className="pop-item-name">一次性手续费</span><span className="pop-item-num">{this.state.product.commRateStr}</span></div>
                        <div className="pop-item-desc">贷款机构收取的一次性费用</div>
                    </div>
                    <a className="know-btn" onClick={this.detailClickHandler}>知道了</a>
                </div>
            </div>}
            {this.state.dumiaoEnterPopShow && goDumiao()}
            {this.state.canMessageShow && <div className="mask" style={{ zIndex: 100 }}>
                <div className="detail-pop">
                    <div className="pop-close" onClick={this.canMessageCloseHandler}></div>
                    <div className="pop-tip">{this.state.canMessage}</div>
                    <a className="know-btn" onClick={
                        () => $FW.Browser.inApp() ?
                            NativeBridge.close() :
                            gotoHandler("/static/loan/home/index.html")}>
                        尝试其他借款</a>
                </div>
            </div>}
            {this.state.tryOtherLoanPopShow && <div className="mask" style={{ zIndex: 100 }}>
                <div className="detail-pop">
                    <div className="pop-close" onClick={this.tryOtherLoanCloseHandler}></div>
                    <div className="pop-tip">{this.state.tryOtherLoanMsg}</div>
                    <a className="know-btn" onClick={
                        () => $FW.Browser.inApp() ?
                            NativeBridge.close() :
                            gotoHandler("/static/loan/home/index.html")}>
                        尝试其他借款</a>
                </div>
            </div>}
        </div>
    }
}

function getCookie() {
    let c = document.cookie, r = {};
    if (c === '') return {}
    c.split('; ').forEach(function (kv) {
        let t = kv.split('=');
        r[t[0]] = t[1];
    });
    return r;
}

function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

const USER = $FW.Store.getUserDict();

$FW.DOMReady(() => {
    NativeBridge.setTitle('分期');
    ReactDOM.render(<Header title={"分期"} />, HEADER_NODE);
    ReactDOM.render(<BorrowMoney />, CONTENT_NODE)
})
