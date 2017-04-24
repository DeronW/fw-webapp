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
            borrowStatus:'',
            ableEnter:'',
            detailPopShow:false,
            dumiaoEnterPopShow:false,
            tryOtherLoanPopShow:false,
            tryOtherLoanMsg:'',
            canStatus:'',
            canMessage:'',
            loanUuid:null
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.imgClickHandler = this.imgClickHandler.bind(this);
        this.detailClickHandler = this.detailClickHandler.bind(this);
        this.dumiaoCloseHandler = this.dumiaoCloseHandler.bind(this);
        this.tryOtherLoanCloseHandler = this.tryOtherLoanCloseHandler.bind(this);
    }
    componentDidMount = () => {
        let pid = $FW.Format.urlQuery().pid;
        $FXH.Post(`${API_PATH}/api/product/v1/productDetail.json?productId=${pid}`)
            .then(data => this.setState({ product: data}));
        $FXH.Post(`${API_PATH}/api/loan/v1/baseinfo.json`,{
            productId:pid
        }).then(data=>this.setState({borrowStatus:data.borrowBtnStatus}));
        $FXH.Post(`${API_PATH}/api/loan/v1/dmStatus.json`)
            .then(data=>{
                this.setState({canStatus:data.canStatus,canMessage:data.canMessage,loanUuid:data.loanUuid});
            }, err=>{
                this.setState({ableEnter:err.code, tryOtherLoanMsg:err.message})
            }
         );
    }
    clickHandler(){
        let borrowStatus = this.state.borrowStatus;
        let canStatus = this.state.canStatus;
        if(borrowStatus == 1 || borrowStatus == 101){
            location.href = '/static/loan/user-card-set/index.html';
        }else if(canStatus == 2){
            location.href = '/static/loan/dumiao-put-in/index.html?pid=' + $FW.Format.urlQuery().pid;
        }else if(canStatus == 0 || canStatus == 1){
             this.setState({dumiaoEnterPopShow:true});
        }else{
            this.setState({tryOtherLoanPopShow:true});
        }
    }
    imgClickHandler(){
        this.setState({detailPopShow:true});
    }
    detailClickHandler(){
        this.setState({detailPopShow:false})
    }
    dumiaoCloseHandler(){
        this.setState({dumiaoEnterPopShow:false})
    }
    tryOtherLoanCloseHandler(){
        this.setState({tryOtherLoanPopShow:false})
    }
    render() {
        let labelList = this.state.product.productLabelList;
        return (
            <div className="">
                <div className="">
                    <div className="borrow-money-list">
                        <div className="icon-block"> <img src={this.state.product.productLogo}/> </div>
                        <div className="info">
                            <div className="t">
                                <span className="title-text">{ this.state.product.productName }</span>
                                <div className="text"> 借款范围（{ this.state.product.amountStr }） </div>
                            </div>
                            <div className="b">
                                <div className="tag" >
                                    {labelList && labelList.map((data, index) => {
                                        return  <img src={ "images/tag-"+ data.labelType  +".png"} key={ index } />
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
							<img src="images/icon-6.png" onClick={this.imgClickHandler}/>
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
                    <Nav className="btn" onClick={this.clickHandler}>马上拿钱</Nav>
                </div>
                {this.state.detailPopShow  && <div className="mask" style={{zIndex:100}}>
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
                {this.state.dumiaoEnterPopShow && <div className="mask" style={{zIndex:100}}>
                    <div className="detail-pop">
                        <div className="pop-close" onClick={this.dumiaoCloseHandler}></div>
                        <div className="pop-tip">{this.state.canMessage}</div>
                        <a className="know-btn" href={`${API_PATH}/api/order/v1/jump.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}&userGid=${USER.gid}&userId=${USER.id}&loanUuid=${this.state.loanUuid}`}>进入读秒查看</a>
                    </div>
                </div>}
                {this.state.tryOtherLoanPopShow && <div className="mask" style={{zIndex:100}}>
                    <div className="detail-pop">
                        <div className="pop-close" onClick={this.tryOtherLoanCloseHandler}></div>
                        <div className="pop-tip">{this.state.tryOtherLoanMsg}</div>
                        <a className="know-btn" onClick={()=>$FW.Browser.inApp()?NativeBridge.close():gotoHandler("/static/loan/home/index.html")}>尝试其他借款</a>
                    </div>
                </div>}
            </div>
        )
    }
}

const USER = $FW.Store.getUserDict();
$FW.DOMReady(() => {
    NativeBridge.setTitle('读秒');
    ReactDOM.render(<Header title={"读秒"} />, HEADER_NODE);
    ReactDOM.render(<BorrowMoney />, CONTENT_NODE)
})
