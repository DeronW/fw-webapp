
class RedPacketDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            rows: [],
            hasData: true
        }
    }
    componentDidMount() {
        this.loadMore()
        $FW.Event.touchBottom(this.loadMore);
    }
    loadMore = (done) => {
        if (!this.state.hasData) return;
        let user = $FW.Store.getUserDict();

        $FXH.Post(`${API_PATH}/api/redbag/v1/list.json`, {
            pageSize: 20,
            pageIndex: this.state.page
        }).then(data => {
            let RedPacketDetailList = data.ResultList;
            this.setState({
                rows: RedPacketDetailList,
                page: this.state.page + 1,
                hasData: !!RedPacketDetailList.length
            })
            done && done()
        })
    }
    render() {
        // let item_list = (item, index) => {
        //     let repayment;
        //     if (item.repaymentStatus == 0) repayment = '借款失败';
        //     if (item.repaymentStatus == 1) repayment = '已还款';

        //     return (
        //         <a className="bill-item" key={index}
        //             href={`/static/loan/fxh-bill/index.html?loanType=${item.loanType}&loanGid=${item.loanGid}`}>
        //             <div className="bill-detail">
        //                 <div className="bill-detail-wrap">
        //                     <span className="bill-money">
        //                         {item.loanAmount.toFixed(2)}</span>
        //                 </div>
        //                 <span className="bill-deadline">{item.loanTimeStr}</span>
        //             </div>
        //             <div className="pay-back-btn-wrap">
        //                 <span className="bill-status">
        //                     {repayment}
        //                     <img src="images/right-arrow.jpg" />
        //                 </span>
        //             </div>
        //         </a>
        //     )
        // };

        // let empty = <div className="no-data-box">
        //     <img className="no-data-img" src="images/no-data.png" />
        // </div>;

        let {rows, hasData} = this.state;

        return (
            <div>
                {/*松开刷新提示*/}
                {/*数据列表*/}
                {/*<div className="data-list">
                    {rows.map(item_list)}
                </div>*/}
                <div className="data-list">
                    <div className="list-item">
                        <div className="red-status">
                            <span className="status-text">可提现</span>
                            <span className="status-num">15</span>
                        </div>
                        <div className="sub-red-status">
                            <span className="sub-status-text">好友（尾号1231）首借已还款</span>
                            <span className="status-time">2016-12-16</span>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="red-status">
                            <span className="status-text">可提现</span>
                            <span className="status-num">15</span>
                        </div>
                        <div className="sub-red-status">
                            <span className="sub-status-text">好友（尾号1231）首借已还款</span>
                            <span className="status-time">2016-12-16</span>
                        </div>
                    </div>
                </div>
                {/*已加载完全部数据提示*/}
                {/*{hasData && <div className="data-completion">已加载完全部数据</div>}
                {rows.length === 0 && !hasData && empty}*/}
            </div>
        )
    }
};

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"红包明细"} />, HEADER_NODE);
    ReactDOM.render(<RedPacketDetail />, CONTENT_NODE);
});
