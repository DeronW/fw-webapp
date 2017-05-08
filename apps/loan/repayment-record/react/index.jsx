class RecordList extends React.Component {
    constructor() {
        super();
        this.repaymentid = $FW.Format.urlQuery().repaymentUuid;
        this.state = {
            list: [],
            curPage: 1
        }
    }

    componentDidMount() {
        this.loadMore(null);
        $FW.Event.touchBottom(this.loadMore);
    }

    loadMore = (done) => {
        if (this.state.curPage === 0) return done && done();
        $FXH.Post(`${API_PATH}/api/repayment/v1/repaymentrecordlist.json`, {
            repaymentid: this.repaymentid,
            page: this.state.curPage,
            pageSize: 10
        }).then((data) => {
            let list_temp = [...this.state.list],
                curPage_temp = this.state.curPage;
            list_temp.push(...data.resultList);
            curPage_temp === data.totalPage ?
                curPage_temp = 0 :
                curPage_temp ++ ;
            this.setState({list: list_temp, curPage: curPage_temp});
            done && done();
        }, e => $FW.Component.Toast(e.message));
    }

    render() {
        let fxhBanner_el = (
            <div className="fxh-banner-wrap">
                <img src='./images/fxh-banner.png'></img>
            </div>
        );
        let generate_list_item = (item) => (
            <div className="record-list-item" key={item.updateTime}>
                <div className="left-els">
                    <div className="amount">{item.repaymentAmt.toFixed(2)}</div>
                    <div className="time">{item.updateTime}</div>
                </div>
                <div className="right-els">
                    <span>{item.bankShortName}</span>
                    <span>{`(尾号${item.cardNo})`}</span>
                </div>
            </div>
        );
        return (
            <div>
                { fxhBanner_el }
                <div className="record-list">
                    {this.state.list.map(generate_list_item)}
                </div>
            </div>
        )
    }
}

$FW.DOMReady(() => {
    ReactDOM.render(<Header title="还款记录" />, HEADER_NODE);
    ReactDOM.render(<RecordList />, CONTENT_NODE);
})
