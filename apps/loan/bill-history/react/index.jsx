
const HistoryBill = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            rows: [],
            hasData: true
        }
    },
    componentDidMount: function () {
        this.loadMoreProductHandler()
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },
    loadMoreProductHandler: function (done) {
        if (!this.state.hasData) return;
        let user = $FW.Store.getUserDict();

        $FW.Post(`${API_PATH}api/oriole/v1/loanhistory.json`, {
            token: user.token,
            userGid: user.gid,
            userId: user.id,
            sourceType: 3,
            pageSize: 20,
            pageIndex: this.state.page
        }).then(data => {
            let loanHistoryList = data.loanHistoryList;
            this.setState({
                rows: loanHistoryList,
                page: this.state.page + 1,
                hasData: !!loanHistoryList.length
            })
            done && done()
        })
    },
    render: function () {
        let item_list = (item, index) => {
            let repayment;
            if (item.repaymentStatus == 0) repayment = '借款失败';
            if (item.repaymentStatus == 1) repayment = '已还款';

            return (
                <a className="bill-item" key={index}
                    href={`/static/loan/bill-detail/index.html?loanType=${item.loanType}&loanGid=${item.loanGid}`}>
                    <div className="bill-detail">
                        <div className="bill-detail-wrap">
                            <span className="bill-money">
                                {item.loanAmount.toFixed(2)}</span>
                        </div>
                        <span className="bill-deadline">{item.loanTimeStr}</span>
                    </div>
                    <div className="pay-back-btn-wrap">
                        <span className="bill-status">
                            {repayment}
                            <img src="images/right-arrow.jpg" />
                        </span>
                    </div>
                </a>
            )
        };

        let empty = <div className="no-data-box">
            <img className="no-data-img" src="images/no-data.png" />
        </div>;

        let {rows, hasData} = this.state;

        return (
            <div>
                <div className="data-box">
                    {rows.map(item_list)}
                    {!hasData && <div className="data-completion">已加载完全部数据</div>}
                </div>
                {rows.length === 0 && empty}
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"历史账单"} />, HEADER_NODE);
    ReactDOM.render(<HistoryBill />, CONTENT_NODE);
});
