
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
            let RedPacketDetailList = data.resultList;
            this.setState({
                rows: RedPacketDetailList,
                page: this.state.page + 1,
                hasData: !!RedPacketDetailList.length
            })
            done && done()
        })
    }
    render() {
        // 判断红包状态
        let statusText = (item) => {
            console.log(111111111);
            if(parseInt(item.redbagStatus) == 0){
                return <span className="status-text">注册冻结</span>
            }else if(item.redbagStatus ==1){
                return <span className="status-text">放款冻结</span>
            }else if(item.redbagStatus == 2){
                return <span className="status-text">可提现</span>
            }else if(item.redbagStatus ==3){
                return <span className="status-text">体现中</span>
            }else if(item.redbagStatus ==4){
                return <span className="status-text">已提现</span>
            }else if(item.redbagStatus == 6){
                return <span className="status-text">红包过期失效</span>
            }else if(item.redbagStatus == 7){
                return <span className="status-text">活动过期失效</span>
            }else if(item.redbagStatus == 8){
                return <span className="status-text">首借非掌众失效</span>
            }
        }


        let {rows, hasData} = this.state;

        let item_list = (item,index) => {
            return <div className="list-item">
                        <div className="red-status">
                            {rows.map(statusText)}
                            <span className="status-num">{item.redbagAmt}</span>
                        </div>
                        <div className="sub-red-status">
                            <span className="sub-status-text">{item.remark}</span>
                            <span className="status-time">{item.createTime}</span>
                        </div>
                    </div>
        }
// 没数据的空页面
        let empty = <div className="no-data-box">
            <img className="no-data-img" src="images/no-data.png" />
        </div>;

     

        return (
            <div>
                {/*数据列表*/}
                <div className="data-list">
                    {rows.map(item_list)}
                </div>
                {/*<div className="data-list">
                    <div className="list-item">
                        <div className="red-status">
                            {rows.map(statusText)}
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
                </div>*/}
                {/*已加载完全部数据提示*/}
                {hasData && <div className="data-completion">已加载完全部数据</div>}
                {rows.length === 0 && !hasData && empty}
            </div>
        )
    }
};

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"红包明细"} />, HEADER_NODE);
    ReactDOM.render(<RedPacketDetail />, CONTENT_NODE);
});
