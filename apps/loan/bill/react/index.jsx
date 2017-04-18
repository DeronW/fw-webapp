class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_type: '1',
            tab_list: [
                { type: '1', name: '申请中', page_no: 1 },
                { type: '2', name: '还款中', page_no: 1 },
                { type: '3', name: '未通过', page_no: 1 },
                { type: '4', name: '已还款', page_no: 1 }
            ],
            order_list: { '1': [], '2': [], '3': [], '4': [] }
        }

    }
    get_current_tab = () => {
        let { tab_list, current_type } = this.state;
        return tab_list.find(i => i.type === current_type) || {}
    }
    loadMoreHandler = (done) => {
        let { order_list, current_type, tab_list } = this.state;
        let current_tab = this.get_current_tab()
        if (current_tab.page_no === 0) return;

        $FXH.Post(`${API_PATH}/api/order/v1/orderList.json`, {
            pageSize: 10,
            pageIndex: current_tab.page_no,
            loanStatus: current_type
        }).then(data => {
            order_list[current_type].push(...data.resultList)
            this.setState({ order_list: order_list })
            let ind = tab_list.findIndex(i => i.type === current_type)
            current_tab.page_no < data.totalPage ?
                tab_list[ind].page_no++ :
                tab_list[ind].page_no = 0;
            this.setState({ tab_list: tab_list })
            done && done();
        })
    }
    componentDidMount() {
        this.loadMoreHandler(null);
        $FW.Event.touchBottom(this.loadMoreHandler);
    }
    switchTabHandler = (type) => {
        this.setState({ current_type: type }, this.loadMoreHandler);
    }
    render() {
        let { current_type, tab_list, order_list } = this.state;

        let tab = (tab, index) => {
            let cn = tab.type === current_type ? "ui-tab-li ui-select-li" : "ui-tab-li";
            return <Nav key={index} className={cn} onClick={() => { this.switchTabHandler(tab.type); }}>
                <span className="text">{tab.name}</span>
            </Nav>
        }

        let order_item = (order, index) => {
            let statusColor = `bill-${current_type}-color`;
            let link = order.productId == 1 ?
                `/static/loan/bill-detail/index.html?uuid=${order.loanGid}` : `/static/loan/bill-detail-dumiao/index.html?uuid=${order.uuid}`;
            let logo = order.productId == 1 ? "images/fxh-logo.png" : "images/dumiao-logo.png";

            return <Nav className="list_li" key={`${order.orderGid}${index}`} href={link}>
                <div className="list-img"><img src={logo} /></div>
                <div className="list-content">
                    <div className="apply-num">借款金额:{order.loanAmtStr}元</div>
                    <div className="apply-duration">借款期限:{order.termNum}天</div>
                </div>
                <div className="apply-status-wrap">
                    <div className="apply-status">
                        <span className={statusColor}>{this.get_current_tab().name}</span></div>
                    <div className="apply-time">{order.loanTime}</div>
                </div>
            </Nav>
        }

        let empty = <span className="no-data"></span>

        return (
            <div className="billContent">
                <div className="bill-header"> {tab_list.map(tab)} </div>
                <div className="billContainer">
                    {order_list[current_type].map(order_item)}
                    {order_list[current_type].length === 0 && empty}
                </div>
            </div>
        )
    }
}

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"借款账单"} show_back={false} />, HEADER_NODE);
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
    ReactDOM.render(<Content />, CONTENT_NODE);
});
