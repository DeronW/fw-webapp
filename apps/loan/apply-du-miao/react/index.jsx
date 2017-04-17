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
        let imgUrl = (index) => {
            return {
                background: 'url(images/icon-' + index + '.png) no-repeat center'
            }
        }

        return (
            <div className="">
                {
                    TITLE.map((data, index) => {
                        return <div className="datail-list" key={index}>
                            <div className="title">
                                <div className="icon" style={imgUrl(index)}>

                                </div>
                                <div className="text">{data}</div>
                            </div>
                            <div className="info-block">

                            </div>
                        </div>

                    })
                }
            </div>
        )
    }
}

class BorrowMoney extends React.Component {
    constructor() {
        super()
        this.state = {
            product: {}
        }
    }
    componentDidMount = () => {
        let pid = $FW.Format.urlQuery().id;
        $FXH.Post(`${API_PATH}/api/product/v1/productDetail.json?productId=${pid}`)
            .then(data => this.setState({ product: data }))
    }
    render() {
        return (
            <div className="">
                <div className="">
                    <div className="borrow-money-list">
                        <div className="icon-block"> <img src="images/icon-img.png" /> </div>
                        <div className="info">
                            <div className="t">
                                <span className="title-text">读秒</span>
                                <div className="text"> 借款范围（500 - 10万） </div>
                            </div>

                            <div className="b">
                                <div className="tag">
                                    <img src="images/tag-0.png" />
                                    <img src="images/tag-1.png" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="borrow-money-detail-data">
                        <div className="list">
                            <div className="name-text">6.25%</div>
                            <div className="data-text">
                                每月费用
							<img src="images/icon-6.png" />
                            </div>
                        </div>
                        <div className="list">
                            <div className="name-text">5~28天/个月</div>
                            <div className="data-text">
                                期限范围
						</div>
                        </div>
                        <div className="list">
                            <div className="name-text">56秒/分钟/天</div>
                            <div className="data-text">
                                最快放款
						</div>
                        </div>
                    </div>
                </div>

                <BorrowMoneyDatailList product={this.props.product} />

                <div className="footer">
                    <Nav className="btn" href="/static/loan/apply-borrow-money/index.html">马上拿钱</Nav>
                </div>
            </div>
        )
    }
}

$FW.DOMReady(() => {
    ReactDOM.render(<BorrowMoney />, CONTENT_NODE)
})
