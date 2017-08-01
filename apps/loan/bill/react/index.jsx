class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_type: window.location.hash.slice(1) || '1',
            tab: {
                '1': { name: '申请中', page_no: 1, order_list: [] },
                '2': { name: '还款中', page_no: 1, order_list: [] },
                '3': { name: '未通过', page_no: 1, order_list: [] },
                '4': { name: '已还款', page_no: 1, order_list: [] }
            }
        }
    }

    loadMoreHandler = (done) => {
        let { current_type, tab } = this.state, current_tab = tab[current_type];
        if (current_tab.page_no === 0) return done && done();

        $FXH.Post(`${API_PATH}/api/order/v1/orderList.json`, {
            pageSize: 10,
            pageIndex: current_tab.page_no,
            loanStatus: current_type
        }).then(data => {
            tab[current_type].order_list.push(...data.resultList)
            current_tab.page_no < data.totalPage ?
                tab[current_type].page_no++ :
                tab[current_type].page_no = 0;
            this.setState({ tab: tab });

            done && done();
        })
    }
    componentDidMount() {
        this.loadMoreHandler(null);
        $FW.Event.touchBottom(this.loadMoreHandler);
    }
    switchTabHandler = (type) => {
        this.setState({ current_type: type }, this.loadMoreHandler);
        window.location.hash = type;
    }
    render() {
        let { current_type, tab } = this.state;

        let btn_tab = (type, index) => {
            let cn = `ui-tab-li ${type === current_type && 'ui-select-li'}`
            return <a key={index} className={cn}
                onClick={() => this.switchTabHandler(type)}>
                <span className="text">{tab[type].name}</span>
            </a>
        }

        let order_item = (order, index) => {
            let link = order.productId == 1 ?
                `/static/loan/fxh-bill/index.html?uuid=${order.loanGid}` :
                `/static/loan/dumiao-bill/index.html?uuid=${order.uuid}&baseStatus=${order.baseStatus}`;
            //let logo = order.productId == 1 ? "images/fxh-logo.png" : "images/dumiao-logo.png";

            return <Nav className="list_li" key={`${order.orderGid}${index}`} href={link}>
                <div className="list-img"><img src={order.productLogo} /></div>
                <div className="list-content">
                    <div className="apply-num">借款金额:{order.loanAmtStr}元</div>
                    <div className="apply-duration">借款期限:{order.termNumStr}</div>
                </div>
                <div className="right-arrow"><img src="images/right-arrow.png"/></div>
                <div className="apply-status-wrap">
                    <div className="apply-status">
                        <span className={`bill-${current_type}-color`}>{ current_type == 2 ? "立即还款" : tab[current_type].name}</span>
                    </div>
                    <div className="apply-time">{order.loanTimeStr}</div>
                </div>
            </Nav>
        }

        let empty = <span className="no-data"></span>
        let current_tab = this.state.tab[this.state.current_type]

        return <div className="billContent">
            <div className="bill-header"> {['1', '2', '3', '4'].map(btn_tab)} </div>
            <div className="billContainer">
                {current_tab.order_list.map(order_item)}
                {current_tab.order_list.length === 0 && empty}
            </div>
        </div>
    }
}

function back_handler(){
    location.href = "/static/loan/user/index.html";
}

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"借款账单"} show_back={true} back_handler={()=>back_handler()}/>, HEADER_NODE);
    //ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
    ReactDOM.render(<Content />, CONTENT_NODE);
});
