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


class BorrowMoney extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {}
        }
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentDidMount(){
        let pid = $FW.Format.urlQuery().productId;
        $FXH.Post(`${API_PATH}/api/product/v1/productDetail.json?productId=${pid}&sourceType=${SOURCE_TYPE}`)
            .then(data => {
                window.DATA = data
                this.setState({product: data})
            });
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
        if(this.state.product.descInfo){
            var itemList = JSON.parse(this.state.product.descInfo);
            console.log(itemList)
        }
        let item = (data, index) => {
            return <div className="datail-list" key={index}>
                <div className="title">
                    <div className="icon" style={
                        { backgroundImage: `url(images/icon-${data.type}.png)` }}>
                    </div>
                    <div className="text">{data.name}</div>
                </div>
                <div className="info-block">{data.content} </div>
            </div>
        }
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
                <div className="detail-list-wrap">
                    {itemList && itemList.map(item)}
                </div>

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
