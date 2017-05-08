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
            product: {}
        }
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentDidMount = () => {
        let pid = $FW.Format.urlQuery().productId;
        $FXH.Post(`${API_PATH}/api/product/v1/productDetail.json?productId=${pid}&sourceType=${SOURCE_TYPE}`)
            .then(data => this.setState({ product: data}));
    }
    clickHandler(){
        if($FW.Browser.inIOS()){
            window.location.href = this.state.product.iosSoftwareUrl;
        }
        if($FW.Browser.inAndroid()){
            window.location.href = this.state.product.androidSoftwareUrl;
        }
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
                    <Nav className="btn" onClick={this.clickHandler}>马上下载</Nav>
                </div>
            </div>
        )
    }
}

$FW.DOMReady(() => {
    let productName = $FW.Format.urlQuery().productName;
    NativeBridge.setTitle(productName);
    ReactDOM.render(<Header title={productName} />, HEADER_NODE);
    ReactDOM.render(<BorrowMoney />, CONTENT_NODE)
})
