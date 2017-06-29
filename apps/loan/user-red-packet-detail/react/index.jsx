
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
                hasData: !!rows.length
            })
            done && done()
        })
    }
    render() {
        let statusText = () => {
            console.log(111111111);
            if(this.state.rows.redbagStatus == 0){
                return <span className="status-text">注册冻结</span>
            }else if(this.state.rows.redbagStatus == 1){
                return <span className="status-text">放款冻结</span>
            }else if(this.rows.redbagStatus == 2){
                return <span className="status-text">可提现</span>
            }else if(this.state.rows.redbagStatus == 3){
                return <span className="status-text">体现中</span>
            }else if(this.state.rows.redbagStatus == 4){
                return <span className="status-text">已提现</span>
            }else if(this.state.rows.redbagStatus == 6){
                return <span className="status-text">红包过期失效</span>
            }else if(this.state.rows.redbagStatus == 7){
                return <span className="status-text">活动过期失效</span>
            }else if(this.state.rows.redbagStatus == 8){
                return <span className="status-text">首借非掌众失效</span>
            }
        }
        let item_test = (item,index) => {
            
        }
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
                <div className="refresh">
                    <div className="logo-container">
                        <img src="images/fxh-logo.png" alt=""/>
                    </div>
                    <div className="right-text">
                        <p className="refresh-text">松开刷新</p>
                        <p className="refresh-time">上次更新时间 <span>11:57:23</span></p>
                    </div>
                </div>
                {/*数据列表*/}
                {/*<div className="data-list">
                    {rows.map(item_list)}
                </div>*/}
                <div className="data-list">
                    <div className="list-item">
                        <div className="red-status">
                            {/*<span className="status-text">可提现</span>*/}
                             {statusText}
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
                <div className="data-completion">已加载完全部数据</div>
            </div>
        )
    }
};

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"红包明细"} />, HEADER_NODE);
    ReactDOM.render(<RedPacketDetail />, CONTENT_NODE);
});
