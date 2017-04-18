const TITLE = [
    '申请条件',
    '所需资料',
    '授权认证',
    '审核方式',
    '还款方式'
]

const INFO = [
    [
        '贷款机构收取的贷款服务费,按月收取。',
        '贷款机构收取的贷款服务费,按月收取贷款机构收取的贷款服务费,按月收取取。',
        '贷款机构收取的,按月收取。'
    ],
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
    constructor() {
        super()
        this.state = {
            product: {
                productLabelList: []
            }
        }
    }
    componentDidMount = () => {
        let pid = $FW.Format.urlQuery().pid;
        $FXH.Post(`${API_PATH}/api/product/v1/productDetail.json?productId=${pid}`)
            .then(data => this.setState({ product: data }))
    }
    render() {
        let pid = $FW.Format.urlQuery().pid;

        return (
            <div className="">
                <div className="">
                    <div className="borrow-money-list">
                        <div className="icon-block"> <img src="images/icon-img.png" /> </div>
                        <div className="info">
                            <div className="t">
                                <span className="title-text">{ this.state.product.productName }</span>
                                <div className="text"> 借款范围（{ this.state.product.amountStr }） </div>
                            </div>

                            <div className="b">
                                <div className="tag" >
                                    {
                                        this.state.product.productLabelList.map((data, index) => {
                                            return  <img src={ "images/tag-"+ data.labelType  +".png"} key={ index } />
                                        }) 
                                    }
                                    
                                    
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="borrow-money-detail-data">
                        <div className="list">
                            <div className="name-text">{ this.state.product.serviceRateStr }</div>
                            <div className="data-text">
                                每月费用
							<img src="images/icon-6.png" />
                            </div>
                        </div>
                        <div className="list">
                            <div className="name-text">{ this.state.product.termRangeStr }天/个月</div>
                            <div className="data-text">
                                期限范围
						</div>
                        </div>
                        <div className="list">
                            <div className="name-text">{ this.state.product.fastLoanValue }</div>
                            <div className="data-text">
                                最快放款
						</div>
                        </div>
                    </div>
                
                </div>                

                <BorrowMoneyDatailList product={this.props.product} />

                <div className="footer">
                    <Nav className="btn" href={ '/static/loan/apply-borrow-money/index.html?productId=' + pid }>马上拿钱</Nav>
                </div>
            </div>
        )
    }
}

$FW.DOMReady(() => {
    ReactDOM.render(<BorrowMoney />, CONTENT_NODE)
})
